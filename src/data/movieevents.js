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

const nofanart = require('./nofanart.json');

function unique(array) {
	return [...new Set(array)].filter((element) => !['N/A', 'None', '', null, undefined].includes(element));
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
		this.movie = [];
		this.event = [];
		this.studios = [];
		this.rated = [];
		this.genres = [];
		this.countries = [];
		this.languages = [];
		this.stats = {};
		this.year = [];
		this.directors = [];
		this.writers = [];
		this.actors = [];
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
					day,
					title: `${monthName(month)} ${day}${ord(day)}`,
					// dm: `${day}${ord(day)} ${monthName(month)}`,
				});
			}
			months[month - 1] = {
				id: month,
				slug: monthName(month).toLowerCase().slice(0, 3),
				days: months[month],
				title: monthName(month),
			};
		}
		dates[0].previous = '/12/31';
		dates[0].next = '/1/2';
		for (let day = 1; day < dates.length - 1; day++) {
			dates[day].previous = dates[day - 1].path;
			dates[day].next = dates[day + 1].path;
		}
		dates[365].previous = '/12/30';
		dates[365].next = '/1/1';
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
				content: event.longreason,
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
				year,
				month,
				day,
				dayofyear: [month, day].join('-'),
				iso: year ? [event.year, event.month, event.day].join('-') : null,
				// dmy: `${day}${ord(day)} ${monthName(month)} ${year || ''}`.trim(),
				title: `${monthName(month)} ${day}${ord(day)} ${year || ''}`.trim(),
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

	getImagePath(title, type, variant) {
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
		console.log(`Missing ${type} image:`.red, title);
		return null;
	}

	getRated() {
		const rated = unique(this.movie.map((movie) => movie.rated).filter((rated) => rated)).map((rated) => ({
			id: slugify(rated),
			title: rated.toUpperCase(),
			// icon: this.getImagePath(rated, 'rating', 'us'),
		}));
		for (const movie of this.movie) {
			if (movie.rated) movie.rated = slugify(titleCase(movie.rated));
		}
		return rated;
	}

	getStudios() {
		const studios = unique(this.movie.map((movie) => movie.studios).flat()).map((studio) => ({
			id: slugify(studio),
			title: studio,
			icon: this.getImagePath(studio, 'studio', 'colour'),
		}));
		for (const movie of this.movie) {
			if (movie.studios) movie.studios = movie.studios.map((studio) => slugify(studio));
		}
		return studios;
	}

	getLanguages(lookup) {
		const languages = unique(this.movie.map((movie) => movie.languages).flat()).map((language) => {
			const row = lookup.find((row) => row.languages && row.languages.includes(language));
			if (row) return {
				id: slugify(language),
				title: language,
				country: slugify(row.name),
			};
			else {
				console.log('Missing language'.red, language);
				return {
					id: slugify(language),
					title: language,
				};
			}
		});
		for (const movie of this.movie) {
			if (movie.languages) movie.languages = movie.languages.map((language) => slugify(language));
		}
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
				map: this.getImagePath(row.name, 'country', 'map'),
				flag: this.getImagePath(row.name, 'country', 'flag'),
			};
			else {
				console.log('Missing country'.red, country);
				return {
					id: slugify(country),
					title: country,
				};
			}
		});
		for (const movie of this.movie) {
			if (movie.countries) movie.countries = movie.countries.map((country) => slugify(country));
		}
		return countries;
	}

	getGenres() {
		const genres = unique(this.movie.map((movie) => movie.genres).flat()).map((genre) => ({
			id: slugify(genre),
			title: genre,
			icon: this.getImagePath(genre, 'genre', 'white'),
			fanart: this.getImagePath(genre, 'genre', 'fanart'),
		}));
		for (const movie of this.movie) {
			if (movie.genres) movie.genres = movie.genres.map((genre) => slugify(genre));
		}
		return genres;
	}

	getYears() {
		const years = unique(this.event.map((event) => event.year)).map((year) => ({
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

	getArtURLs(fanart, id, poster) {
		const art = {};
		if (fanart) {
			art.logo = this.getURL([...(fanart.hdmovielogo || []), ...(fanart.movielogo || [])]);
			art.clearart = this.getURL([...(fanart.hdmovieclearart || []), ...(fanart.movieclearart || [])]);
			art.poster = this.getURL(fanart.movieposter);
			if (!art.poster) {
				if (poster) art.poster = {url: poster};
				else console.log('No poster for'.red, id);
			}
			let keyart;
			if (fanart.movieposter) keyart = fanart.movieposter.find((art) => art.lang === '00');
			if (keyart) art.keyart = {url: keyart.url};
			art.fanart = this.getURL(fanart.moviebackground);
			art.disc = this.getURL(fanart.moviedisc);
			art.banner = this.getURL(fanart.moviebanner);
			art.landscape = this.getURL(fanart.moviethumb);
		} else if (poster) {
			art.poster = {url: poster};
		}
		return art;
	}

	async getArt(fanart, id, poster) {
		const art = this.getArtURLs(fanart, id, poster);
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
		if (!nofanart.includes(id)) {
			const json = resolve(__dirname, 'json', 'fanart', `${id}.json`);
			let details;
			if (!existsSync(json)) {
				console.log('Downloading Fanart info for', id);
				try {
					details = await fanart.movies.get(id);
					writeFileSync(json, JSON.stringify(details, null, '	'));
				} catch(e) {
					// console.log(e);
					console.log('Fanart scraping error for'.red, id);
					nofanart.push(id);
					writeFileSync(resolve(__dirname, 'nofanart.json'), JSON.stringify(nofanart, null, '	'));
				}
			} else {
				details = JSON.parse(readFileSync(json, 'utf8'));
			}
			if (details) return [details.tmdb_id, await this.getArt(details, id, poster)];
		}
		return [null, await this.getArt(null, id, poster)];
	}

	async getWikiData(id) {
		const json = resolve(__dirname, 'json', 'wikidata', `${id}.json`);
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
				content: details.plot,
				// ...paths,
			};
			if (movie.production) {
				movie.studios = split(movie.production, '/');
				delete movie.production;
			}
			if (movie.country) {
				movie.countries = split(movie.country);
				delete movie.country;
			}
			if (movie.genres) movie.genres = split(movie.genres);
			if (movie.languages) movie.languages = split(movie.languages);
			if (movie.actors) movie.actors = split(movie.actors);
			if (movie.runtime) movie.runtime = movie.runtime.replace(' min', '');
			if (movie.rating) movie.rating = movie.rating * 10;
			if (movie.rated) movie.rated = movie.rated.toUpperCase();
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
		const events = await this.getSheet('Movies');
		const countries = (await this.getSheet('Countries')).map((country) => ({
			...country,
			titles: country.names && split(country.names),
			languages: country.languages && split(country.languages),
		}));
		this.event = this.getEvents(events);
		this.movie = this.getMovies(events);
		await this.getMovieDetails();
		this.studios = this.getStudios();
		this.rated = this.getRated();
		this.genres = this.getGenres();
		this.languages = this.getLanguages(countries);
		this.countries = this.getCountries(countries);
		this.years = this.getYears();
		this.days = this.getDates();
		this.stats = this.getStats();
	}

	stat(name) {
		const stat = this.stats.find((stat) => stat.id === name);
		if (stat) return stat.value;
	}

	getStats() {
		const days = unique(this.event.map((event) => event.dayofyear)).length;
		return [
			{id: 'days', value: days},
			{id: 'missing', value: 366 - days},
			{id: 'months', value: this.month.length},
			{id: 'years', value: this.year.length},
			{id: 'dates', value: this.days.length},
			{id: 'events', value: this.event.length},
			{id: 'movies', value: this.movie.length},
			{id: 'rated', value: this.rated.length},
			{id: 'studios', value: this.studios.length},
			{id: 'genres', value: this.genres.length},
			{id: 'languages', value: this.languages.length},
			{id: 'countries', value: this.countries.length},
		];
	}
}

async function getAll() {
	const movieEvents = new MovieEvents();
	await movieEvents.get();
	if (!module.parent) {
		console.log();
		console.log(movieEvents.stat('events'), 'events in', movieEvents.stat('movies'), 'movies.', movieEvents.stat('days'), 'days covered,', movieEvents.stat('missing'), 'days missing.');
		console.log();
	}
}

module.exports = MovieEvents;

if (!module.parent) {
	getAll();
}
