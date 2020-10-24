require('dotenv').config();
require('colors');
const {mkdirSync, existsSync, copyFileSync, writeFileSync} = require('fs');
const {resolve} = require('path');
const number = require('./number');
const {screenshot} = require('./extract');
const fanart = require('./fanart');
const tmdb = require('./tmdb');
const omdb = require('./omdb');
const bechdel = require('./bechdel');
const wikidata = require('./wikidata');
const googlesheet = require('./googlesheet');

function unique(array) {
	return [...new Set(array)].filter((element) => !['N/A', 'None', '', null, undefined, false].includes(element));
}
function split(string, separator = ',') {
	if (string) return unique(string.split(separator).map((item) => item.trim().replace(/\.+$/g, '')));
	return [];
}

const replacements = {
	'\\': '-',
	'"': '\'',
	' ': '_',
	':': '-',
	'/': '-',
	'*': '',
	'<': '_',
	'>': '_',
	'?': '',
	'|': '-',
};

function slugify(name) {
	// return name.toLowerCase().split(' ').join('_').split(':').join('-');
	name = name.toLowerCase();
	for (const r of Object.keys(replacements)) {
		name = name.split(r).join(replacements[r]);
	}
	name = name.replace(/\.+$/, '');
	return name;
}

function monthName(number) {
	return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][number - 1];
}

function shortMonthName(number) {
	return monthName(number).slice(0, 3).toLowerCase();
}

class MovieEvents {
	constructor() {
		this.sheets = null;
		[this.daysofyear, this.months, this.days] = this.getAllDates();
		this.dates = [];
		this.years = [];
		this.releaseyears = [];
		this.movies = [];
		this.events = [];
		this.studios = [];
		this.classifications = [];
		this.genres = [];
		this.countries = [];
		this.languages = [];
		this.stats = {};
		this.directors = [];
		this.writers = [];
		this.actors = [];
		this.scores = [];
		this.celebrations = [];
	}

