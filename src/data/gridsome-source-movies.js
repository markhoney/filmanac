const MovieDays = require('./moviedays');

module.exports = class MovieSource {
	constructor(api) {
		// this.countries = require('http://country.io/names.json');
		api.loadSource(async ({addCollection, addSchemaResolvers, store}) => {
			const dayCollection = addCollection({
				typeName: 'Day',
			});
			const movieCollection = addCollection({
				typeName: 'Movie',
			});
			const movieDayCollection = addCollection({
				typeName: 'MovieDay',
			});
			/* addSchemaResolvers({
				Movie: {
					date: (node) => node.year || node.year === 0 ? new Date(node.year, node.month - 1, node.day) : null,
					imdburl: (node) => `https://www.imdb.com/title/${node.imdb.id}/`,
					wikipediaurl: (node) => node.wikipedia ? `https://en.wikipedia.org/wiki/${node.wikipedia}` : null,
					wikidataurl: (node) => node.wikidata ? `https://www.wikidata.org/wiki/${node.wikidata}` : null,
				},
				Day: {
					wikipediaurl: (node) => node.wikipedia ? `https://en.wikipedia.org/wiki/${node.wikipedia}` : null,
				},
			}); */
			const movieDays = new MovieDays();
			await movieDays.get();
			for (const movie of movieDays.movies) movieCollection.addNode(movie);
			movieDayCollection.addReference('movie', 'Movie');
			for (const movieDay of movieDays.movieDays) movieDayCollection.addNode(movieDay);
			// for (const movieDay of movieDays.movieDays) movieDayCollection.addNode({...movieDay, imdb: store.createReference('Movie', movieDay.imdb)});
			// dayCollection.addReference('movies', 'MovieDay');
			for (const day of movieDays.days) dayCollection.addNode({...day, movies: store.createReference('MovieDay', day.movies)});
		});
	}
};
