require('dotenv').config();
require('colors');
const {readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const {google} = require('googleapis');
// const MovieDB = require('node-themoviedb/index');
// const mdb = new MovieDB(process.env.TheMovieDBKey);

class MovieEvents {
	constructor() {
		this.sheets = null;
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
		const days = [];
		for (let month = 1; month <= months.length; month++) {
			for (let day = 1; day <= months[month - 1]; day++) {
				days.push({
					id: [month, day].join('-'),
					path: `/${month}/${day}`,
					month,
					month_short: monthName(month).toLowerCase().slice(0, 3),
					month_full: monthName(month),
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
			const ev = {
				id: [month, day, event.imdb].join('-'),
				info: {},
				movie: event.imdb,
				reason: {
					short: event.reason,
					description: event.longreason,
				},
				refreshments: {
					list: event.refreshments && event.refreshments.split(',').map((refreshment) => refreshment.trim()),
					description: event.refreshmentsreason,
				},
				mention: {
					timestamp: event.timestamp,
					description: event.mention,
				},
				date: {
					year,
					month,
					month_short: monthName(month).toLowerCase().slice(0, 3),
					month_full: monthName(month),
					day,
					day_ordinal: day + (day > 0 ? ['th', 'st', 'nd', 'rd'][(day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10] : ''),
					js: year || year === 0 ? new Date(year, month - 1, day) : null,
				},
			};
			if (event.wikidata) {
				ev.info.wikidata = {
					id: event.wikidata,
					url: `https://www.wikidata.org/wiki/${event.wikidata}`,
				};
			}
			if (event.wikipedia) {
				ev.info.wikipedia = {
					id: event.wikipedia,
					url: `https://en.wikipedia.org/wiki/${event.wikipedia}`,
				};
			}

			return ev;
		});
	}

	getImagePath(title, type, variant, lookup) {
		if (lookup) {
			const newtitle = lookup.find((name) => name.from === title);
			if (newtitle) title = newtitle.to;
		}
		for (const name of unique([title, title.split(' ').join(''), title.toLowerCase(), title.toLowerCase().split(' ').join('')])) {
			for (const ext of ['.png', '.jpg']) {
				// if (existsSync(path)) return path;
				const src = resolve(__dirname, '..', 'images', type, variant, name + ext);
				if (existsSync(src)) {
					const dest = resolve(__dirname, '..', '..', 'static', 'images', type, variant, name + ext);
					if (!existsSync(dest)) {
						mkdirSync(resolve(__dirname, '..', '..', 'static', 'images', type, variant), {recursive: true});
						copyFileSync(src, dest);
					}
					return '/' + ['images', type, variant, name + ext].join('/');
				}
			}
		}
		console.log(`Missing ${type}:`.red, title);
		return null;
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

	getArtURLs(fanart, poster) {
		const art = {};
		if (fanart) {
			art.logo = this.getURL([...(fanart.hdmovielogo || []), ...(fanart.movielogo || [])]);
			art.clearart = this.getURL([...(fanart.hdmovieclearart || []), ...(fanart.movieclearart || [])]);
			art.poster = this.getURL(fanart.movieposter);
			if (!art.poster) art.poster = {url: poster};
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

	async getArt(fanart, id, poster) {
		const art = this.getArtURLs(fanart, poster);
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

	async getFanart(id, poster) {
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
		if (details) return [details.tmdb_id, await this.getArt(details, id, poster)];
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
			const [tmdb, fanart] = await this.getFanart(movie.id, movie.poster);
			if (tmdb) movie.info.tmdb = {
				id: tmdb,
				url: `https://www.themoviedb.org/movie/${tmdb}`,
			};
			if (fanart) movie.images = fanart;
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

	async getSheet(name) {
		if (!this.sheets) {
			this.sheets = google.sheets({
				version: 'v4',
				auth: process.env.GoogleAPIKey,
			});
		}
		const sheet = await this.sheets.spreadsheets.values.get({
			spreadsheetId: process.env.GoogleSheetID,
			range: name + '!A1:ZZ10000',
		});
		const titles = sheet.data.values.shift();
		return sheet.data.values.map((row) => titles.reduce((rows, title, index) => ({...rows, [title.toLowerCase()]: row[index]}), {}));
	}

	async get() {
		const events = await this.getSheet('Movies');
		const countries = await this.getSheet('Countries');
		for (const country of countries) {
			if (country.languages) country.languages = country.languages.split(',');
			if (country.altnames) country.altnames = country.altnames.split(',');
		}
		this.events = this.getEvents(events);
		this.movies = this.getMovies(events);
		this.addEventsToDays();
		await this.getMovieDetails();
		this.getStudios();
		this.getGenres();
		this.getLanguages(countries);
		this.getCountries(countries);
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
	// for (const movie of movieEvents.movies) console.log(movie.studios);
	if (!module.parent) {
		const days = movieEvents.stats();
		console.log(movieEvents.movies.length, 'movies.', days, 'days covered,', 366 - days, 'days missing.');
	}
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
