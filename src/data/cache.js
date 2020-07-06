const {resolve} = require('path');
const {existsSync, mkdirSync} = require('fs');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async function(type, id, func, wait = 1000) {
	const folder = resolve('cache', 'json', type);
	if (!existsSync(folder)) mkdirSync(folder, {recursive: true});
	const cache = resolve(folder, `${id}.json`);
	if (!existsSync(cache)) {
		console.log(`Downloading ${type} info for ${id}`);
		try {
			await sleep(wait);
			const details = await func(id);
			writeFileSync(cache, JSON.stringify(details, null, '\t'));
			return details;
		} catch(e) {
			console.log(`Error scraping ${type} for`.red, id);
			// console.log(e);
		}
	} else {
		return JSON.parse(readFileSync(cache, 'utf8'));
	}
};
