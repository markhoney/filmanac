// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import AsyncComputed from 'vue-async-computed';

// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

export default function (Vue, {router}) { // , {head, isClient}
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout);
	Vue.use(AsyncComputed);
	/* Vue.use(Loading);
	let loader;

	router.beforeEach((to, from, next) => {
		loader = Vue.$loading.show();
		next();
	});

	router.afterEach((to, from) => {
		loader.hide();
	}); */
}
