const MovieEvents = require('./movieevents');

const plurals = {
	'Country': 'Countries',
	'DayOfYear': 'DaysOfYear',
};

function getPlural(name) {
	if (name.endsWith('s')) return name;
	if (plurals[name]) return plurals[name];
	return name + 's';
}
module.exports = class MovieSource {
	constructor(api) {
		api.loadSource(async ({addCollection}) => {
			const collections = {};
			const MovieCategories = ['Genres', 'Studios', 'Languages', 'Countries', 'Score', 'Classification', 'Directors', 'Writers', 'Actors', 'ReleaseYear'];
			const EventCategories = ['Movie', 'Year', 'DayOfYear'];
			const DayOfYearCategories = ['Day', 'Month'];
			for (const collection of [...MovieCategories, ...EventCategories, ...DayOfYearCategories, 'Events', 'Stats']) collections[getPlural(collection)] = addCollection({typeName: getPlural(collection)});
			for (const collection of MovieCategories) collections.Movies.addReference(collection.toLowerCase(), getPlural(collection));
			for (const collection of EventCategories) collections.Events.addReference(collection.toLowerCase(), getPlural(collection));
			for (const collection of DayOfYearCategories) collections.DaysOfYear.addReference(collection.toLowerCase(), getPlural(collection));
			collections.Languages.addReference('country', 'Countries');
			collections.DaysOfYear.addReference('previous', 'DaysOfYear');
			collections.DaysOfYear.addReference('next', 'DaysOfYear');
			const movieEvents = new MovieEvents();
			await movieEvents.get();
			for (const movie of movieEvents.movies) {
				movie.events = movieEvents.events.filter((event) => event.movie === movie.id).map((event) => event.id);
			}
			collections.Movies.addReference('events', 'Events');
			for (const event of movieEvents.events) {
				// event.dayofyear = movieEvents.dayofyear.find((dayofyear) => event.day === dayofyear.day && event.month === dayofyear.month).id;
				event.dayofyear = [event.month, event.day].join('-');
			}
			collections.Years.addReference('events', 'Events');
			for (const year of movieEvents.years) {
				year.events = movieEvents.events.filter((event) => event.year === year.id).map((event) => event.id);
			}
			collections.Events.addReference('dayofyear', 'DaysOfYear');
			for (const month of movieEvents.months) {
				month.daysofyear = movieEvents.daysofyear.filter((dayofyear) => dayofyear.month === month.id).map((dayofyear) => dayofyear.id);
			}
			collections.Months.addReference('daysofyear', 'DaysOfYear');
			// collections.Months.addReference('days', 'Days');
			for (const dayofyear of movieEvents.daysofyear) {
				dayofyear.events = movieEvents.events.filter((event) => event.dayofyear === dayofyear.id).map((event) => event.id);
			}
			collections.DaysOfYear.addReference('events', 'Events');
			for (const collection of MovieCategories) {
				const coll = getPlural(collection).toLowerCase();
				for (const item of movieEvents[coll]) {
					item.movies = movieEvents.movies.filter((movie) => Array.isArray(movie[coll]) ? movie[coll].includes(item.id) : movie[coll] === item.id).map((movie) => movie.id);
				}
				collections[getPlural(collection)].addReference('movies', 'Movies');
			}
			for (const collection of Object.keys(collections)) for (const node of movieEvents[collection.toLowerCase()]) {
				collections[collection].addNode(node);
			}
		});
	}
};
