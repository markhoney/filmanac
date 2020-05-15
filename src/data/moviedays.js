require('dotenv').config();
require('colors');
const {readFileSync, writeFileSync, existsSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const {google} = require('googleapis');
const languages = require('./json/languages.json');

class MovieDays {
	constructor() {
		this.movies = [];
		this.days = [];
		this.movieDays = [];
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
		const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		for (let month = 1; month <= months.length; month++) {
			for (let day = 1; day <= months[month - 1]; day++) {
				this.days.push({id: [month, day].join('-'), month, day, movies: []});
			}
		}
		this.movies = (movieDays.map((movieDay) => ({
			id: movieDay.imdb,
			wikidata: movieDay.moviewikidata,
		}))).filter((v,i,a) => a.findIndex((t) => (t.id === v.id)) === i);
		for (const index in this.movies) {
			const movie = this.movies[index];
			const data = movie.wikidata ? await this.getWikiData(movie.wikidata) : null;
			const details = await this.getDetails(movie.id);
			// const fanart = await this.getFanart(movie.id);
			this.movies[index] = {
				...movie,
				...details,
			};
		}
		this.movieDays = movieDays.map((row) => {
			const year = parseInt(row.year);
			const month = parseInt(row.month);
			const day = parseInt(row.day);
			const movieDay = {
				id: [month, day, row.imdb].join('-'),
				imdb: row.imdb,
				wikipedia: row.wikipedia,
				reason: row.reason,
				refreshments: row.refreshments,
				timestamp: row.timestamp,
				mention: row.mention,
				year,
				month,
				day,
			};
			this.days.find((day) => day.month === movieDay.month && day.day === movieDay.day).movies.push(movieDay.id);
			return movieDay;
		});
	}

	getPoster(id, url) {
		if (url) {
			const image = resolve(__dirname, 'images', 'posters', `${id}.jpg`);
			if (!existsSync(image)) {
				if (url.startsWith('https://')) {
					console.log(`Downloading image for ${id}`);
					fetch(url).then((res) => res.body.pipe(createWriteStream(image)));
				} else {
					console.log(`Invalid image URL for ${id} -`.red, url);
					return null;
				}
			}
			return image;
		} else {
			console.log(`No image URL for ${id} -`.red, url);
			return null;
		}
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

	removeNA(obj) {
		for (let prop in obj) {
			if (typeof obj[prop] === 'string' && ['N/A', 'None', '', null].includes(obj[prop].trim())) delete obj[prop];
		}
		return obj;
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

	async getFanart(id) {
		const json = resolve(__dirname, 'json', 'fanart', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading Fanart info for', id);
			try {
				const details = await fanart.movies.get(id);
				writeFileSync(json, JSON.stringify(details, null, '	'));
				return details;
			} catch(e) {
				// console.log(e);
				console.log('Fanart scraping error for'.red, id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}

	getImages(string, type, variant, lookup) {
		const images = [];
		if (string) for (let title of string) {
			let missing = true;
			title = title.trim();
			let item = title;
			if (lookup) {
				const name = lookup.find((name) => name.from === item);
				if (name) item = name.to;
			}
			for (const name of [...new Set([item, item.split(' ').join(''), item.toLowerCase(), item.toLowerCase().split(' ').join('')])]) {
				for (const ext of ['.png', '.jpg']) {
					if (missing) {
						const path = resolve(__dirname, '..', 'images', type, variant, name + ext);
						if (existsSync(path)) {
							images.push({path, title});
							missing = false;
						}
					}
				}
			}
			if (missing) console.log(`Missing ${type}:`.red, title);
		}
		return images;
	}

	async getDetails(id) {
		const details = this.removeNA(await this.getOMDB(id));
		// http://country.io/names.json
		if (details) {
			details.images = {};
			if (details.poster) details.images.poster = {path: this.getPoster(id, details.poster), title: details.title};
			if (details.production) details.images.studio = this.getImages(details.production.split('/'), 'studio', 'colour');
			if (details.genres) details.images.genre = this.getImages(details.genres.split(','), 'genre', 'white');
			if (details.country) details.images.country = this.getImages(details.country.split(','), 'country', 'map');
			if (details.languages) details.images.language = this.getImages(details.languages.split(','), 'country', 'flag', languages);
			return details;
		}
	}

	stats() {
		let days = 0;
		for (const day of this.days.flat()) {
			if (day) days++;
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
