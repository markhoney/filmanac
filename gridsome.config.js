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
				collections: [
					{
						typeName: 'Movie',
						indexName: 'Movie',
						fields: ['name'],
					},
					{
						typeName: 'DayofYear',
						indexName: 'DayofYear',
						fields: ['md'],
					},
					{
						typeName: 'Year',
						indexName: 'Year',
						fields: ['name'],
					},
					{
						typeName: 'Genres',
						indexName: 'Genres',
						fields: ['name'],
					},
					{
						typeName: 'Languages',
						indexName: 'Languages',
						fields: ['name'],
					},
					{
						typeName: 'Countries',
						indexName: 'Countries',
						fields: ['name'],
					},
					{
						typeName: 'Studios',
						indexName: 'Studios',
						fields: ['name'],
					},
				],
				searchFields: ['name'],
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
				disableServiceWorker: false,
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
		DayofYear: '/:month/:day',
		// DayofYear: ['/:month/:day', '/:slugs__month/:day', , '/:slugs__month/:slugs__day', , '/:slugs__month/:slugs__shortday', , '/:slugs__shortmonth/:slugs__day', , '/:slugs__shortmonth/:slugs__shortday'],
		Genres: '/genres/:id',
		Studios: '/studios/:id',
		Languages: '/languages/:id',
		Countries: '/countries/:id',
		Directors: '/directors/:id',
		Writers: '/writers/:id',
		Actors: '/actors/:id',
		Month: '/month/:id',
		Year: '/year/:id',
		Rated: '/rated/:id',
	},
};