	getAllDates() {
		const daysInMonths = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const months = [];
		const days = [];
		const daysofyear = [];
		for (let month = 1; month <= 12; month++) {
			// const monthID = shortMonthName(month);
			const monthID = monthName(month).toLowerCase();
			// const monthID = month;
			months.push({
				id: monthID,
				number: month,
				title: monthName(month),
			});
			for (let day = 1; day <= daysInMonths[month]; day++) {
				const dayID = day;
				// const dayID = number(day).ordinal.name.toLowerCase();
				// const dayID = day + number(day).ordinal.extension;
				if (month === 1) days.push({
					id: dayID,
					number: day,
					title: number(day).ordinal.name,
					ordinal: number(day).ordinal.extension,
				});
				daysofyear.push({
					id: [month, day].join('-'),
					month: monthID,
					day: dayID,
					title: `${monthName(month)} ${day}${number(day).ordinal.extension}`,
				});
			}
		}
		for (const [index, dayofyear] of daysofyear.entries()) {
			if (index === 0) {
				dayofyear.previous = daysofyear[daysofyear.length - 1].id;
			} else {
				dayofyear.previous = daysofyear[index - 1].id;
			}
			if (index === daysofyear.length - 1) {
				dayofyear.next = daysofyear[0].id;
			} else {
				dayofyear.next = daysofyear[index + 1].id;
			}
		}
		return [daysofyear, months, days];
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
				refreshments: event.refreshments && event.refreshments.split(',').map((refreshment) => refreshment.trim()),
				celebration: event.celebration,
				eponymous: event.dateintitle === 'TRUE',
				year,
				month,
				day,
				date: year ? new Date([event.year, event.month, event.day].join('-')) : null,
				// date: year ? new Date(event.year, event.month - 1, event.day) : null,
			};
			if (event.timestamp) {
				if (event.timestampend) ev.audio = {time: [event.timestamp, event.timestampend]};
				else {
					ev.screenshot = {time: event.timestamp};
					if (event.position) ev.screenshot.position = event.position;
				}
			}
			if (event.wikipedia) ev.info.wikipedia = this.processWikipedia(event.wikipedia);
			return ev;
		}).filter((event) => event.month && event.day && event.movie);
	}

	processWikipedia(slug) {
		const url = slug.split('#');
		const wikipedia = {
			id: url[0],
			url: `https://en.wikipedia.org/wiki/${slug}`,
			page: `https://en.wikipedia.org/wiki/${url[0]}`,
			mobile: `https://en.m.wikipedia.org/wiki/${slug}`,
		};
		if (url.length === 2) wikipedia.anchor = url[1];
		return wikipedia;
	}

	getWatchLinks(title) {
		return {
			plex: {
				url: `https://app.plex.tv/desktop#!/search?query=${encodeURI(title)}`,
				image: resolve(__dirname, '..', 'images', 'watch', 'plex.png'),
				title: 'Search on Plex',
				// type: 'plex',
			},
			netflix: {
				url: `https://www.netflix.com/search?q=${encodeURI(title)}`,
				image: resolve(__dirname, '..', 'images', 'watch', 'netflix.png'),
				title: 'Search on Netflix',
				// type: 'netflix',
			},
		};
	}

	getClassifications() {
		const classifications = unique(this.movies.map((movie) => movie.classification)).map((classification) => ({
			id: slugify(classification),
			title: classification,
			image: this.getImagePath('USA ' + classification, ['node_modules/resource.images.classificationicons.colour/resources']),
		}));
		for (const movie of this.movies) if (movie.classification) movie.classification = slugify(movie.classification);
		return classifications;
	}

	getScores() {
		const scores = unique(this.movies.map((movie) => movie.score)).map((score) => ({
			id: score,
			number: score,
			title: score + '%',
		}));
		return scores;
	}

	getCelebrations() {
		const celebrations = unique(this.movies.map((movie) => movie.celebration)).map((celebration) => ({
			id: slugify(celebration),
			title: celebration,
		}));
		for (const movie of this.movies) if (movie.celebration) movie.celebration = slugify(movie.celebration);
		return celebrations;
	}

	getStudios(lookup) {
		const studios = unique(this.movies.map((movie) => movie.studios).flat()).map((studio) => {
			const image = lookup.find((name) => name.from === studio);
			return {
				id: slugify(studio),
				title: studio,
				image: this.getImagePath((image && image.to) || studio, ['node_modules/resource.images.studios.coloured/resources', 'src/images/studios'], 'studios'),
			};
		});
		for (const movie of this.movies) if (movie.studios) movie.studios = movie.studios.map((studio) => slugify(studio));
		return studios;
	}

	getLanguages(lookup) {
		const languages = unique(this.movies.map((movie) => movie.languages).flat()).map((language) => {
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
		for (const movie of this.movies) if (movie.languages) movie.languages = movie.languages.map((language) => slugify(language));
		return languages;
	}

	getCountries(lookup) {
		const countries = unique(this.movies.map((movie) => movie.countries).flat()).map((country) => {
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
		for (const movie of this.movies) if (movie.countries) movie.countries = movie.countries.map((country) => slugify(country));
		return countries;
	}

	getGenres() {
		const genres = unique(this.movies.map((movie) => movie.genres).flat()).map((genre) => ({
			id: slugify(genre),
			title: genre,
			image: this.getImagePath(genre, ['node_modules/resource.images.moviegenreicons.transparent/resources', 'src/images/genres/transparent'], 'genres'),
			fanart: this.getImagePath(genre, ['node_modules/resource.images.moviegenrefanart.xonfluence/resources', 'node_modules/resource.images.moviegenrefanart.metrocity/resources']),
		}));
		for (const movie of this.movies) if (movie.genres) movie.genres = movie.genres.map((genre) => slugify(genre));
		return genres;
	}

	getYears() {
		const years = unique(this.events.map((event) => event.year)).map((year) => ({
			id: year,
			title: year,
		}));
		return years;
	}

	getReleaseYears() {
		const years = unique(this.movies.map((movie) => movie.year)).map((year) => ({
			id: year,
			title: year,
		}));
		return years;
	}

	getDates() {
		const dates = unique(this.events.filter((event) => event.year || event.year === 0)).map((event) => ({
			id: [event.year, event.month, event.day].join('-'),
			title: `${number(event.day).ordinal.name} ${monthName(event.month)} ${event.year}`,
			date: new Date(event.year, event.month - 1, event.day),
		}));
		return dates;
	}

	getDirectors() {
		const directors = unique(this.movies.map((movie) => movie.directors).flat()).map((director) => ({
			id: slugify(director),
			title: director,
		}));
		for (const movie of this.movies) if (movie.directors) movie.directors = movie.directors.map((director) => slugify(director));
		return directors;
	}

	getActors() {
		const actors = unique(this.movies.map((movie) => movie.actors).flat()).map((actor) => ({
			id: slugify(actor),
			title: actor,
		}));
		for (const movie of this.movies) if (movie.actors) movie.actors = movie.actors.map((actor) => slugify(actor));
		return actors;
	}

	getWriters() {
		const writers = unique(this.movies.map((movie) => movie.writers).flat()).map((writer) => ({
			id: slugify(writer),
			title: writer,
		}));
		for (const movie of this.movies) if (movie.writers) movie.writers = movie.writers.map((writer) => slugify(writer));
		return writers;
	}

	getValue(movie) {
		if (movie.score && movie.revenue && movie.budget)
			return parseInt(100 * Math.pow(movie.score / 100, 1.8 / 2.8) * Math.pow(movie.revenue / (movie.budget + movie.revenue), (1 / 2.8)));
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
				if (event.moviewikipedia) movie.info.wikipedia = this.processWikipedia(event.moviewikipedia);
				return movie;
		});
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
						if (!existsSync(dest)) {
							console.log(src, dest);
							copyFileSync(src, dest);
						}
						return [staticPath.replace('static', ''), name + ext].join('/');
					}
				}
			}
		}
		// console.log(`Missing ${paths[0]} image:`.red, title);
		return null;
	}

	async getMovieDetails(movie) {
		const openmoviedb = await omdb(movie.id);
		const themoviedb = await tmdb(movie.id);
		movie = {
			...movie,
			...openmoviedb,
			...themoviedb,
		};
		movie.slug = slugify(movie.title + ' ' + movie.year);
		movie.value = this.getValue(movie);
		const bechdelScore = await bechdel(movie.id);
		if (bechdelScore) movie.bechdel = bechdelScore;
		if (themoviedb) {
			movie.info.tmdb = {
				id: themoviedb.tmdb,
				url: `https://www.themoviedb.org/movie/${themoviedb.tmdb}`,
			};
			delete movie.tmdb;
		}
		if (movie.info.wikipedia) {
			let wikidatapage = await wikidata(movie.id, movie.info.wikipedia.id);
			if (wikidatapage) movie.info.wikidata = {
				id: wikidatapage.id,
				url: `https://www.wikidata.org/wiki/${wikidatapage.id}`,
			};
		}
		const art = await fanart(movie.id, movie.poster, movie.fanart);
		delete movie.poster;
		delete movie.fanart;
		if (art) movie.images = art;
		movie.watch = this.getWatchLinks(movie.title);
		// movie.data = movie.wikidata ? await this.getWikiData(movie.wikidata) : null;
		return movie;
	}

	async getMoviesDetails() {
		for (const index in this.movies) {
			this.movies[index] = await this.getMovieDetails(this.movies[index]);
		}
	}

	async getEventsDetails() {
		for (const event of this.events) {
			if (event.info.wikipedia) {
				let wikidatapage = await wikidata(event.id, event.info.wikipedia.id.split('#')[0]);
				if (wikidatapage) event.info.wikidata = {
					id: wikidatapage.id,
					url: `https://www.wikidata.org/wiki/${wikidatapage.id}`,
				};
			}
			if (event.screenshot) {
				const image = await screenshot(event, this.movies.find((movie) => movie.id === event.movie));
				if (image) {
					event.screenshot.image = image;
				}
			}
		}
	}

	async get() {
		for (const type of ['omdb', 'wikidata', 'fanart', 'themoviedb', 'bechdel']) mkdirSync(resolve('cache', 'json', type), {recursive: true});
		for (const type of ['logo', 'clearart', 'poster', 'keyart', 'fanart', 'disc', 'banner', 'landscape', 'screenshot']) mkdirSync(resolve('cache', 'images', type), {recursive: true});
		for (const type of ['mention']) mkdirSync(resolve('cache', 'audio', type), {recursive: true});
		const events = (await googlesheet('Movies')).filter((event) => event.month && event.day && event.imdb);
		const countries = (await googlesheet('Countries')).map((country) => ({
			...country,
			titles: country.names && split(country.names),
			languages: country.languages && split(country.languages),
		}));
		const studios = await googlesheet('Studios');
		const languages = (await googlesheet('Languages')).reduce((languages, language) => ({...languages, [language.native]: language.english}), {});
		this.events = this.getEvents(events);
		this.movies = this.getMovies(events);
		await this.getMoviesDetails();
		for (const movie of this.movies) {
			for (const index in movie.languages) {
				if (languages[movie.languages[index]]) movie.languages[index] = languages[movie.languages[index]];
			}
		}
		await this.getEventsDetails();
		// this.export();
		this.studios = this.getStudios(studios);
		this.classifications = this.getClassifications();
		this.genres = this.getGenres();
		this.languages = this.getLanguages(countries);
		this.countries = this.getCountries(countries);
		this.years = this.getYears();
		this.releaseyears = this.getReleaseYears();
		this.dates = this.getDates();
		this.directors = this.getDirectors();
		this.writers = this.getWriters();
		this.actors = this.getActors();
		this.scores = this.getScores();
		this.celebrations = this.getCelebrations();
		this.stats = Object.entries(this.getStats()).map((stat) => ({id: stat[0], value: stat[1]}));
	}

	stat(name) {
		const stat = this.stats.find((stat) => stat.id === name);
		if (stat) return stat.value;
	}

	getStats() {
		const stats = {};
		stats.days = unique(this.events.map((event) => [event.month, event.day].join('-'))).length;
		const daysofyear = this.events.reduce((events, event) => {
			const day = [event.month, event.day].join('-');
			if (!events[day]) events[day] = {day, total: 0};
			events[day].total++;
			return events;
		}, {});
		stats.multiple = Object.values(daysofyear).filter((day) => day.total > 1).length;
		// stats.single = Object.values(daysofyear).filter((day) => day.total < 2).map((day) => day.day).sort().join(', ');
		stats.dates = this.days.length;
		for (const cat of ['years', 'events', 'movies', 'releaseyears', 'studios', 'genres', 'languages', 'countries', 'directors', 'writers', 'actors', 'scores', 'classifications', 'celebrations']) {
			stats[cat] = this[cat].length;
		}
		for (const source of ['wikipedia', 'wikidata']) {
			stats[source] = this.movies.filter((movie) => movie.info[source]).length;
		}
		for (const image of ['poster', 'fanart', 'logo', 'clearart', 'keyart', 'disc', 'banner', 'landscape']) {
			stats[image] = this.movies.filter((movie) => movie.images && movie.images[image]).length;
		}
		stats.descriptions = this.events.filter((event) => event.title).length;
		stats.screenshots = this.events.filter((event) => event.screenshot && event.screenshot.image).length;
		stats.eventwiki = this.events.filter((event) => event.info.wikipedia).length;
		return stats;
	}

	export() {
		writeFileSync(resolve('cache', 'movies.json'), JSON.stringify(this.movies.map((movie) => ({
			title: movie.title,
			runtime: movie.runtime,
			score: movie.score,
			votes: movie.votes,
			revenue: movie.revenue,
			budget: movie.budget,
		})), null, '\t'));
	}

	getMissing(stats) {
		const missing = {};
		missing.days = [366 - stats.days, parseInt((366 - stats.days) * 100 / 366) + '%'];
		missing.multiple = [366 - stats.multiple, parseInt((366 - stats.multiple) * 100 / 366) + '%'];
		for (const value of ['descriptions', 'screenshots', 'eventwiki']) {
			missing[value] = [stats.events - stats[value], parseInt((stats.events - stats[value]) * 100 / stats.events) + '%'];
		}
		for (const value of ['wikipedia', 'wikidata', 'poster', 'fanart', 'logo', 'clearart', 'keyart', 'disc', 'banner', 'landscape']) {
			missing[value] = [stats.movies - stats[value], parseInt((stats.movies - stats[value]) * 100 / stats.movies) + '%'];
		}
		for (const value of ['studios', 'classification', 'directors', 'actors', 'runtime', 'score', 'year']) {
			missing[value] = [stats.movies - this.movies.filter((movie) => movie[value]).length, parseInt((stats.movies - this.movies.filter((movie) => movie[value]).length) * 100 / stats.movies) + '%'];
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
	console.log(movieEvents.stat('events'), 'events in', movieEvents.stat('movies'), 'movies.', 366 - movieEvents.stat('days'), 'days missing,', 366 - movieEvents.stat('multiple'), 'days with fewer than two movies.');
	console.log();
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
