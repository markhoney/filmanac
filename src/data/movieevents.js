require('dotenv').config();
require('colors');
const {mkdirSync, existsSync, copyFileSync} = require('fs');
const {resolve} = require('path');
const number = require('./number');
const {screenshot} = require('./extract');
const googlesheet = require('./googlesheet');
const fanart = require('./fanart');
const tmdb = require('./tmdb');
const omdb = require('./omdb');
const bechdel = require('./bechdel');
const wikidata = require('./wikidata');

function unique(array) {
	return [...new Set(array)].filter((element) => !['N/A', 'None', '', null, undefined, false].includes(element));
}

function removeNA(obj) {
	for (const key in obj) {
		if (obj[key] === 'N/A') delete obj[key];
	}
}

function split(string, separator = ',') {
	if (string) return unique(string.split(separator).map((item) => item.trim().replace(/\.+$/g, '')));
	return [];
}

function slugify(name) {
	return name.toLowerCase().split(' ').join('_');
}

function monthName(number) {
	return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][number - 1];
}

function titleCase(string) {
	if (string) return string
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

class MovieEvents {
	constructor() {
		this.sheets = null;
		[this.dayofyear, this.month, this.day] = this.getAllDates();
		this.days = [];
		this.year = [];
		this.years = [];
		this.movie = [];
		this.event = [];
		this.studios = [];
		this.classification = [];
		this.genres = [];
		this.countries = [];
		this.languages = [];
		this.stats = {};
		this.directors = [];
		this.writers = [];
		this.actors = [];
		this.score = [];
		this.celebration = [];
	}

	getAllDates() {
		const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const days = [];
		const dates = [];
		for (let month in months) {
			month = parseInt(month) + 1;
			for (let day = 1; day <= months[month - 1]; day++) {
				if (month === 1) days.push({
					id: day,
					title: number(day).ordinal.name,
					ordinal: number(day).ordinal.extension,
				});
				dates.push({
					id: [month, day].join('-'),
					month,
					day,
					title: `${monthName(month)} ${day}${number(day).ordinal.extension}`,
				});
			}
			months[month - 1] = {
				id: month,
				// slug: monthName(month).toLowerCase().slice(0, 3),
				title: monthName(month),
			};
		}
		for (const [index, date] of dates.entries()) {
			if (date.id === '1-1') {
				date.previous = '12-31';
			} else {
				date.previous = dates[index - 1].id;
			}
			if (date.id === '12-31') {
				date.next = '1-1';
			} else {
				date.next = dates[index + 1].id;
			}
		}
		return [dates, months, days];
	}

	getEvents(events) {
		return events.map((event) => {
			const year = event.year ? parseInt(event.year) : null;
			const month = parseInt(event.month);
			const day = parseInt(event.day);
			const ev = {
				id: [month, day, event.imdb].join('-'),
				info: {},
				movie: event.imdb,
				title: event.reason,
				mention: event.mention,
				time: event.timestamp && [event.timestamp],
				refreshments: event.refreshments && event.refreshments.split(',').map((refreshment) => refreshment.trim()),
				celebration: event.celebration,
				eponymous: event.dateintitle === 'TRUE',
				year,
				month,
				day,
				date: year ? new Date([event.year, event.month, event.day].join('-')) : null,
			};
			if (event.timestamp && event.timestampend) ev.time.push(event.timestampend);
			if (event.wikipedia) {
				ev.info.wikipedia = {
					id: event.wikipedia,
					url: `https://en.wikipedia.org/wiki/${event.wikipedia}`,
				};
			}
			if (event.wikidata) {
				ev.info.wikidata = {
					id: event.wikidata,
					url: `https://www.wikidata.org/wiki/${event.wikidata}`,
				};
			}
			return ev;
		}).filter((event) => event.month && event.day && event.movie);
	}

	getClassifications() {
		const classifications = unique(this.movie.map((movie) => movie.classification)).map((classification) => ({
			id: slugify(classification),
			title: classification,
			image: this.getImagePath('USA ' + classification, ['node_modules/resource.images.classificationicons.colour/resources']),
		}));
		for (const movie of this.movie) if (movie.classification) movie.classification = slugify(movie.classification);
		return classifications;
	}

	getScores() {
		const scores = unique(this.movie.map((movie) => movie.score)).map((score) => ({
			id: score,
			title: score + '%',
		}));
		return scores;
	}

	getCelebrations() {
		const celebrations = unique(this.movie.map((movie) => movie.celebration)).map((celebration) => ({
			id: slugify(celebration),
			title: celebration,
		}));
		for (const movie of this.movie) if (movie.celebration) movie.celebration = slugify(movie.celebration);
		return celebrations;
	}

	getStudios(lookup) {
		const studios = unique(this.movie.map((movie) => movie.studios).flat()).map((studio) => {
			const image = lookup.find((name) => name.from === studio);
			return {
				id: slugify(studio),
				title: studio,
				image: this.getImagePath((image && image.to) || studio, ['node_modules/resource.images.studios.coloured/resources', 'src/images/studios'], 'studios'),
			};
		});
		for (const movie of this.movie) if (movie.studios) movie.studios = movie.studios.map((studio) => slugify(studio));
		return studios;
	}

	getLanguages(lookup) {
		const languages = unique(this.movie.map((movie) => movie.languages).flat()).map((language) => {
			const row = lookup.find((row) => row.languages && row.languages.includes(language));
			if (row) return {
				id: slugify(language),
				title: language,
				country: slugify(row.name),
				image: this.getImagePath(row.code.toLowerCase(), ['node_modules/svg-country-flags/svg', 'src/images/languages'], 'countries/flags'),
			};
			else {
				console.log('Missing language'.red, language);
				return {
					id: slugify(language),
					title: language,
				};
			}
		});
		for (const movie of this.movie) if (movie.languages) movie.languages = movie.languages.map((language) => slugify(language));
		return languages;
	}

	getCountries(lookup) {
		const countries = unique(this.movie.map((movie) => movie.countries).flat()).map((country) => {
			const row = lookup.find((row) => row.name === country || row.fullname === country || (row.names && row.names.includes(country)));
			if (row) return {
				id: slugify(country),
				title: country,
				code: row.code,
				possessive: row.possessive,
				image: this.getImagePath(row.name, ['node_modules/resource.images.moviecountryicons.maps/resources'], 'countries/maps'),
				map: this.getImagePath(row.code.toLowerCase() + '/vector', ['node_modules/mapsicon/all'], 'countries/maps'),
				flag: this.getImagePath(row.code.toLowerCase(), ['node_modules/svg-country-flags/svg'], 'countries/flags'),
			};
			else {
				console.log('Missing country'.red, country);
				return {
					id: slugify(country),
					title: country,
				};
			}
		});
		for (const movie of this.movie) if (movie.countries) movie.countries = movie.countries.map((country) => slugify(country));
		return countries;
	}

	getGenres() {
		const genres = unique(this.movie.map((movie) => movie.genres).flat()).map((genre) => ({
			id: slugify(genre),
			title: genre,
			image: this.getImagePath(genre, ['node_modules/resource.images.moviegenreicons.transparent/resources', 'src/images/genres/transparent'], 'genres'),
			fanart: this.getImagePath(genre, ['node_modules/resource.images.moviegenrefanart.xonfluence/resources', 'node_modules/resource.images.moviegenrefanart.metrocity/resources']),
		}));
		for (const movie of this.movie) if (movie.genres) movie.genres = movie.genres.map((genre) => slugify(genre));
		return genres;
	}

	getYears() {
		const years = unique(this.event.map((event) => event.year)).map((year) => ({
			id: year,
			title: year,
		}));
		return years;
	}

	getMovieYears() {
		const years = unique(this.movie.map((movie) => movie.year)).map((year) => ({
			id: year,
			title: year,
		}));
		return years;
	}

	getDates() {
		const dates = unique(this.event.filter((event) => event.year || event.year === 0)).map((event) => ({
			id: [event.year, event.month, event.day].join('-'),
			title: `${number(event.day).ordinal.name} ${monthName(event.month)} ${event.year}`,
			js: new Date(event.year, event.month - 1, event.day),
		}));
		return dates;
	}

	getDirectors() {
		const directors = unique(this.movie.map((movie) => movie.directors).flat()).map((director) => ({
			id: slugify(director),
			title: director,
		}));
		for (const movie of this.movie) if (movie.directors) movie.directors = movie.directors.map((director) => slugify(director));
		return directors;
	}

	getActors() {
		const actors = unique(this.movie.map((movie) => movie.actors).flat()).map((actor) => ({
			id: slugify(actor),
			title: actor,
		}));
		for (const movie of this.movie) if (movie.actors) movie.actors = movie.actors.map((actor) => slugify(actor));
		return actors;
	}

	getWriters() {
		const writers = unique(this.movie.map((movie) => movie.writers).flat()).map((writer) => ({
			id: slugify(writer),
			title: writer,
		}));
		for (const movie of this.movie) if (movie.writers) movie.writers = movie.writers.map((writer) => slugify(writer));
		return writers;
	}

	getMovies(events) {
		return events
			.filter((v,i,a) => a.findIndex((t) => (t.imdb === v.imdb)) === i)
			.map((event) => {
				const movie = {
					id: event.imdb,
					info: {
						imdb: {
							id: event.imdb,
							url: `https://www.imdb.com/title/${event.imdb}/`,
						},
					},
				};
				if (event.moviewikipedia) {
					movie.info.wikipedia = {
						id: event.moviewikipedia,
						url: `https://en.wikipedia.org/wiki/${event.moviewikipedia}`,
					};
				}
				return movie;
		});
	}

	getWatchLinks(title) {
		return {
			plex: {
				url: `https://app.plex.tv/desktop#!/search?query=${encodeURI(title)}`,
				image: resolve(__dirname, '..', 'images', 'watch', 'plex.png'),
				title: 'Search on Plex',
				type: 'plex',
			},
			netflix: {
				url: `https://www.netflix.com/search?q=${encodeURI(title)}`,
				image: resolve(__dirname, '..', 'images', 'watch', 'netflix.png'),
				title: 'Search on Netflix',
				type: 'netflix',
			},
		};
	}

	getImagePath(title, paths, staticFolder = null) {
		for (const path of paths) if (path) {
			for (const name of unique([title, title.split(' ').join(''), title.toLowerCase(), title.toLowerCase().split(' ').join('')])) {
					for (const ext of ['.png', '.jpg', '.svg']) {
					const src = resolve(path, name + ext);
					if (existsSync(src)) {
						if (!staticFolder) return src;
						const staticPath = ['static', 'img', staticFolder].join('/');
						mkdirSync(staticPath, {recursive: true});
						const dest = resolve(staticPath, name.replace('/vector', '').replace('/', '-') + ext);
						copyFileSync(src, dest);
						return [staticPath.replace('static', ''), name + ext].join('/');
					}
				}
			}
		}
		console.log(`Missing ${paths[0]} image:`.red, title);
		return null;
	}

	async getDetails(movie) {
		const openmoviedb = await omdb(movie.id);
		const themoviedb = await tmdb(movie.id);
		const art = await fanart(movie.id, omdb.poster, tmdb.poster_path, tmdb.backdrop_path);
		const bechdelScore = await bechdel(movie.id);
		movie = {
			...movie,
			...openmoviedb,
			...themoviedb,
		};
		delete movie.poster;
		if (bechdelScore) movie.bechdel = bechdelScore;
		if (themoviedb) movie.info.tmdb = {
			id: themoviedb.id,
			url: `https://www.themoviedb.org/movie/${themoviedb}`,
		};
		if (movie.info.wikipedia) {
			let wikidatapage = await wikidata(movie.id, movie.info.wikipedia.id);
			if (wikidatapage) movie.info.wikidata = {
				id: wikidatapage.title,
				url: `https://www.wikidata.org/wiki/${wikidatapage.title}`,
			};
		}
		if (art) movie.images = art;
		movie.watch = this.getWatchLinks(movie.title);
		// movie.data = movie.wikidata ? await this.getWikiData(movie.wikidata) : null;
		return movie;
	}

	async getMovieDetails() {
		for (const index in this.movie) {
			this.movie[index] = await this.getDetails(this.movie[index]);
		}
	}

	async get() {
		for (const type of ['omdb', 'wikidata', 'fanart', 'themoviedb', 'bechdel']) mkdirSync(resolve('cache', 'json', type), {recursive: true});
		for (const type of ['logo', 'clearart', 'poster', 'keyart', 'fanart', 'disc', 'banner', 'landscape', 'screenshot']) mkdirSync(resolve('cache', 'images', type), {recursive: true});
		for (const type of ['mention']) mkdirSync(resolve('cache', 'audio', type), {recursive: true});
		const events = await googlesheet('Movies');
		const countries = (await googlesheet('Countries')).map((country) => ({
			...country,
			titles: country.names && split(country.names),
			languages: country.languages && split(country.languages),
		}));
		const studios = await googlesheet('Studios');
		this.event = this.getEvents(events);
		this.movie = this.getMovies(events);
		await this.getMovieDetails();
		for (const event of this.event) event.image = await screenshot(event, this.movie.find((movie) => movie.id === event.movie));
		this.studios = this.getStudios(studios);
		this.classification = this.getClassifications();
		this.genres = this.getGenres();
		this.languages = this.getLanguages(countries);
		this.countries = this.getCountries(countries);
		this.year = this.getYears();
		this.years = this.getMovieYears();
		this.days = this.getDates();
		this.directors = this.getDirectors();
		this.writers = this.getWriters();
		this.actors = this.getActors();
		this.score = this.getScores();
		this.celebration = this.getCelebrations();
		this.stats = Object.entries(this.getStats()).map((stat) => ({id: stat[0], value: stat[1]}));
	}

	stat(name) {
		const stat = this.stats.find((stat) => stat.id === name);
		if (stat) return stat.value;
	}

	getStats() {
		const stats = {};
		stats.days = unique(this.event.map((event) => [event.month, event.day].join('-'))).length;
		const daysofyear = this.event.reduce((events, event) => {
			const day = [event.month, event.day].join('-');
			if (!events[day]) events[day] = {day, total: 0};
			events[day].total++;
			return events;
		}, {});
		stats.multiple = Object.values(daysofyear).filter((day) => day.total > 1).length;
		// stats.single = Object.values(daysofyear).filter((day) => day.total < 2).map((day) => day.day).sort().join(', ');
		stats.dates = this.days.length;
		for (const cat of ['year', 'event', 'movie', 'years', 'studios', 'genres', 'languages', 'countries', 'directors', 'writers', 'actors', 'score', 'classification', 'celebration']) {
			stats[cat] = this[cat].length;
		}
		for (const source of ['wikipedia', 'wikidata']) {
			stats[source] = this.movie.filter((movie) => movie.info[source]).length;
		}
		stats.descriptions = this.event.filter((event) => event.title).length;
		for (const image of ['poster', 'fanart', 'logo', 'clearart', 'keyart', 'disc', 'banner', 'landscape']) {
			stats[image] = this.movie.filter((movie) => movie.images && movie.images[image]).length;
		}
		return stats;
	}

	getMissing(stats) {
		const missing = {};
		missing.days = 366 - stats.days;
		missing.multiple = 366 - stats.multiple;
		for (const value of ['descriptions']) {
			missing[value] = stats.event - stats[value];
		}
		for (const value of ['wikipedia', 'wikidata', 'poster', 'fanart', 'logo', 'clearart', 'keyart', 'disc', 'banner', 'landscape']) {
			missing[value] = stats.movie - stats[value];
		}
		for (const value of ['studios', 'classification', 'directors', 'actors', 'runtime', 'score']) {
			missing[value] = stats.movie - this.movie.filter((movie) => movie[value]).length;
		}
		return missing;
	}
}

async function getAll() {
	const movieEvents = new MovieEvents();
	await movieEvents.get();
	if (!module.parent) {
		console.log();
		// console.log(movieEvents.stats.reduce((p, c) => ({...p, [c.id]: c.value}), {}));
		const stats = movieEvents.getStats();
		console.log('Stats', stats);
		console.log('Missing', movieEvents.getMissing(stats));
	}
	console.log();
	console.log(movieEvents.stat('event'), 'events in', movieEvents.stat('movie'), 'movies.', 366 - movieEvents.stat('days'), 'days missing,', 366 - movieEvents.stat('multiple'), 'days with fewer than two movies.');
	console.log();
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
