require('dotenv').config();
require('colors');
const {resolve} = require('path');
const {existsSync, readFileSync, createWriteStream} = require('fs');
const fetch = require('node-fetch');
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const unavailable = require('./unavailable');

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
		art.logo = getURL([...(fanart.hdmovielogo || []), ...(fanart.movielogo || [])]);
		art.clearart = getURL([...(fanart.hdmovieclearart || []), ...(fanart.movieclearart || [])]);
		art.poster = getURL(fanart.movieposter);
		let keyart;
		if (fanart.movieposter) keyart = fanart.movieposter.find((art) => art.lang === '00');
		if (keyart) art.keyart = keyart.url;
		art.fanart = getURL(fanart.moviebackground);
		art.disc = getURL(fanart.moviedisc);
		art.banner = getURL(fanart.moviebanner);
		art.landscape = getURL(fanart.moviethumb);
	}
	return art;
}

async function getArt(id, urls) {
	const art = {};
	for (const type in urls) {
		if (urls[type]) {
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
		}
	}
	return art;
}

async function getFanart(id, omdbposter, tmdbposter, tmdbfanart) {
	let urls = {};
	if (omdbposter) urls.poster = omdbposter;
	if (!unavailable.exists('fanart', id)) {
		const json = resolve('cache', 'json', 'fanart', `${id}.json`);
		let details;
		if (!existsSync(json)) {
			console.log('Downloading Fanart info for', id);
			try {
				details = await fanart.movies.get(id);
				writeFileSync(json, JSON.stringify(details, null, '	'));
			} catch(e) {
				console.log('Fanart info scraping error for'.red, id);
				// console.log(e);
				unavailable.add('fanart', id);
			}
		} else {
			details = JSON.parse(readFileSync(json, 'utf8'));
		}
		urls = {
			...urls,
			...getFanartURLs(details),
		};
	}
	if (tmdbposter) urls.poster = 'https://image.tmdb.org/t/p/original/' + tmdbposter;
	if (tmdbfanart) urls.fanart = 'https://image.tmdb.org/t/p/original/' + tmdbfanart;
	return await getArt(id, urls);
}

module.exports = getFanart;
