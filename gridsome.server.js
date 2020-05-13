// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
		api.loadSource(({addSchemaResolvers, addCollection}) => {
			/* addSchemaResolvers({
				googleSheet: {
					date: {
						type: 'Date',
						resolve: (node) => new Date(node.Year, node.Month - 1, node.Day),
					},
					IMDBURL: {
						type: 'String',
						resolve: (node) => `https://www.imdb.com/title/${node.IMDB}/`,
					},
					MovieWikipediaURL: {
						type: 'String',
						resolve: (node) => node.MovieWikipedia ? `https://en.wikipedia.org/wiki/${node.MovieWikipedia}` : null,
					},
					ReasonWikipediaURL: {
						type: 'String',
						resolve: (node) => node.ReasonWikipedia ? `https://en.wikipedia.org/wiki/${node.ReasonWikipedia}` : null,
					},
				},
			}); */
	});

	api.createPages(({createPage}) => {
		// Use the Pages API here: https://gridsome.org/docs/pages-api/
	});
};
