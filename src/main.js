import Fixed from '~/layouts/Fixed.vue';
// import VueFlip from 'vue-flip';
import AsyncComputed from 'vue-async-computed';

require('typeface-bangers');
require('typeface-carter-one');
require('typeface-sail');
require('typeface-bungee-shade');
require('typeface-creepster');
require('typeface-henny-penny');
require('typeface-alfa-slab-one');
require('typeface-special-elite');
require('typeface-audiowide');
require('typeface-monoton');
require('typeface-racing-sans-one');
require('typeface-josefin-sans');
require('typeface-catamaran');

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
library.add(faGithub, faTwitter);

export default function (Vue, {router, head}) { // , {isClient}
	Vue.component('font-awesome', FontAwesomeIcon);
	Vue.component('Fixed', Fixed);
	// Vue.component('vue-flip', VueFlip);
	Vue.use(AsyncComputed);
	// head.bodyAttrs = {class: 'bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-900'};
}
