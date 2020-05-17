// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
	siteName: 'Filmanac',
	plugins: [
		'~/src/data/gridsome-source-movies.js',
		'gridsome-plugin-tailwindcss',
	],
	templates: {
		Day: '/:month/:day',
		Movie: '/movie/:id',
		Genre: '/genre/:id',
		Studio: '/studio/:id',
		Language: '/language/:id',
		Country: '/country/:id',
		Year: '/year/:id',
	},
};
