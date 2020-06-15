import DefaultLayout from '~/layouts/Default.vue';
// import VueFlip from 'vue-flip';
import AsyncComputed from 'vue-async-computed';

export default function (Vue, {router, head}) { // , {head, isClient}
	Vue.component('Layout', DefaultLayout);
	// Vue.component('vue-flip', VueFlip);
	Vue.use(AsyncComputed);
	head.bodyAttrs = {class: 'bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-900'};
}
