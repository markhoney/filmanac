require('colors');
const {resolve} = require('path');
const {existsSync, readFileSync, writeFileSync} = require('fs');
const fetch = require('node-fetch');
const unavailable = require('./unavailable');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function getWikiData(id, name) {
	if (!unavailable.exists('wikidata', id)) {
		const json = resolve('cache', 'json', 'wikidata', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading WikiData info for', id);
			try {
				await sleep(500);
				const page = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&format=json&titles=${name}`);
				const data = await page.json();
				const details = Object.values(data.entities)[0];
				writeFileSync(json, JSON.stringify(details, null, '\t'));
				return details;
			} catch(e) {
				console.log('WikiData scraping error for'.red, id);
				// console.log(e);
				unavailable.add('wikidata', id);
			}
		} else {
			return JSON.parse(readFileSync(json, 'utf8'));
		}
	}
};
