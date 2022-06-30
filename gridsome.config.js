const siteName = 'Today in Movies';

const search = {
	Movies: 'Movie',
	DaysOfYear: 'Day of Year',
	Years: 'Event Year',
	Genres: 'Genre',
	Languages: 'Language',
	Countries: 'Country',
	Studios: 'Studio',
	Months: 'Event Month',
	ReleaseYears: 'Movie Release Year',
};

module.exports = {
	siteName,
	// siteUrl: '',
	// siteDescription: '',
	siteUrl: 'https://movies.honeychurch.org',
	plugins: [
		'~/src/data/gridsome-source-movies.js',
		'gridsome-plugin-tailwindcss',
		'gridsome-plugin-nprogress',
		{
			use: 'gridsome-plugin-flexsearch',
			options: {
				collections: Object.keys(search).map((collection) => ({
					typeName: collection,
					indexName: search[collection],
					fields: ['title'],
				})),
				searchFields: ['title'],
			},
		},
		{
			use: 'gridsome-plugin-feed',
			options: {
				contentTypes: ['Movies', 'Events', 'DaysOfYear'],
				feedOptions: {
					title: siteName,
					// description: '',
				},
				nodeToFeedItem: (node) => ({
					title: node.title,
					// date: node.date || node.fields.date,
					content: node.description,
				}),
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
				serviceWorkerPath: '',
				shortName: siteName,
				cachedFileTypes: 'js,css',
				themeColor: '#e32929',
				backgroundColor: '#ffffff',
				icon: 'src/favicon.png',
			},
		},
	],
	templates: {
		Months: '/:id',
		DaysOfYear: '/:month/:day',
		Movies: '/movie/:id',
		// // DayofYear: ['/:month/:day', '/:slugs__month/:day', , '/:slugs__month/:slugs__day', , '/:slugs__month/:slugs__shortday', , '/:slugs__shortmonth/:slugs__day', , '/:slugs__shortmonth/:slugs__shortday'],
		Genres: '/genres/:id',
		Studios: '/studios/:id',
		Languages: '/languages/:id',
		Countries: '/countries/:id',
		Directors: '/directors/:id',
		Writers: '/writers/:id',
		Actors: '/actors/:id',
		Years: '/years/:id',
		ReleaseYears: '/released/:id',
		Classifications: '/classifications/:id',
	},
};
