const {readFileSync, writeFileSync, existsSync, createWriteStream} = require('fs');
const https = require('https');
const IMDB = require('imdb-api');
const apiKey = '918c2982';
const imdb = new IMDB.Client({apiKey});
const parse = require('csv-parse/lib/sync');

// Friday the 13th

function getMovies() {
	return parse(readFileSync('./Movie Dates - Movies.tsv', 'utf8'), {
		columns: true,
		delimiter: '\t',
		trim: true,
		skip_empty_lines: true,
		quote: false,
	});
}

async function getIMDB() {
	const movies = getMovies();
	const dates = {};
	for (const movie of movies) {
		const json = `./imdb/${movie.IMDB}.json`;
		const image = `./posters/${movie.IMDB}.jpg`;
		movie.DateObj = new Date([movie.Year, movie.Month, movie.Day].join('-'));
		dates[[movie.Month, movie.Day].join('-')] = true;
		if (!existsSync(json)) {
			console.log(`Downloading IMDB info for ${movie.Title} (${movie.IMDB})`);
			const details = await imdb.get({id: movie.IMDB});
			writeFileSync(json, JSON.stringify(details, null, '\t'));
		}
		movie.Details = JSON.parse(readFileSync(json, 'utf8'));
		if (!existsSync(image)) {
			if (movie.Details.poster.startsWith('https://')) {
				console.log(`Downloading image for ${movie.Title} (${movie.IMDB})`);
				const file = createWriteStream(image);
				https.get(movie.Details.poster, function(response) {
					response.pipe(file);
					file.on('finish', function() {
						file.close();
					});
				});
			} else {
				console.log(`Invalid image URL for ${movie.Title} (${movie.IMDB}) - ${movie.Details.poster}`);
			}
		}
		// console.log(movie);
	}
	const days = Object.keys(dates).length;
	console.log(movies.length, 'movies.', days, 'days covered,', 366 - days, 'days missing.');
}

getIMDB();
