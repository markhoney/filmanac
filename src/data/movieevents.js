require('dotenv').config();
require('colors');
const {readFileSync, writeFileSync, existsSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const {google} = require('googleapis');
const languages = require('./json/languages.json');
// const MovieDB = require('node-themoviedb/index');
// const mdb = new MovieDB(process.env.TheMovieDBKey);

function unique(array) {
	return [...new Set(array)].filter((element) => !['N/A', 'None', '', null, undefined].includes(element));
}

function split(string, separator) {
	if (string) return unique(string.split(separator).map((item) => item.trim()));
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

class MovieEvents {
	constructor() {
		this.days = this.getDays();
		this.movies = [];
		this.events = [];
		this.studios = [];
		this.genres = [];
		this.countries = [];
		this.languages = [];
		this.years = [];
		this.ratings = [];
	}

	getDays() {
		const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const days = [];
		for (let month = 1; month <= months.length; month++) {
			for (let day = 1; day <= months[month - 1]; day++) {
				days.push({
					id: [month, day].join('-'),
					path: `/${month}/${day}`,
					month,
					month_short: monthnames[month - 1].toLowerCase().slice(0, 3),
					month_full: monthnames[month - 1],
					day,
					day_ordinal: day + (day > 0 ? ['th', 'st', 'nd', 'rd'][(day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10] : ''),
					events: [],
				});
			}
		}
		days[0].previous = '/12/31';
		days[0].next = '/1/2';
		for (let day = 1; day < days.length - 1; day++) {
			days[day].previous = days[day - 1].path;
			days[day].next = days[day + 1].path;
		}
		days[365].previous = '/12/30';
		days[365].next = '/1/1';
		return days;
	}

	getEvents(events) {
		return events.map((event) => {
			const year = parseInt(event.year);
			const month = parseInt(event.month);
			const day = parseInt(event.day);
			return {
				id: [month, day, event.imdb].join('-'),
				ids: {
					imdb: event.imdb,
					wikipedia: event.wikipedia,
				},
				movie: event.imdb,
				reason: event.reason,
				refreshments: event.refreshments,
				timestamp: event.timestamp,
				mention: event.mention,
				date: {
					year,
					month,
					day,
					js: year || year === 0 ? new Date(year, month - 1, day) : null,
				},
			};
		});
	}

	getImagePath(title, type, variant, lookup) {
		if (lookup) {
			const newtitle = lookup.find((name) => name.from === title);
			if (newtitle) title = newtitle.to;
		}
		for (const name of unique([title, title.split(' ').join(''), title.toLowerCase(), title.toLowerCase().split(' ').join('')])) {
			for (const ext of ['.png', '.jpg']) {
				const path = resolve(__dirname, '..', 'images', type, variant, name + ext);
				if (existsSync(path)) return path;
			}
		}
		console.log(`Missing ${type}:`.red, title);
		return null;
	}

	getStudios() {
		this.studios = unique(this.movies.map((movie) => movie.studios).flat()).map((studio) => ({
			id: slugify(studio),
			name: studio,
			icon: this.getImagePath(studio, 'studio', 'colour'),
			// movies: this.movies.filter((movie) => movie.studios && movie.studios.includes[studio]).map((movie) => movie.id),
		}));
		for (const movie of this.movies) {
			if (movie.studios) movie.studios = movie.studios.map((studio) => slugify(studio));
		}
	}

	getLanguages() {
		this.languages = unique(this.movies.map((movie) => movie.languages).flat()).map((language) => ({
			id: slugify(language),
			name: language,
			icon: this.getImagePath(language, 'language', 'flag', languages),
			// movies: this.movies.filter((movie) => movie.languages && movie.languages.includes[language]).map((movie) => movie.id),
		}));
		for (const movie of this.movies) {
			if (movie.languages) movie.languages = movie.languages.map((language) => slugify(language));
		}
	}

	getCountries() {
		this.countries = unique(this.movies.map((movie) => movie.countries).flat()).map((country) => ({
			id: slugify(country),
			name: country,
			icon: this.getImagePath(country, 'country', 'map'),
			// movies: this.movies.filter((movie) => movie.countries && movie.countries.includes[country]).map((movie) => movie.id),
		}));
		for (const movie of this.movies) {
			if (movie.countries) movie.countries = movie.countries.map((country) => slugify(country));
		}
	}

	getGenres() {
		this.genres = unique(this.movies.map((movie) => movie.genres).flat()).map((genre) => ({
			id: slugify(genre),
			name: genre,
			icon: this.getImagePath(genre, 'genre', 'white'),
			fanart: this.getImagePath(genre, 'genre', 'fanart'),
			// movies: this.movies.filter((movie) => movie.genres && movie.genres.includes[genre]).map((movie) => movie.id),
		}));
		for (const movie of this.movies) {
			if (movie.genres) movie.genres = movie.genres.map((genre) => slugify(genre));
		}
	}

	getYears() {
		this.years = unique(this.events.map((event) => event.year)).map((year) => ({
			id: year,
			name: year,
			// movies: this.events.filter((event) => event.year === year).map((event) => event.ids.imdb),
		}));
	}

	getMovies(events) {
		return events
			.filter((v,i,a) => a.findIndex((t) => (t.imdb === v.imdb)) === i)
			.map((event) => {
				const movie = {
					id: event.imdb,
					link: {
						imdb: {
							id: event.imdb,
							url: `https://www.imdb.com/title/${event.imdb}/`,
						},
					},
				};
				if (event.moviewikidata) {
					movie.link.wikidata = {
						id: event.moviewikidata,
						url: `https://www.wikidata.org/wiki/${event.moviewikidata}`,
					};
				}
				if (event.moviewikipedia) {
					movie.link.wikipedia = {
						id: event.moviewikipedia,
						url: `https://en.wikipedia.org/wiki/${event.moviewikipedia}`,
					};
				}
				return movie;
		});
	}

	addEventsToDays() {
		for (const event of this.events) {
			this.days.find((day) => day.month === event.date.month && day.day === event.date.day).events.push(event.id);
		}
	}

	async getPoster(id, url) {
		if (url) {
			const path = resolve(__dirname, 'images', 'posters', `${id}.jpg`);
			if (!existsSync(path)) {
				console.log(`Downloading image for ${id}`);
				const res = await fetch(url);
				await res.body.pipe(createWriteStream(path));
			}
			return path;
		} else {
			console.log(`No image URL for ${id} -`.red, url);
			return null;
		}
	}

	getWatchLinks(title) {
		return {
			plex: {
				url: `https://app.plex.tv/desktop#!/search?query=${encodeURI(title)}`,
				path: resolve(__dirname, '..', 'images', 'watch', 'plex.png'),
				title: 'Search on Plex',
				type: 'plex',
			},
			netflix: {
				url: `https://www.netflix.com/search?q=${encodeURI(title)}`,
				path: resolve(__dirname, '..', 'images', 'watch', 'netflix.png'),
				title: 'Search on Netflix',
				type: 'netflix',
			},
		};
	}

	getURL(fanart) {
		let art;
		if (fanart && fanart.length) {
			art = fanart.find((art) => art.lang === 'en' && art.disc_type === 'bluray');
			if (!art) art = fanart.find((art) => art.lang === 'en');
			if (!art) art = fanart[0];
			if (art) art = {url: art.url};
		}
		return art;
	}

	getArtURLs(fanart) {
		const art = {};
		if (fanart) {
			art.logo = this.getURL([...(fanart.hdmovielogo || []), ...(fanart.movielogo || [])]);
			art.clearart = this.getURL([...(fanart.hdmovieclearart || []), ...(fanart.movieclearart || [])]);
			art.poster = this.getURL(fanart.movieposter);
			let keyart;
			if (fanart.movieposter) keyart = fanart.movieposter.find((art) => art.lang === '00');
			if (keyart) art.keyart = {url: keyart.url};
			art.fanart = this.getURL(fanart.moviebackground);
			art.disc = this.getURL(fanart.moviedisc);
			art.banner = this.getURL(fanart.moviebanner);
			art.landscape = this.getURL(fanart.moviethumb);
		}
		return art;
	}

	async getArt(fanart, id) {
		const art = this.getArtURLs(fanart);
		for (const image in art) {
			if (art[image]) {
				art[image].type = image;
				art[image].path = resolve(__dirname, 'images', image, `${id}.jpg`);
				if (!existsSync(art[image].path)) {
					console.log(`Downloading ${image} for ${id}`);
					const res = await fetch(art[image].url);
					await res.body.pipe(createWriteStream(art[image].path));
					delete art[image].url;
				}
			}
		}
		return art;
	}

	async getFanart(id) {
		const json = resolve(__dirname, 'json', 'fanart', `${id}.json`);
		let details;
		if (!existsSync(json)) {
			console.log('Downloading Fanart info for', id);
			try {
				// details = await fanart.movies.get(id);
				// writeFileSync(json, JSON.stringify(details, null, '	'));
			} catch(e) {
				// console.log(e);
				console.log('Fanart scraping error for'.red, id);
			}
		} else {
			details = JSON.parse(readFileSync(json, 'utf8'));
		}
		if (details) return [details.tmdb_id, await this.getArt(details, id)];
		return [];
	}

	async getWikiData(id) {
		const json = resolve(__dirname, 'json', 'wikidata', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading WikiData info for', id);
			try {
				const details = (await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)).json()).entities[id];
				writeFileSync(json, JSON.stringify(details, null, '	'));
				return details;
			} catch(e) {
				// console.log(e);
				console.log('WikiData scraping error for'.red, id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}

	async getOMDB(id) {
		const json = resolve(__dirname, 'json', 'omdb', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading OMDB info for', id);
			try {
				const details = await imdb.get({id});
				writeFileSync(json, JSON.stringify(details, null, '	'));
				return details;
			} catch(e) {
				// console.log(e);
				console.log('OMDB scraping error for'.red, id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}

	async getDetails(movie) {
		const details = cleanObj(await this.getOMDB(movie.id));
		// http://country.io/names.json
		if (details) {
			// const paths = getMoviePaths(details);
			movie = {
				...movie,
				...details,
				// ...paths,
			};
			if (movie.production) {
				movie.studios = split(movie.production, '/');
				delete movie.production;
			}
			if (movie.country) {
				movie.countries = split(movie.country, ',');
				delete movie.country;
			}
			if (movie.genres) movie.genres = split(movie.genres, ',');
			if (movie.languages) movie.languages = split(movie.languages, ',');
			const [tmdb, fanart] = await this.getFanart(movie.id);
			if (tmdb) movie.link.tmdb = {
				id: tmdb,
				url: `https://www.themoviedb.org/movie/${tmdb}`,
			};
			if (fanart) movie.images = fanart;
			// if (movie.poster) movie.images.poster = {path: this.getPoster(movie.id, movie.poster), title: movie.title};
			movie.watch = this.getWatchLinks(movie.title);
			movie.data = movie.wikidata ? await this.getWikiData(movie.wikidata) : null;
		}
		return movie;
	}

	async getMovieDetails() {
		for (const index in this.movies) {
			this.movies[index] = await this.getDetails(this.movies[index]);
		}
	}

	async get() {
		const sheets = google.sheets({
			version: 'v4',
			auth: process.env.GoogleAPIKey,
		});
		const sheet = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.GoogleSheetID,
			range: 'A1:ZZ10000',
		});
		const titles = sheet.data.values.shift();
		const events = sheet.data.values.map((row) => titles.reduce((rows, title, index) => ({...rows, [title.toLowerCase()]: row[index]}), {}));
		this.events = this.getEvents(events);
		this.movies = this.getMovies(events);
		this.addEventsToDays();
		await this.getMovieDetails();
		this.getStudios();
		this.getGenres();
		this.getLanguages();
		this.getCountries();
		this.getYears();
	}

	stats() {
		let days = 0;
		for (const day of this.days) {
			if (day.events.length) days++;
		}
		return days;
	}
}

async function getAll() {
	const movieEvents = new MovieEvents();
	await movieEvents.get();
	if (!module.parent) {
		const days = movieEvents.stats();
		console.log(movieEvents.movies.length, 'movies.', days, 'days covered,', 366 - days, 'days missing.');
	}
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
