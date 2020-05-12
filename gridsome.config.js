// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const secrets = require('./secrets.json');

module.exports = {
	siteName: 'Gridsome',
	plugins: [
		{
			use: 'gridsome-source-google-sheets',
			options: {
				sheetId: secrets.Google.SheetID,
				apiKey: secrets.Google.APIKey,
				// type: 'TYPE_NAME', //Optional - default is googleSheet. Used for graphql queries.
			},
		},
	],
};
