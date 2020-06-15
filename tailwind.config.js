module.exports = {
	purge: ['./src/**/*.vue'],
	theme: {
		extend: {
			screens: {
				'light': {raw: '(prefers-color-scheme: light)'},
			}
		},
	},
	variants: {},
	plugins: [],
};
