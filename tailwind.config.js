module.exports = {
	purge: ['./src/**/*.vue'],
	/* theme: {
		extend: {
			screens: {
				'light': {raw: '(prefers-color-scheme: light)'},
				'dark':  {raw: '(prefers-color-scheme: dark)'},
			}
		},
	}, */
	variants: {
		display: ['responsive', 'hover', 'group-hover'],
		transitionProperty: ['responsive', 'hover', 'group-hover'],
		backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
		textColor: ['responsive', 'hover', 'focus', 'dark'],
	},
	plugins: [
		require('@danestves/tailwindcss-darkmode')(),
	],
};
