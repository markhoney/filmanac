const MovieEvents = require('./movieevents');

module.exports = class MovieSource {
	constructor(api) {
		// this.countries = require('http://country.io/names.json');
		api.loadSource(async ({addCollection, addSchemaResolvers, store}) => {
			const collections = {};
			for (const collection of ['Days', 'Movies', 'Events', 'Genres', 'Studios', 'Languages', 'Countries', 'Years']) collections[collection] = addCollection({typeName: collection});
			for (const collection of ['Genres', 'Studios', 'Languages', 'Countries']) collections.Movies.addReference(collection.toLowerCase(), collection);
			collections.Days.addReference('events', 'Events');
			collections.Events.addReference('movie', 'Movies');
			const movieEvents = new MovieEvents();
			await movieEvents.get();
			for (const collection of Object.keys(collections)) for (const node of movieEvents[collection.toLowerCase()]) {
				collections[collection].addNode(node);
			}
		});
	}
};
