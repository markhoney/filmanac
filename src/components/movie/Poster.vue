<template>
	<g-link v-if="movie.images.poster" :to="movie.path">
		<g-image :src="movie.images.poster" :alt="movie.title + ' poster'" />
	</g-link>
	<!--<ClientOnly>
		<vue-flip active-hover class="h-full">
			<template v-slot:front>
				<g-image :src="movie.images.poster" :alt="movie.title + ' poster'" />
			</template>
			<template v-slot:back>
				<g-image :src="movie.images.keyart || movie.images.poster" :alt="movie.title + ' poster'" />
			</template>
		</vue-flip>
	</ClientOnly>-->
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {
			Score,
			Classification,
			VueFlip: () => import('vue-flip').then((m) => m.VueFlip),
		},
		props: {
			movie: Object,
		},
	};
</script>
