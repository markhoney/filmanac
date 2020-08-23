require('dotenv').config();
require('colors');
const {resolve} = require('path');
const {existsSync, readFileSync, writeFileSync} = require('fs');
const unavailable = require('./unavailable');
const {v3} = require('@leonardocabeza/the-movie-db');
const v3Client = v3(process.env.TheMovieDBKey);
// const googlesheet = require('./googlesheet');
// const languages = (await googlesheet('Languages')).reduce((languages, language) => ({...languages, [language.native]: language.english}), {});

function processTMDB(tmdb) {
	const movie = {};
	movie.tmdb = tmdb.id;
	if (tmdb.original_title) movie.title = tmdb.original_title;
	if (tmdb.title) movie.title = tmdb.title;
	if (tmdb.genres) movie.genres = tmdb.genres.map((genre) => genre.name);
	if (tmdb.homepage) movie.website = tmdb.homepage;
	if (tmdb.imdb_id) movie.id = tmdb.imdb_id;
	if (tmdb.overview) movie.plot = tmdb.overview;
	if (tmdb.popularity) movie.score = Math.round(tmdb.popularity * 10);
	if (tmdb.production_companies) movie.studios = tmdb.production_companies.map((company) => company.name);
	if (tmdb.production_countries) movie.countries = tmdb.production_countries.map((country) => country.name);
	/* if (tmdb.release_date) movie.release = {
		year: parseInt(tmdb.release_date.slice(0, 4)),
		date: new Date(tmdb.release_date),
	}; */
	if (tmdb.release_date) {
		movie.year = parseInt(tmdb.release_date.slice(0, 4));
		movie.date = new Date(tmdb.release_date);
	}
	if (tmdb.revenue) movie.revenue = tmdb.revenue;
	if (tmdb.budget) movie.budget = tmdb.budget;
	if (tmdb.runtime) movie.runtime = tmdb.runtime;
	if (tmdb.spoken_languages) movie.languages = tmdb.spoken_languages.map((language) => language.name).filter((language) => !(['No Language', '?????'].includes(language)));
	if (tmdb.tagline) movie.tagline = tmdb.tagline;
	if (tmdb.vote_average) movie.score = tmdb.vote_average * 10;
	if (tmdb.vote_count) movie.votes = tmdb.vote_count;
	if (tmdb.poster_path) movie.poster = 'https://image.tmdb.org/t/p/original/' + tmdb.poster_path;
	if (tmdb.backdrop_path) movie.fanart = 'https://image.tmdb.org/t/p/original/' + tmdb.backdrop_path;
	return movie;
}

module.exports = async function getTMDB(id) {
	if (!unavailable.exists('tmdb', id)) {
		const json = resolve('cache', 'json', 'themoviedb', `${id}.json`);
		if (!existsSync(json)) {
			console.log('Downloading TMDB info for', id);
			try {
				// details = await mdb.find.byExternalID({pathParameters: {external_id: id, external_source: 'imdb_id'}, query: {external_id: id, external_source: 'imdb_id'}});
				const overview = await v3Client.find.byId({external_id: id, external_source: 'imdb_id'});
				if (overview && overview.movie_results && overview.movie_results.length) {
					const details = await v3Client.movie.details(overview.movie_results[0].id);
					writeFileSync(json, JSON.stringify(details, null, '	'));
					return processTMDB(details);
				} else {
					unavailable.add('tmdb', id);
				}
			} catch(e) {
				console.log('TMDB scraping error for'.red, id);
				console.log(e);
			}
		} else {
			return processTMDB(JSON.parse(readFileSync(json, 'utf8')));
		}
	}
	return {};
};
