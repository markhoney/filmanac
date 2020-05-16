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

class MovieDays {
	constructor() {
		this.days = this.getDays();
		this.movies = [];
		this.movieDays = [];
	}

	removeNA(obj) {
		for (let prop in obj) {
			if (typeof obj[prop] === 'string' && ['N/A', 'None', '', null].includes(obj[prop].trim())) delete obj[prop];
		}
		return obj;
	}

	getDays() {
		const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		const days = [];
		for (let month = 1; month <= months.length; month++) {
			for (let day = 1; day <= months[month - 1]; day++) {
				days.push({id: [month, day].join('-'), month, day, movies: []});
			}
		}
		return days;
	}

	getMovieDays(movieDays) {
		return movieDays.map((row) => {
			const year = parseInt(row.year);
			const month = parseInt(row.month);
			const day = parseInt(row.day);
			const movieDay = {
				id: [month, day, row.imdb].join('-'),
				ids: {
					imdb: row.imdb,
					wikipedia: row.wikipedia,
				},
				movie: id,
				reason: row.reason,
				refreshments: row.refreshments,
				timestamp: row.timestamp,
				mention: row.mention,
				date: {
					year,
					month,
					day,
					js: year || year === 0 ? new Date(year, month - 1, day) : null,
				},
			};
			return movieDay;
		});
	}

	getMovies(movieDays) {
		return movieDays
			.filter((v,i,a) => a.findIndex((t) => (t.imdb === v.imdb)) === i)
			.map((movieDay) => {
				const movie = {
					id: movieDay.imdb,
					link: {
						imdb: {
							id: movieDay.imdb,
							url: `https://www.imdb.com/title/${movieDay.imdb}/`,
						},
					},
				};
				if (movieDay.moviewikidata) {
					movie.link.wikidata = {
						id: movieDay.moviewikidata,
						url: `https://www.wikidata.org/wiki/${movieDay.moviewikidata}`,
					};
				}
				if (movieDay.moviewikipedia) {
					movie.link.wikipedia = {
						id: movieDay.moviewikipedia,
						url: `https://en.wikipedia.org/wiki/${movieDay.moviewikipedia}`,
					};
				}
				return movie;
		});
	}

	addMoviesToDays() {
		for (const movieDay of this.movieDays) {
			this.days.find((day) => day.month === movieDay.date.month && day.day === movieDay.date.day).movies.push(movieDay.id);
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

	getIconPaths(string, type, variant, lookup) {
		const images = [];
		if (string) for (let name of string) {
			let missing = true;
			name = name.trim();
			let item = name;
			if (lookup) {
				const name = lookup.find((name) => name.from === item);
				if (name) item = name.to;
			}
			for (const name of [...new Set([item, item.split(' ').join(''), item.toLowerCase(), item.toLowerCase().split(' ').join('')])]) {
				for (const ext of ['.png', '.jpg']) {
					if (missing) {
						const path = resolve(__dirname, '..', 'images', type, variant, name + ext);
						if (existsSync(path)) {
							images.push({type, path, title: name, url: `/${type}/${name.toLowerCase().split(' ').join('-')}`});
							missing = false;
						}
					}
				}
			}
			if (missing) console.log(`Missing ${type}:`.red, name);
		}
		return images;
	}

	getIcons(details) {
		const icons = {};
		if (details.production) icons.studio = this.getIconPaths(details.production.split('/'), 'studio', 'colour');
		if (details.genres) icons.genre = this.getIconPaths(details.genres.split(','), 'genre', 'white');
		if (details.country) icons.country = this.getIconPaths(details.country.split(','), 'country', 'map');
		if (details.languages) icons.language = this.getIconPaths(details.languages.split(','), 'language', 'flag', languages);
		return icons;
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
		const details = this.removeNA(await this.getOMDB(movie.id));
		// http://country.io/names.json
		if (details) {
			movie = {...movie, ...details};
			movie.images = {icon: this.getIcons(movie)};
			const [tmdb, fanart] = await this.getFanart(movie.id);
			if (tmdb) movie.link.tmdb = {
				id: tmdb,
				url: `https://www.themoviedb.org/movie/${tmdb}`,
			};
			if (fanart) movie.images.art = fanart;
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
		const movieDays = sheet.data.values.map((row) => titles.reduce((rows, title, index) => ({...rows, [title.toLowerCase()]: row[index]}), {}));
		this.movieDays = this.getMovieDays(movieDays);
		this.movies = this.getMovies(movieDays);
		this.addMoviesToDays();
		await this.getMovieDetails();
	}

	stats() {
		let days = 0;
		for (const day of this.days) {
			if (day.movies.length) days++;
		}
		return days;
	}
}

async function getAll() {
	const movieDays = new MovieDays();
	await movieDays.get();
	if (!module.parent) {
		const days = movieDays.stats();
		console.log(movieDays.movies.length, 'movies.', days, 'days covered,', 366 - days, 'days missing.');
	}
}

module.exports = MovieDays;

if (!module.parent) {
	getAll();
}
