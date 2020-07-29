import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import Fixed from '~/layouts/Fixed.vue';

// require('typeface-bangers');
// require('typeface-carter-one');
// require('typeface-sail');
// require('typeface-bungee-shade');
// require('typeface-creepster');
// require('typeface-henny-penny');
// require('typeface-alfa-slab-one');
// require('typeface-special-elite');
// require('typeface-audiowide');
// require('typeface-monoton');
require('typeface-racing-sans-one');
// require('typeface-josefin-sans');
// require('typeface-catamaran');

export default function (Vue, {head, appOptions}) {
	Vue.use(Vuex);
	Vue.component('Fixed', Fixed);
	Vue.use(AsyncComputed);
	head.htmlAttrs = {class: 'bg-gray-800'};
	// head.bodyAttrs = {class: 'bg-gray-800'};
	appOptions.store = new Vuex.Store({
		state: {
			dark: false,
		},
		mutations: {
			dark(state, dark) {
				state.dark = dark;
			}
		}
	});
}
