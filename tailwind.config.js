module.exports = {
	purge: ['./src/**/*.vue'],
	theme: { // https://www.transparenttextures.com/
		extend: {
			colors: { // https://paletton.com/#uid=72Q0u0kFccSvg88DJ9VBOjtEyqu
				primary: {
					darker: '#660300',
					dark: '#410302',
					default: '#4F0200',
					light: '#9B0400',
					lighter: '#D30500',
				},
				secondary: {
					darker: '#003B3E',
					dark: '#012527',
					default: '#002E30',
					light: '#005A5E',
					lighter: '#017A80',
				},
				tertiary: {
					darker: '#662F00',
					dark: '#411F02',
					default: '#4F2400',
					light: '#9B4800',
					lighter: '#9B4800',
				},
				complementary: {
					darker: '#005105',
					dark: '#013304',
					default: '#003E04',
					light: '#007A08',
					lighter: '#00A60B',
				},
			},
			/* screens: {
				'light': {raw: '(prefers-color-scheme: light)'},
				'dark': {raw: '(prefers-color-scheme: dark)'},
			}, */
		},
	},
	variants: {
		display: ['responsive', 'hover', 'group-hover'],
		transitionProperty: ['responsive', 'hover', 'group-hover'],
		backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
		textColor: ['responsive', 'hover', 'focus', 'dark'],
		borderColor: ['responsive', 'hover', 'focus', 'dark'],
	},
	plugins: [
		require('@danestves/tailwindcss-darkmode')(),
	],
};
