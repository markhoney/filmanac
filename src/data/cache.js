require('colors');
const {resolve} = require('path');
const {existsSync, mkdirSync, readFileSync, writeFileSync, createWriteStream} = require('fs');
const fetch = require('node-fetch');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function image(folder, id, url) {
	const dir = resolve('cache', 'images', folder);
	if (!existsSync(dir)) mkdirSync(dir, {recursive: true});
	const cache = resolve(dir, `${id}.${url.split('.').pop().toLowerCase().replace('jpeg', 'jpg')}`);
	if (existsSync(cache)) return cache;
	else {
		console.log(`Downloading ${url.split('/').pop()} to ${folder}`);
		await sleep(1000);
		try {
			const res = await fetch(url);
			await res.body.pipe(createWriteStream(cache));
			return cache;
		} catch(e) {
			console.log(`Error scraping`.red, url);
			// console.log(e);
		}
	}
}

async function json(folder, id, func, ...arguments) {
	const dir = resolve('cache', 'json', folder);
	if (!existsSync(dir)) mkdirSync(dir, {recursive: true});
	const cache = resolve(dir, `${id}.json`);
	if (existsSync(cache)) return JSON.parse(readFileSync(cache, 'utf8'));
	else {
		console.log(`Downloading ${folder} info for ${id}`);
		await sleep(1000);
		try {
			const details = await func(...arguments);
			writeFileSync(cache, JSON.stringify(details, null, '\t'));
			return details;
		} catch(e) {
			console.log(`Error scraping ${folder} info for`.red, id);
			// console.log(e);
		}
	}
}

module.exports = {image, json};
