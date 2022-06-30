const download = require('download-git-repo');

const extras = {
	genres: [
		'DjCisco/resource.images.moviegenreicons.transparent',
		'XBMC-Addons/resource.images.moviegenreicons.white',
		'XBMC-Addons/resource.images.moviegenreicons.filmstrip',
		'dproudmoore/resource.images.moviegenrefanart.metrocity',
		'Helly1206/resource.images.moviegenrefanart.xonfluence',
		'mistervee/resource.images.moviegenreicons.filmstrip-hd.colour',
		'mistervee/resource.images.moviegenreicons.filmstrip-hd.bw',
	],
	studios: [
		'XBMC-Addons/resource.images.studios.coloured',
		'XBMC-Addons/resource.images.studios.white',
		'braz96/resource.images.studios.squarehd',
	],
	classifications: [
		'wyrm65/resource.images.classificationicons.colour',
	],
	countries: [
		'djaiss/mapsicon',
		'braz96/resource.images.moviecountryicons.flags',
		'braz96/resource.images.moviecountryicons.maps',
	],
	languages: [
		'vdb86/resource.images.languageflags.completepack',
	 	'jeroenpardon/resource.images.languageflags.colour-flat',
	],
};

for (const extra of Object.values(extras)) {
	for (const repo of extra) {
		download(repo, 'git_modules/' + repo.split('/')[1], (e) => console.log(e));
	}
}
