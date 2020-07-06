function getURL(fanart) {
	let art;
	if (fanart && fanart.length) {
		art = fanart.find((art) => art.lang === 'en' && art.disc_type === 'bluray');
		if (!art) art = fanart.find((art) => art.lang === 'en');
		if (!art) art = fanart[0];
		// if (art) art = {url: art.url};
	}
	return art && art.url;
}

function getFanartURLs(fanart) {
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

async function getArt(id, urls) {
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

async function getFanart(id, poster) {
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
