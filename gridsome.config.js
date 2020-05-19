// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'A Movie for Today',
	// siteUrl: '',
	// siteDescription: '',
	siteUrl: 'https://markhoney.github.io',
	pathPrefix: '/amoviefortoday',
	plugins: [
		'~/src/data/gridsome-source-movies.js',
		'gridsome-plugin-tailwindcss',
	],
	templates: {
		Days: '/:month/:day',
		Movies: '/:id',
		Genres: '/genres/:id',
		Studios: '/studios/:id',
		Languages: '/languages/:id',
		Countries: '/countries/:id',
		Years: '/years/:id',
	},
};
