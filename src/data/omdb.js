require('dotenv').config();
require('colors');
const {resolve} = require('path');
const {existsSync, readFileSync, writeFileSync} = require('fs');
const imdb = new (require('imdb-api')).Client({apiKey: process.env.OMDBAPIKey});

function unique(array) {
	return [...new Set(array)].filter((element) => !['N/A', 'None', '', null, undefined, false].includes(element));
}

function split(string, separator = ',') {
	if (string) return unique(string.split(separator).map((item) => item.trim().replace(/\.+$/g, '')));
	return [];
}

function cleanObj(obj) {
	for (let prop in obj) {
		if (typeof obj[prop] === 'string' && ['N/A', 'None', '', null, undefined].includes(obj[prop].trim())) delete obj[prop];
	}
	return obj;
}

function processOMDB(omdb) {
	const movie = {title: omdb.title};
	if (omdb.year) movie.year = omdb.year;
	if (omdb.rated) movie.classification = omdb.rated.toUpperCase();
	if (omdb.released) movie.released = new Date(omdb.released);
	if (omdb.runtime) movie.runtime = parseInt(omdb.runtime.replace(' min', ''));
	if (omdb.genres) movie.genres = split(omdb.genres);
	if (omdb.director) movie.directors = split(omdb.director);
	if (omdb.writer) movie.writers = split(omdb.writer);
	if (omdb.actors) movie.actors = split(omdb.actors);
	if (omdb.plot) movie.plot = omdb.plot;
	if (omdb.languages) movie.languages = split(omdb.languages.replace(',  Ancient (to 1453)', ''));
	if (omdb.country) movie.countries = split(omdb.country);
	if (omdb.awards) movie.awards = omdb.awards;
	if (omdb.rating) movie.score = omdb.rating * 10;
	if (omdb.votes) movie.votes = parseInt(omdb.votes.replace(/,/g, ''));
	if (omdb.imdbid) movie.id = omdb.imdbid;
	if (omdb.boxoffice) movie.revenue = omdb.boxoffice;
	if (movie.production) movie.studios = split(omdb.production.replace('&amp;', '/').replace(/Corporat$/, 'Corporation').replace(/Entertain$/, 'Entertainment').replace(/Compa$/, 'Company').replace(/Internationa$/, 'International').replace(/Distrib$/, 'Distribution'), '/');
	if (omdb.website) movie.website = omdb.website;
	return movie;
}

module.exports = async function getOMDB(id) {
	const json = resolve('cache', 'json', 'omdb', `${id}.json`);
	if (!existsSync(json)) {
		console.log('Downloading OMDB info for', id);
		try {
			const details = await imdb.get({id});
			writeFileSync(json, JSON.stringify(details, null, '	'));
			return processOMDB(details);
		} catch(e) {
			console.log('OMDB scraping error for'.red, id);
			console.log(e);
		}
	} else {
		return processOMDB(cleanObj(JSON.parse(readFileSync(json, 'utf8'))));
	}
	return {};
};
