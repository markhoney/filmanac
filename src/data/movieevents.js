require('dotenv').config();
require('colors');
const {readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const {google} = require('googleapis');
const {v3} = require('@leonardocabeza/the-movie-db');
const v3Client = v3(process.env.TheMovieDBKey);
const number = require('./number');
const {screenshot} = require('./extract');
const unavailable = require('./unavailable');
const googlesheet = require('./googlesheet');

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

function cleanObj(obj) {
	for (let prop in obj) {
		if (typeof obj[prop] === 'string' && ['N/A', 'None', '', null, undefined].includes(obj[prop].trim())) delete obj[prop];
	}
	return obj;
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

	getURL(fanart) {
		let art;
		if (fanart && fanart.length) {
			art = fanart.find((art) => art.lang === 'en' && art.disc_type === 'bluray');
			if (!art) art = fanart.find((art) => art.lang === 'en');
			if (!art) art = fanart[0];
			// if (art) art = {url: art.url};
		}
		return art && art.url;
	}

	getFanartURLs(fanart) {
		const art = {};
		if (fanart) {
			art.logo = this.getURL([...(fanart.hdmovielogo || []), ...(fanart.movielogo || [])]);
			art.clearart = this.getURL([...(fanart.hdmovieclearart || []), ...(fanart.movieclearart || [])]);
			art.poster = this.getURL(fanart.movieposter);
			let keyart;
			if (fanart.movieposter) keyart = fanart.movieposter.find((art) => art.lang === '00');
			if (keyart) art.keyart = keyart.url;
			art.fanart = this.getURL(fanart.moviebackground);
			art.disc = this.getURL(fanart.moviedisc);
			art.banner = this.getURL(fanart.moviebanner);
			art.landscape = this.getURL(fanart.moviethumb);
		}
		return art;
	}

	async getArt(id, urls) {
		const art = {};
		for (const type in urls) {
			if (urls[type]) {
				/* art[type] = {
					type,
					// url: urls[type],
					image: resolve('cache', 'images', type, `${id}.jpg`),
				}; */
				art[type] = resolve('cache', 'images', type, `${id}.jpg`);
				if (!existsSync(art[type])) {
					console.log(`Downloading ${type} for ${id}`);
					let res;
					try {
						res = await fetch(urls[type]);
						await res.body.pipe(createWriteStream(art[type]));
					} catch(e) {
					// console.log(e);
					console.log('Fanart scraping error for'.red, type, id);
					}
				}
				// delete art[type].url;
			}
		}
		return art;
	}

	async getFanart(id, omdbposter, tmdbposter, tmdbfanart) {
		let urls = {};
		if (omdbposter) urls.poster = omdbposter;
		if (!unavailable.exists('fanart', id)) {
			const json = resolve('cache', 'json', 'fanart', `${id}.json`);
			let details;
			if (!existsSync(json)) {
				console.log('Downloading Fanart info for', id);
				try {
					details = await fanart.movies.get(id);
					writeFileSync(json, JSON.stringify(details, null, '	'));
				} catch(e) {
					// console.log(e);
					console.log('Fanart info scraping error for'.red, id);
					unavailable.add('fanart', id);
				}
			} else {
				details = JSON.parse(readFileSync(json, 'utf8'));
			}
			urls = {
				...urls,
				...this.getFanartURLs(details),
			};
		}
		if (tmdbposter) urls.poster = 'https://image.tmdb.org/t/p/original/' + tmdbposter;
		if (tmdbfanart) urls.fanart = 'https://image.tmdb.org/t/p/original/' + tmdbfanart;
		return await this.getArt(id, urls);
	}

	async getTMDB(id) {
		if (!unavailable.exists('tmdb', id)) {
			const json = resolve('cache', 'json', 'themoviedb', `${id}.json`);
			if (!existsSync(json)) {
				console.log('Downloading The Movie DB info for', id);
				try {
					// details = await mdb.find.byExternalID({pathParameters: {external_id: id, external_source: 'imdb_id'}, query: {external_id: id, external_source: 'imdb_id'}});
					const overview = await v3Client.find.byId({external_id: id, external_source: 'imdb_id'});
					if (overview && overview.movie_results && overview.movie_results.length) {
						const details = await v3Client.movie.details(overview.movie_results[0].id);
						writeFileSync(json, JSON.stringify(details, null, '	'));
						return details;
					} else {
						unavailable.add('tmdb', id);
					}
				} catch(e) {
					console.log('The Movie DB scraping error for'.red, id);
					// console.log(e);
				}
			} else {
				return JSON.parse(readFileSync(json, 'utf8'));
			}
		}
		return {};
	}

	async getBechdel(id) {
		if (!unavailable.exists('bechdel', id)) {
			const json = resolve('cache', 'json', 'bechdel', `${id}.json`);
			if (!existsSync(json)) {
				console.log('Downloading Bechdel Test info for', id);
				try {
					// const details = (await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)).json()).entities[id];
					await sleep(1000);
					const page = await fetch('http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' + id.replace('tt', ''));
					const details = await page.json();
					if (!details.status) {
						writeFileSync(json, JSON.stringify(details, null, '\t'));
						return details;
					} else {
						unavailable.add('bechdel', id);
					}
				} catch(e) {
					console.log('Bechdel Test scraping error for'.red, id);
					// unavailable.add('bechdel', id);
					console.log(e);
				}
			} else {
				return JSON.parse(readFileSync(json, 'utf8'));
			}
		}
	}

	async getWikiData(id, name) {
		if (!unavailable.exists('wikidata', id)) {
			const json = resolve('cache', 'json', 'wikidata', `${id}.json`);
			if (!existsSync(json)) {
				console.log('Downloading WikiData info for', id);
				try {
					// const details = (await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)).json()).entities[id];
					await sleep(1000);
					const page = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&format=json&titles=${name}`);
					const data = await page.json();
					// const id = Object.keys(json.entities);
					const details = Object.values(data.entities)[0];
					writeFileSync(json, JSON.stringify(details, null, '\t'));
					return details;
				} catch(e) {
					// console.log(e);
					console.log('WikiData scraping error for'.red, id);
					unavailable.add('wikidata', id);
				}
			} else {
				return JSON.parse(readFileSync(json, 'utf8'));
			}
		}
	}

	async getOMDB(id) {
		const json = resolve('cache', 'json', 'omdb', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading OMDB info for', id);
			try {
				const details = await imdb.get({id});
				writeFileSync(json, JSON.stringify(details, null, '	'));
				return details;
			} catch(e) {
				// console.log('OMDB scraping error for'.red, id);
				console.log(e);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
		return {};
	}

	processOMDB(omdb) {
		const movie = {title: omdb.title};
		if (omdb.year) movie.year = omdb.year;
		if (omdb.rated) movie.classification = omdb.rated.toUpperCase();
		if (omdb.released) movie.released = new Date(omdb.released);
		if (omdb.runtime) movie.runtime = parseInt(omdb.runtime.replace(' min', ''));
		if (omdb.genres) movie.genres = split(omdb.genres);
		if (omdb.director) movie.directors = split(omdb.director);
		if (omdb.writer) movie.writers = split(omdb.writer);
		if (omdb.actors) movie.actors = split(omdb.actors);
		if (omdb.plot) movie.plot = omdb.plot;
		if (omdb.languages) movie.languages = split(omdb.languages.replace(',  Ancient (to 1453)', ''));
		if (omdb.country) movie.countries = split(omdb.country);
		if (omdb.awards) movie.awards = omdb.awards;
		if (omdb.rating) movie.score = omdb.rating * 10;
		if (omdb.votes) movie.votes = parseInt(omdb.votes.replace(/,/g, ''));
		if (omdb.imdbid) movie.id = omdb.imdbid;
		if (omdb.boxoffice) movie.revenue = omdb.boxoffice;
		if (movie.production) movie.studios = split(omdb.production.replace('&amp;', '/').replace(/Corporat$/, 'Corporation').replace(/Entertain$/, 'Entertainment').replace(/Compa$/, 'Company').replace(/Internationa$/, 'International').replace(/Distrib$/, 'Distribution'), '/');
		if (omdb.website) movie.website = omdb.website;
		return movie;
	}

	processTMDB(tmdb) {
		const movie = {title: tmdb.title};
		if (tmdb.budget) movie.budget = tmdb.budget;
		if (tmdb.genres) movie.genres = tmdb.genres.map((genre) => genre.name);
		if (tmdb.homepage) movie.website = tmdb.homepage;
		if (tmdb.imdb_id) movie.id = tmdb.imdb_id;
		if (tmdb.overview) movie.plot = tmdb.overview;
		if (tmdb.popularity) movie.score = Math.round(tmdb.popularity * 10);
		if (tmdb.production_companies) movie.studios = tmdb.production_companies.map((company) => company.name);
		if (tmdb.production_countries) movie.countries = tmdb.production_countries.map((country) => country.name);
		if (tmdb.release_date) movie.released = new Date(tmdb.release_date);
		if (tmdb.revenue) movie.revenue = tmdb.revenue;
		if (tmdb.runtime) movie.runtime = tmdb.runtime;
		if (tmdb.spoken_languages) movie.languages = tmdb.spoken_languages.map((language) => language.name);
		if (tmdb.tagline) movie.tagline = tmdb.tagline;
		if (tmdb.vote_average) movie.score = tmdb.vote_average * 10;
		if (tmdb.vote_count) movie.votes = tmdb.vote_count;
		return movie;
	}

	async getDetails(movie) {
		const omdb = cleanObj(await this.getOMDB(movie.id));
		const tmdb = await this.getTMDB(movie.id);
		const fanart = await this.getFanart(movie.id, omdb.poster, tmdb.poster_path, tmdb.backdrop_path);
		const bechdel = await this.getBechdel(movie.id);
		movie = {
			...movie,
			...this.processOMDB(omdb),
			...this.processTMDB(tmdb),
		};
		delete movie.poster;
		if (bechdel) movie.bechdel = bechdel;
		if (movie.info.wikipedia) {
			let wikidata = await this.getWikiData(movie.id, movie.info.wikipedia.id);
			if (wikidata) movie.info.wikidata = {
				id: wikidata.title,
				url: `https://www.wikidata.org/wiki/${wikidata.title}`,
			};
		}
		if (tmdb) movie.info.tmdb = {
			id: tmdb.id,
			url: `https://www.themoviedb.org/movie/${tmdb}`,
		};
		if (fanart) movie.images = fanart;
		movie.watch = this.getWatchLinks(movie.title);
		movie.data = movie.wikidata ? await this.getWikiData(movie.wikidata) : null;
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
		stats.single = Object.values(daysofyear).filter((day) => day.total < 2).map((day) => day.day).sort().join(', ');
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
