// const ffmpeg = require('fluent-ffmpeg');
const extractFrames = require('ffmpeg-extract-frames');

function screenshot(event, movie) {
	if (process.env.MoviePath && event.time && event.time.length === 1) {
		const movieName = `${movie.title.replace(': ', ' - ')} (${movie.year})`;
		const input = resolve(process.env.MoviePath, movieName, movieName + '.mkv');
		const output = resolve('cache', 'images', 'screenshot', `${event.id}.jpg`);
		if (existsSync(input)) {
			if (!existsSync(output)) return extractFrames({
				input,
				output,
				timestamps: event.time,
			});
		} else {
			console.log('Movie file missing'.red, input);
		}
	}
}

module.exports = {screenshot};
