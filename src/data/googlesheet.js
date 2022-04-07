require('dotenv').config();
const {google} = require('googleapis');

module.exports = async function getSheet(name) {
	if (!this.sheets) {
		this.sheets = google.sheets({
			version: 'v4',
			auth: process.env.GoogleAPIKey,
		});
	}
	const sheet = await this.sheets.spreadsheets.values.get({
		spreadsheetId: process.env.GoogleSheetID,
		range: name + '!A1:ZZ10000',
	});
	const titles = sheet.data.values.shift();
	return sheet.data.values.map((row) => titles.reduce((rows, title, index) => {
		return {...rows, [title.toLowerCase()]: row[index]};
	}, {}));
};
