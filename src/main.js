import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import Fixed from '~/layouts/Fixed.vue';

// https://fonts.google.com/
require('typeface-bangers');
require('typeface-carter-one');
require('typeface-shojumaru');
require('typeface-bungee-shade');
require('typeface-creepster');
require('typeface-henny-penny');
require('typeface-alfa-slab-one');
require('typeface-audiowide');
require('typeface-monoton');
require('typeface-black-ops-one');
require('typeface-faster-one');
require('typeface-ewert');
require('typeface-fascinate-inline');
require('typeface-voltaire');

export default function (Vue, {head, appOptions}) {
	Vue.use(Vuex);
	Vue.component('Fixed', Fixed);
	Vue.use(AsyncComputed);
	head.htmlAttrs = {class: 'bg-grey-darkest'};
	// head.bodyAttrs = {class: 'bg-grey-darkest'};
	appOptions.store = new Vuex.Store({
		state: {
			dark: false,
			top: true,
			bottom: false,
			tiles: ['gold.jpg', 'overlook.jpg', 'peacock.jpg', 'maze.jpg', 'clouds.jpg', 'code.jpg', 'ice.jpg', 'zebra.jpg'], // https://katgregorowicz.com/The-Shining
			fonts: ['Bangers', 'Carter One', 'Shojumaru', 'Bungee Shade', 'Creepster', 'Henny Penny', 'Alfa Slab One', 'Audiowide', 'Monoton', 'Black Ops One', 'Faster One', 'Ewert', 'Fascinate Inline', 'Voltaire'],
		},
		mutations: {
			dark(state, dark) {
				state.dark = dark;
			},
			top(state, top) {
				state.top = top;
			},
			bottom(state, bottom) {
				state.bottom = bottom;
			},
		}
	});
	Vue.component('root', {
		functional: true,
		props: ['show'],
		render(h, ctx) {
			const children = ctx.children.filter(vnode => vnode.tag);
			return ctx.props.show ? children[0] : children[0].children;
		}
	});
}
