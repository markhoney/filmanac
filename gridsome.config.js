// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const siteName = 'Movies for Today';

module.exports = {
	siteName,
	// siteUrl: '',
	// siteDescription: '',
	siteUrl: 'https://movies.honeychurch.org',
	plugins: [
		'~/src/data/gridsome-source-movies.js',
		'gridsome-plugin-tailwindcss',
		{
			use: 'gridsome-plugin-flexsearch',
			options: {
				collections: ['Movie', 'DayofYear', 'Year', 'Genres', 'Languages', 'Countries', 'Studios'].map((collection) => ({
					typeName: collection,
					indexName: collection,
					fields: ['title'],
				})),
				searchFields: ['title'],
			},
		},
		{
			use: 'gridsome-plugin-feed',
			options: {
				contentTypes: ['Movie', 'Event', 'DayofYear'],
				feedOptions: {
					title: siteName,
					// description: '',
				},
				nodeToFeedItem: (node) => ({
					title: node.title,
					// date: node.date || node.fields.date,
					content: node.description,
				})
			},
		},
		{
			use: '@gridsome/plugin-sitemap',
			options: {
				config: {
					'/**': {
						changefreq: 'monthly',
						priority: 0.5,
					},
					'/genres/**': {
						changefreq: 'monthly',
						priority: 0.7,
					},
				},
			},
		},
		{
			use: 'gridsome-plugin-pwa',
			options: {
				title: siteName,
				disableServiceWorker: true,
				shortName: siteName,
				cachedFileTypes: 'js,css',
				themeColor: '#e32929',
				backgroundColor: '#ffffff',
				icon: 'src/favicon.png',
			},
		},
	],
	templates: {
		Movie: '/:id',
		// // DayofYear: ['/:month/:day', '/:slugs__month/:day', , '/:slugs__month/:slugs__day', , '/:slugs__month/:slugs__shortday', , '/:slugs__shortmonth/:slugs__day', , '/:slugs__shortmonth/:slugs__shortday'],
		Genres: '/genres/:id',
		Studios: '/studios/:id',
		Languages: '/languages/:id',
		Countries: '/countries/:id',
		Directors: '/directors/:id',
		Writers: '/writers/:id',
		Actors: '/actors/:id',
		DayofYear: '/:month/:day',
		Month: '/month/:id',
		Year: '/year/:id',
		Classification: '/classification/:id',
	},
};
