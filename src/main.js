import Fixed from '~/layouts/Fixed.vue';
import AsyncComputed from 'vue-async-computed';

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

export default function (Vue, {router}) {
	Vue.component('Fixed', Fixed);
	Vue.use(AsyncComputed);
}
