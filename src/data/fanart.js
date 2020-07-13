require('dotenv').config();
require('colors');
const fanart = new (require('fanart.tv'))(process.env.FanartTVKey);
const unavailable = require('./unavailable');
const cache = require('./cache');

function getURL(fanarts) {
	let art;
	if (fanarts && fanarts.length) {
		art = fanarts.find((art) => art.lang === 'en' && art.disc_type === 'bluray');
		if (!art) art = fanarts.find((art) => art.lang === 'en');
		if (!art) art = fanarts[0];
	}
	return art && art.url;
}

function getFanartURLs(fanarts) {
	const art = {};
	if (fanarts) {
		art.logo = getURL([...(fanarts.hdmovielogo || []), ...(fanarts.movielogo || [])]);
		art.clearart = getURL([...(fanarts.hdmovieclearart || []), ...(fanarts.movieclearart || [])]);
		art.poster = getURL(fanarts.movieposter);
		if (!art.poster) delete art.poster;
		let keyart;
		if (fanarts.movieposter) keyart = fanarts.movieposter.find((art) => art.lang === '00');
		if (keyart) art.keyart = keyart.url;
		art.fanart = getURL(fanarts.moviebackground);
		if (!art.fanart) delete art.fanart;
		art.disc = getURL(fanarts.moviedisc);
		art.banner = getURL(fanarts.moviebanner);
		art.landscape = getURL(fanarts.moviethumb);
	}
	return art;
}

async function getArt(id, urls) {
	const art = {};
	for (const type in urls) {
		if (urls[type]) {
			art[type] = await cache.image(type, id, urls[type]);
		}
	}
	return art;
}

async function getFanart(id, poster, backdrop) {
	let urls = {};
	if (poster) urls.poster = poster;
	if (backdrop) urls.fanart = backdrop;
	if (!unavailable.exists('fanart', id)) {
		const details = await cache.json('fanart', id, fanart.movies.get, id);
		if (details) {
			urls = {
				...urls,
				...getFanartURLs(details),
			};
		} else {
			unavailable.add('fanart', id);
		}
	}
	return await getArt(id, urls);
}

module.exports = getFanart;
