require('dotenv').config();
const {existsSync} = require('fs');
const {resolve} = require('path');
const http = require('http');
const MovieEvents = require('./movieevents');
const movieEvents = new MovieEvents();

const options = {
	hostname: '172.22.2.5',
	port: 7878,
	path: '/api/movie',
	method: 'POST',
	headers: {
		'X-Api-Key': process.env.RadarrAPIKey,
		'Content-Type': 'application/json',
	}
};

function getRequest(movie) {
	return {
		title: movie.title,
		alternativeTitles: [],
		secondaryYearSourceId: 0,
		sortTitle: movie.title.toLowerCase(),
		sizeOnDisk: 0,
		status: 'released',
		overview: movie.plot,
		inCinemas: movie.date,
		images: [],
		/* images: [
			{
				coverType: 'poster',
				url: 'http://image.tmdb.org/t/p/original/wEPTCmzKLnP9GArjWvYfI6TJTv6.jpg',
			},
		], */
		downloaded: false,
		// remotePoster: 'http://image.tmdb.org/t/p/original/wEPTCmzKLnP9GArjWvYfI6TJTv6.jpg',
		year: movie.year,
		hasFile: false,
		profileId: '1',
		pathState: 'dynamic',
		monitored: true,
		minimumAvailability: 'announced',
		isAvailable: true,
		folderName: '',
		runtime: 0,
		tmdbId: movie.info.tmdb.id,
		titleSlug: [movie.slug, movie.info.tmdb.id].join('-'),
		genres: [],
		tags: [],
		added: '0001-01-01T00:00:00Z',
		ratings: {
				votes: movie.votes,
				value: movie.score / 10,
		},
		qualityProfileId: 0,
		episodeFileCount: 0,
		episodeCount: 0,
		isExisting: false,
		saved: false,
		deleted: false,
		rootFolderPath: '/movies/',
		addOptions: {
			ignoreEpisodesWithFiles: false,
			ignoreEpisodesWithoutFiles: false,
			searchForMovie: true,
		},
	};
}

async function post(postData) {
	return new Promise((resolve, reject) => {
		const req = http.request(options, (res) => {
			if (res.statusCode < 200 || res.statusCode >= 300) {
				console.log(`Status Code: ${res.statusCode}`);
				// return reject(new Error(`Status Code: ${res.statusCode}`));
			}
			const data = [];
			res.on('data', chunk => {
				data.push(chunk);
			});
			res.on('end', () => resolve(Buffer.concat(data).toString()));
		});
		req.on('error', reject);
		req.end(postData);
	});
}

async function run() {
	await movieEvents.get();
	for (const movie of movieEvents.movies) {
		const movieName = `${movie.title.replace(/\//g, '-').replace(': ', ' - ').replace('…', '...')} (${movie.year})`;
		const input = resolve(process.env.MoviePath, movieName, movieName + '.mkv');
		if (!existsSync(input)) {
			try {
				console.log('Requesting movie:', movieName);
				const response = await post(JSON.stringify(getRequest(movie)));
				console.log('Response', response);
			} catch (e) {
				// console.error(e);
				console.log('Problem requesting movie');
			}
		} else {
			console.log('Movie exists:', movieName);
		}
	}
}

run();
