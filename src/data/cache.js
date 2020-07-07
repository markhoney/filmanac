const {resolve} = require('path');
const {existsSync, mkdirSync, writeFileSync} = require('fs');
require('colors');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getBinary(folder, file, func, ...arguments) {
	const dir = resolve('cache', folder);
	if (!existsSync(dir)) mkdirSync(dir, {recursive: true});
	const cache = resolve(dir, file);
	if (!existsSync(cache)) {
		console.log(`Downloading ${type} info for ${id}`);
		await sleep(1000);
		try {
			const details = await func(...arguments);
			writeFileSync(cache, JSON.stringify(details, null, '\t'));
			return details;
		} catch(e) {
			console.log(`Error scraping ${type} for`.red, id);
			// console.log(e);
		}
	} else {
		return readFileSync(cache, 'utf8');
	}
}

async function getJSON(folder, file, func, ...arguments) {
	const dir = resolve('cache', folder);
	if (!existsSync(dir)) mkdirSync(dir, {recursive: true});
	const cache = resolve(dir, file);
	if (!existsSync(cache)) {
		console.log(`Downloading ${type} info for ${id}`);
		await sleep(1000);
		try {
			const details = await func(...arguments);
			writeFileSync(cache, JSON.stringify(details, null, '\t'));
			return details;
		} catch(e) {
			console.log(`Error scraping ${type} for`.red, id);
			// console.log(e);
		}
	} else {
		return JSON.parse(readFileSync(cache, 'utf8'));
	}
}

module.exports = {getJSON};
