require('colors');
const {resolve} = require('path');
const {existsSync, readFileSync, writeFileSync} = require('fs');
// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const unavailable = require('./unavailable');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function getBechdel(id) {
	if (!unavailable.exists('bechdel', id)) {
		const json = resolve('cache', 'json', 'bechdel', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading Bechdel Test info for', id);
			try {
				await sleep(1000);
				const page = await fetch('http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' + id.replace('tt', ''));
				const details = await page.json();
				if (!details.status) {
					writeFileSync(json, JSON.stringify(details, null, '\t'));
					return details;
				} else {
					unavailable.add('bechdel', id);
				}
			} catch(e) {
				console.log('Bechdel Test scraping error for'.red, id);
				console.log(e);
				// unavailable.add('bechdel', id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}
};
