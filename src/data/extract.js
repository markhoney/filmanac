require("dotenv").config();
require('colors');
// const ffmpeg = require('fluent-ffmpeg');
const extractFrames = require('ffmpeg-extract-frames');
const {existsSync} = require('fs');
const {resolve} = require('path');

function screenshot(event, movie) {
	if (process.env.MoviePath && event.time && event.time.length === 1) {
		const movieName = `${movie.title.replace(': ', ' - ').replace('…', '...').replace('AVP - ', '')} (${movie.year})`;
		const input = resolve(process.env.MoviePath, movieName, movieName + '.mkv');
		const output = resolve('cache', 'images', 'screenshot', `${event.id}.jpg`);
		if (!existsSync(output)) {
			if (existsSync(input)) {
				extractFrames({
					input,
					output,
					timestamps: event.time,
				});
				return output;
			} else {
				console.log('Movie file missing'.red, input);
			}
		} else {
			return output;
		}
	}
}

module.exports = {screenshot};
