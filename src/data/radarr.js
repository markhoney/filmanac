require('dotenv').config();
const http = require('http');
const MovieEvents = require('./movieevents');
const movieEvents = new MovieEvents();

const options = {
	hostname: '172.22.2.5',
	port: 7878,
	path: '/api/v3/movie',
	method: 'POST',
	headers: {
		'X-Api-Key': process.env.RadarrAPIKey,
	}
};

function post(movie) {
	const title = movie.title + ' (' + movie.year + ')';
	console.log(movie);
	const request = {
		title: title,
		titleSlug: movie.slug,
		// imdbid: movie.info.imdbid.id,
		rootFolderPath: "/movies/",
		// tmdbid: movie.info.tmdb.id,
		// profileId: 1,
		// qualityProfileId: 1,
		// monitored: true,
		// year: movie.year,
		tmdbid: movie.info.tmdb.id.toString(),
		profileId: '1',
		qualityProfileId: '1',
		monitored: 'true',
		year: movie.year.toString(),
		path: '/movies/' + title,
	};
	console.log(request);
	const post = http.request(options);
	post.write(JSON.stringify(request));
  post.end();
}

async function run() {
	await movieEvents.get();
	for (const movie of movieEvents.movies) if (movie.id === 'tt0105291') post(movie);
}

run();
