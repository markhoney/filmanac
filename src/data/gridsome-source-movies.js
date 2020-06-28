const MovieEvents = require('./movieevents');

module.exports = class MovieSource {
	constructor(api) {
		api.loadSource(async ({addCollection}) => {
			const collections = {};
			const MovieCategories = ['Genres', 'Studios', 'Languages', 'Countries', 'Score', 'Classification', 'Directors', 'Writers', 'Actors'];
			const EventCategories = ['Movie', 'Day', 'Month', 'Year', 'DayofYear'];
			const DayofYearCategories = ['Day', 'Month'];
			for (const collection of [...MovieCategories, ...EventCategories, 'Event', 'Stats']) collections[collection] = addCollection({typeName: collection});
			for (const collection of MovieCategories) collections.Movie.addReference(collection.toLowerCase(), collection);
			for (const collection of EventCategories) collections.Event.addReference(collection.toLowerCase(), collection);
			for (const collection of DayofYearCategories) collections.DayofYear.addReference(collection.toLowerCase(), collection);
			collections.Languages.addReference('country', 'Countries');
			collections.DayofYear.addReference('previous', 'DayofYear');
			collections.DayofYear.addReference('next', 'DayofYear');
			const movieEvents = new MovieEvents();
			await movieEvents.get();
			for (const movie of movieEvents.movie) {
				movie.events = movieEvents.event.filter((event) => event.movie === movie.id).map((event) => event.id);
			}
			collections.Movie.addReference('events', 'Event');
			for (const event of movieEvents.event) {
				// event.dayofyear = movieEvents.dayofyear.find((dayofyear) => event.day === dayofyear.day && event.month === dayofyear.month).id;
				event.dayofyear = [event.month, event.day].join('-');
			}
			collections.Year.addReference('events', 'Event');
			for (const year of movieEvents.year) {
				year.events = movieEvents.event.filter((event) => event.year === year.id).map((event) => event.id);
			}
			collections.Event.addReference('dayofyear', 'DayofYear');
			for (const month of movieEvents.month) {
				month.days = movieEvents.dayofyear.filter((date) => date.month === month.id).map((date) => date.id);
			}
			collections.Month.addReference('days', 'DayofYear');
			for (const dayofyear of movieEvents.dayofyear) {
				dayofyear.events = movieEvents.event.filter((event) => event.dayofyear === dayofyear.id).map((event) => event.id);
			}
			collections.DayofYear.addReference('events', 'Event');
			for (const collection of MovieCategories) {
				const coll = collection.toLowerCase();
				for (const item of movieEvents[coll]) {
					item.movies = movieEvents.movie.filter((movie) => Array.isArray(movie[coll]) ? movie[coll].includes(item.id) : movie[coll] === item.id).map((movie) => movie.id);
				}
				collections[collection].addReference('movies', 'Movie');
			}
			for (const collection of Object.keys(collections)) for (const node of movieEvents[collection.toLowerCase()]) {
				collections[collection].addNode(node);
			}
		});
	}
};
