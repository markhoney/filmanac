require('dotenv').config();
const {readFileSync, writeFileSync, existsSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const https = require('https');
const IMDB = require('imdb-api');
const imdb = new IMDB.Client({apiKey: process.env.IMDBAPIKey});
const {google} = require('googleapis');

class MovieDates {
	constructor() {
		this.movies = [];
		this.dates = [];
		this.movieDates = [];
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
		const data = sheet.data.values;
		const titles = data.shift();
		const movieDates = data.map((row) => titles.reduce((rows, title, index) => ({...rows, [title.toLowerCase()]: row[index]}), {}));
		const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		for (let month = 1; month <= months.length; month++) {
			for (let day = 1; day <= months[month - 1]; day++) {
				this.dates.push({month, day, movies: []});
			}
		}
		this.movies = movieDates.map(async (movieDate) => ({
			id: movieDate.id,
			wikipedia: movieDate.moviewikipedia,
			...await this.getMovieDetails(movieDate.id),
		}));
		this.movieDates = movieDates.map((row) => {
			const month = parseInt(row.month);
			const day = parseInt(row.day);
			const movieDate = {
				imdb: row.id,
				wikipedia: row.wikipedia,
				reason: row.reason,
				refreshments: row.refreshments,
				timestamp: row.timestamp,
				mention: row.mention,
				date: row.year ? new Date([row.year, row.month, row.day].join('-')) : null,
				month,
				day,
				// monthday: [row.month, row.day].join('-'),
			};
			// this.dates[parseInt(row.month) - 1][parseInt(row.day) - 1].movies.push(movieDate);
			this.dates.find((date) => date.month === month && date.day === day)
			return movieDate;
		});
	}

	getPoster(id, url) {
		const image = resolve(__dirname, 'posters', `${id}.jpg`);
		if (!existsSync(image)) {
			if (url.startsWith('https://')) {
				console.log(`Downloading image for ${id}`);
				const file = createWriteStream(image);
				https.get(url, function(response) {
					response.pipe(file);
					file.on('finish', function() {
						file.close();
					});
				});
			} else {
				console.log(`Invalid image URL for ${id} - ${url}`);
				return null;
			}
		}
		return image;
	}

	async getIMDB(id) {
		const json = resolve(__dirname, 'imdb', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading IMDB info for', id);
			try {
				const details = await imdb.get({id});
				writeFileSync(json, JSON.stringify(details, null, '	'));
				return details;
			} catch(e) {
				// console.log(e);
				console.log('Scraping error for', id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}

	async getMovieDetails(id) {
		const details = await this.getIMDB(id);
		// http://country.io/names.json
		if (details && details.poster) details.Poster = this.getPoster(id, details.poster);
		return details;
	}

	stats() {
		let dates = 0;
		for (const day of this.dates.flat()) {
			if (day) dates++;
		}
		return dates;
	}
}

async function getAllMovies() {
	const movieDates = new MovieDates();
	await movieDates.get();
	if (!module.parent) {
		const dates = movieDates.stats();
		console.log(movieDates.movies.length, 'movies.', dates, 'days covered,', 366 - dates, 'days missing.');
	}
}

module.exports = MovieDates;

if (!module.parent) {
	getAllMovies();
}
