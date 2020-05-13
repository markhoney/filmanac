const MovieDates = require('imdb');

module.exports = class MovieSource {
	constructor(api, options) {
		this.options = options || {};
		this.countries = require('http://country.io/names.json');
		api.loadSource(async (actions) => {
			const dateCollection = actions.addCollection({
				typeName: this.options.type || 'Dates',
			});
			const movieCollection = actions.addCollection({
				typeName: this.options.type || 'Movies',
			});
			const movieDateCollection = actions.addCollection({
				typeName: this.options.type || 'MovieDates',
			});
			const movieDates = new MovieDates();
			await movieDates.get();
			for (const movie of movieDates.movies) movieCollection.addNode(movie);
			for (const movie of movieDates.movieDates) movieDateCollection.addNode({...movie, imdb: store.createReference('Movies', movie.imdb)});
		});
	}
};
