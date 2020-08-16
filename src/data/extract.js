require("dotenv").config();
require('colors');
// const ffmpeg = require('fluent-ffmpeg');
const extractFrames = require('ffmpeg-extract-frames');
const {existsSync} = require('fs');
const {resolve} = require('path');

async function screenshot(event, movie) {
	if (event.screenshot) {
		if (process.env.MoviePath && existsSync(process.env.MoviePath)) {
			const movieName = `${movie.title.replace(/\//g, '-').replace(': ', ' - ').replace('…', '...').replace('AVP - ', '')} (${movie.year})`;
			const input = resolve(process.env.MoviePath, movieName, movieName + '.mkv');
			const output = resolve('cache', 'images', 'screenshot', `${event.id}.jpg`);
			if (!existsSync(output)) {
				if (existsSync(input)) {
					console.log('Extracting screenshot for', movieName);
					const result = await extractFrames({
						input,
						output,
						timestamps: [event.screenshot.time],
					});
					if (result) return output;
					console.log('Screenshot failed'.red);
				} else {
					console.log('Movie file missing'.red, input);
				}
			} else {
				return output;
			}
		} else {
			console.log('Missing MoviePath'.red);
		}
	}
}

module.exports = {screenshot};
