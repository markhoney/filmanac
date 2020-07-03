require('dotenv').config();
require('colors');
const {readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, createWriteStream} = require('fs');
const {resolve} = require('path');
const fetch = require('node-fetch');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const {google} = require('googleapis');
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB(process.env.TheMovieDBKey);
const {v3, v4} = require('@leonardocabeza/the-movie-db');
const v4Client = v4(process.env.TheMovieDB4Key);
const v3Client = v3(process.env.TheMovieDBKey);

const nofanart = require('../../cache/images/nofanart.json');

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

function ord(number) {
	return number > 0 ? ['th', 'st', 'nd', 'rd'][(number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10] : '';
}

function ordWord(number) {
	return [
		'Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth',
		'Tenth', 'Eleventh', 'Twelth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth',
		'Twentieth', 'Twenty First', 'Twenty Second', 'Twenty Third', 'Twenty Fourth', 'Twenty Fifth', 'Twenty Sixth', 'Twenty Seventh', 'Twenty Eighth', 'Twenty Ninth',
		'Thirtieth', 'Thirty First'
	][number];
}

function numberWord(number) {
	return [
		'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
		'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
		'Twenty', 'Twenty One', 'Twenty Two', 'Twenty Three', 'Twenty Four', 'Twenty Five', 'Twenty Six', 'Twenty Seven', 'Twenty Eight', 'Twenty Nine',
		'Thirty', 'Thirty One'
	][number];
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
					title: ordWord(day),
					ordinal: ord(day),
				});
				dates.push({
					id: [month, day].join('-'),
					path: `/${month}/${day}`,
					month,
					slugs: {
						month: slugify(monthName(month)),
						shortmonth: slugify(monthName(month)),
						day: slugify(ordWord(day)),
						shortday: slugify(day + ord(day)),
					},
					day,
					title: `${monthName(month)} ${day}${ord(day)}`,
					// dm: `${day}${ord(day)} ${monthName(month)}`,
				});
			}
			months[month - 1] = {
				id: month,
				slug: monthName(month).toLowerCase().slice(0, 3),
				// days: months[month],
				// days: dates.filter((date) => date.month === month).map((date) => date.id),
				title: monthName(month),
			};
		}
		/* for (const month of months) {
			month.previous = dates[day - 1].id;
			month.next = dates[day + 1].id;
		} */
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
				refreshments: event.refreshments && event.refreshments.split(',').map((refreshment) => refreshment.trim()),
				mention: event.mention,
				year,
				month,
				day,
				date: year ? new Date([event.year, event.month, event.day].join('-')) : null,
				// dayofyear: [month, day].join('-'),
				// iso: year ? [event.year, event.month, event.day].join('-') : null,
				// dmy: `${day}${ord(day)} ${monthName(month)} ${year || ''}`.trim(),
				// title: `${monthName(month)} ${day}${ord(day)} ${year || ''}`.trim(),
			};
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
		});
	}

	getImagePath(title, paths) {
		for (const path of paths) if (path) {
			for (const name of unique([title, title.split(' ').join(''), title.toLowerCase(), title.toLowerCase().split(' ').join('')])) {
					for (const ext of ['.png', '.jpg', '.svg']) {
					const src = resolve(path, name + ext);
					if (existsSync(src)) return src;
				}
			}
		}
		console.log(`Missing ${paths[0]} image:`.red, title);
		return null;
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
				image: this.getImagePath((image && image.to) || studio, ['node_modules/resource.images.studios.coloured/resources', 'src/images/studios']),
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
				image: this.getImagePath(row.code.toLowerCase(), ['node_modules/svg-country-flags/svg', 'src/images/languages']),
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
				image: this.getImagePath(row.name, ['node_modules/resource.images.moviecountryicons.maps/resources']),
				map: this.getImagePath(row.code.toLowerCase() + '/vector', ['node_modules/mapsicon/all']),
				flag: this.getImagePath(row.code.toLowerCase(), ['node_modules/svg-country-flags/svg']),
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
			image: this.getImagePath(genre, ['node_modules/resource.images.moviegenreicons.transparent/resources', 'src/images/genres/transparent']),
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
			title: `${ord(event.day)} ${monthName(event.month)} ${event.year}`,
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
				if (event.moviewikidata) {
					movie.info.wikidata = {
						id: event.moviewikidata,
						url: `https://www.wikidata.org/wiki/${event.moviewikidata}`,
					};
				}
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

	async getFanart(id, poster) {
		let urls = {};
		// if (poster) urls.poster = {url: poster};
		if (poster) urls.poster = poster;
		let tmdb;
		if (!nofanart.includes(id)) {
			let details;
			const json = resolve('cache', 'json', 'fanart', `${id}.json`);
			if (!existsSync(json)) {
				console.log('Downloading Fanart info for', id);
				try {
					details = await fanart.movies.get(id);
					writeFileSync(json, JSON.stringify(details, null, '	'));
				} catch(e) {
					// console.log(e);
					console.log('Fanart info scraping error for'.red, id);
					nofanart.push(id);
					writeFileSync(resolve(__dirname, 'nofanart.json'), JSON.stringify(nofanart, null, '	'));
				}
			} else {
				details = JSON.parse(readFileSync(json, 'utf8'));
			}
			urls = {
				...urls,
				...this.getFanartURLs(details),
			};
			tmdb = details && details.tmdb_id;
		}
		const moviedb = await this.getMovieDB(id);
		if (moviedb && moviedb.movie_results && moviedb.movie_results.length) {
			const movie = moviedb.movie_results[0];
			tmdb = movie.id;
			// if (movie.poster_path) urls.poster = {url: 'https://image.tmdb.org/t/p/original/' + movie.poster_path};
			// if (movie.backdrop_path) urls.fanart = {url: 'https://image.tmdb.org/t/p/original/' + movie.fanart_path};
			if (movie.poster_path) urls.poster = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
			if (movie.backdrop_path) urls.fanart = 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path;
			// console.log(urls.poster, urls.fanart);
		}
		return [tmdb, await this.getArt(id, urls)];
	}

	async getMovieDB(id) {
		const json = resolve('cache', 'json', 'themoviedb', `${id}.json`);
		let details;
		if (!existsSync(json)) {
			console.log('Downloading The Movie DB info for', id);
			try {
				// details = await mdb.find.byExternalID({pathParameters: {external_id: id, external_source: 'imdb_id'}, query: {external_id: id, external_source: 'imdb_id'}});
				details = await v3Client.find.byId({external_id: id, external_source: 'imdb_id'});
				writeFileSync(json, JSON.stringify(details, null, '	'));
			} catch(e) {
				// console.log('The Movie DB scraping error for'.red, id);
				console.log(e);
			}
		} else {
			details = JSON.parse(readFileSync(json, 'utf8'));
		}
		return details;
	}

	async getWikiData(id) {
		const json = resolve('cache', 'json', 'wikidata', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading WikiData info for', id);
			try {
				const details = (await(await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${id}.json`)).json()).entities[id];
				writeFileSync(json, JSON.stringify(details, null, '\t'));
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
	}

	async getDetails(movie) {
		const details = cleanObj(await this.getOMDB(movie.id));
		// http://country.io/names.json
		if (details) {
			// const paths = getMoviePaths(details);
			movie = {
				...movie,
				...details,
				content: details.plot,
				// ...paths,
			};
			if (movie.production) {
				// console.log(movie.production);
				movie.studios = split(movie.production.replace('&amp;', '/').replace(/Corporat$/, 'Corporation').replace(/Entertain$/, 'Entertainment'), '/');
				// console.log(movie.studios);
				delete movie.production;
			}
			if (movie.country) {
				movie.countries = split(movie.country);
				delete movie.country;
			}
			if (movie.genres) movie.genres = split(movie.genres);
			if (movie.languages) movie.languages = split(movie.languages.replace(',  Ancient (to 1453)', ''));
			if (movie.actors) movie.actors = split(movie.actors);
			if (movie.runtime) movie.runtime = parseInt(movie.runtime.replace(' min', ''));
			if (movie.rating) movie.score = movie.rating * 10;
			if (movie.rated) {
				movie.classification = movie.rated.toUpperCase();
				delete movie.rated;
			}
			if (movie.votes) movie.votes = parseInt(movie.votes.replace(/,/g, ''));
			if (movie.director) {
				movie.directors = split(movie.director);
				delete movie.director;
			}
			if (movie.writer) {
				movie.writers = split(movie.writer);
				delete movie.writer;
			}

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

	async eventScreenshot() {
		await extractFrame({
			input: 'media/1.mp4',
			output: 'test.jpg',
			offset: 1000, // seek offset in milliseconds
		});
	}

	async getMovieDetails() {
		for (const index in this.movie) {
			this.movie[index] = await this.getDetails(this.movie[index]);
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
		for (const type of ['omdb', 'wikidata', 'fanart', 'themoviedb']) mkdirSync(resolve('cache', 'json', type), {recursive: true});
		for (const type of ['logo', 'clearart', 'poster', 'keyart', 'fanart', 'disc', 'banner', 'landscape']) mkdirSync(resolve('cache', 'images', type), {recursive: true});
		const events = await this.getSheet('Movies');
		const countries = (await this.getSheet('Countries')).map((country) => ({
			...country,
			titles: country.names && split(country.names),
			languages: country.languages && split(country.languages),
		}));
		const studios = await this.getSheet('Studios');
		this.event = this.getEvents(events);
		this.movie = this.getMovies(events);
		await this.getMovieDetails();
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
		stats.multiple = this.event.reduce((events, event) => {
			const day = event.month * 31 + event.day;
			if (!events[day]) events[day] = 0;
			events[day]++;
			return events;
		}, []).filter((day) => day > 1).length;
		stats.dates = this.days.length;
		for (const cat of ['year', 'event', 'movie', 'years', 'studios', 'genres', 'languages', 'countries', 'directors', 'writers', 'actors', 'score', 'classification', 'celebration']) {
			stats[cat] = this[cat].length;
		}
		for (const source of ['wikipedia', 'wikidata']) {
			stats[source] = this.movie.filter((movie) => movie.info[source]).length;
		}
		for (const image of ['poster', 'fanart', 'logo', 'clearart', 'keyart', 'disc', 'banner', 'landscape']) {
			stats[image] = this.movie.filter((movie) => movie.images && movie.images[image]).length;
		}
		return stats;
	}

	getMissing(stats) {
		const missing = {};
		missing.days = 366 - stats.days;
		missing.multiple = 366 - stats.multiple;
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
	console.log(movieEvents.stat('event'), 'events in', movieEvents.stat('movie'), 'movies.', 366 - movieEvents.stat('multiple'), 'days with only one movie.');
	console.log();
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
