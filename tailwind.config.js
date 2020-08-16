const tinycolor = require("tinycolor2");

const step = 15;

function shades(colour) {
	return {
		darkest:  colour.clone().darken(step * 3).toHexString(),
		darker:   colour.clone().darken(step * 2).toHexString(),
		dark:     colour.clone().darken(step).toHexString(),
		default:  colour.toHexString(),
		light:    colour.clone().lighten(step).toHexString(),
		lighter:  colour.clone().lighten(step * 2).toHexString(),
		lightest: colour.clone().lighten(step * 3).toHexString(),
	};
}

function colours(colours) {
	const colors = {};
	for (const colour of Object.keys(colours)) {
		colors[colour] = shades(tinycolor(colours[colour]));
	}
	return colors;
}

function autoColours(hex) {
	const tetrad = tinycolor(hex).tetrad();
	const triad = tetrad[0].clone().triad();
	const split = tetrad[0].clone().splitcomplement();
	const grey = tetrad[0].clone().greyscale();
	return {
		primary: shades(tetrad[0]),
		secondary: shades(tetrad[1]),
		tertiary: shades(tetrad[2]),
		quaternary: shades(tetrad[3]),
		grey: shades(grey),
		second: shades(triad[1]),
		third: shades(triad[2]),
		left: shades(split[1]),
		right: shades(split[2]),
	};
}

module.exports = {
	purge: ['./src/**/*.vue'],
	theme: {
		extend: {
			// colors: autoColours('#D0262E'),
			colors: colours({
				primary: '#E03C31',
				secondary: '#ECBAA8',
				tertiary: '#71CC98',
				quaternary: '#963821',
				complementary: '#A65523',
				grey: '#888888',
			}),
			/* screens: {
				'light': {raw: '(prefers-color-scheme: light)'},
				'dark': {raw: '(prefers-color-scheme: dark)'},
			}, */
		},
	},
	variants: { // https://tailwindcss.com/docs/configuring-variants/#default-variants-reference
		// display: ['responsive', 'hover', 'group-hover'],
		// transitionProperty: ['responsive', 'hover', 'group-hover'],
		backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
		textColor: ['responsive', 'hover', 'focus', 'dark'],
		borderColor: ['responsive', 'hover', 'focus', 'dark'],
		borderRadius: ['responsive', 'hover'],
		opacity: ['responsive', 'hover', 'focus', 'dark'],
		// objectPosition: ['responsive', 'hover'],
		// position: ['responsive', 'hover'],
		width: ['responsive', 'hover', 'group-hover'],
	},
	plugins: [
		require('@danestves/tailwindcss-darkmode')(),
	],
};
