const MovieEvents = require('./movieevents');

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
			const eventCollection = addCollection({
				typeName: 'Event',
			});
			const genreCollection = addCollection({
				typeName: 'Genre',
			});
			const studioCollection = addCollection({
				typeName: 'Studio',
			});
			const languageCollection = addCollection({
				typeName: 'Language',
			});
			const countryCollection = addCollection({
				typeName: 'Country',
			});
			const yearCollection = addCollection({
				typeName: 'Year',
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
			movieCollection.addReference('genres', 'Genre');
			movieCollection.addReference('studios', 'Studio');
			movieCollection.addReference('languages', 'Language');
			movieCollection.addReference('countries', 'Country');
			dayCollection.addReference('events', 'Event');
			eventCollection.addReference('movie', 'Movie');
			const movieEvents = new MovieEvents();
			await movieEvents.get();
			for (const genre    of movieEvents.genres)    genreCollection.addNode(genre);
			for (const studio   of movieEvents.studios)   studioCollection.addNode(studio);
			for (const language of movieEvents.languages) languageCollection.addNode(language);
			for (const country  of movieEvents.countries) countryCollection.addNode(country);
			for (const movie    of movieEvents.movies)    movieCollection.addNode(movie);
			for (const event    of movieEvents.events)    eventCollection.addNode(event);
			for (const day      of movieEvents.days)      dayCollection.addNode(day);
			/* for (const movie of movieEvents.movies) movieCollection.addNode({
				...movie,
				genres: store.createReference('Genre', movie.genres),
				studios: store.createReference('Studio', movie.studios),
				languages: store.createReference('Language', movie.languages),
				countries: store.createReference('Country', movie.countries),
			}); */
			// for (const event of events.events) eventCollection.addNode({...event, imdb: store.createReference('Movie', event.imdb)});
			// dayCollection.addReference('movies', 'Event');
			// for (const day of movieEvents.days) dayCollection.addNode({...day, events: store.createReference('Event', day.events)});
			// for (const genre of movieEvents.genres) genreCollection.addNode({...genre, movies: store.createReference('Movie', genre.movies)});
			// for (const studio of movieEvents.studios) studioCollection.addNode({...studio, movies: store.createReference('Movie', studio.movies)});
			// for (const language of movieEvents.languages) languageCollection.addNode({...language, movies: store.createReference('Movie', language.movies)});
			// for (const country of movieEvents.countries) countryCollection.addNode({...country, movies: store.createReference('Movie', country.movies)});
			// for (const year of movieEvents.years) yearCollection.addNode({...year, movies: store.createReference('Movie', year.movies)});
		});
	}
};
