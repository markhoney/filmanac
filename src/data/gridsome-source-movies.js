const MovieEvents = require('./movieevents');

module.exports = class MovieSource {
	constructor(api) {
		api.loadSource(async ({addCollection}) => {
			const collections = {};
			const MovieCategories = ['Genres', 'Studios', 'Languages', 'Countries', 'Rated'];
			const EventCategories = ['Movie', 'Day', 'Month', 'Year', 'DayofYear'];
			const DayofYearCategories = ['Day', 'Month'];
			const LanguageCategories = ['Countries'];
			for (const collection of [...EventCategories, ...MovieCategories, 'Event', 'Stats']) collections[collection] = addCollection({typeName: collection});
			for (const collection of MovieCategories) collections.Movie.addReference(collection.toLowerCase(), collection);
			for (const collection of EventCategories) collections.Event.addReference(collection.toLowerCase(), collection);
			for (const collection of DayofYearCategories) collections.DayofYear.addReference(collection.toLowerCase(), collection);
			// for (const collection of LanguageCategories) collections.Languages.addReference(collection.toLowerCase(), collection);
			collections.Languages.addReference('country', 'Countries');
			const movieEvents = new MovieEvents();
			await movieEvents.get();
			for (const collection of Object.keys(collections)) for (const node of movieEvents[collection.toLowerCase()]) {
				collections[collection].addNode(node);
			}
		});
	}
};
