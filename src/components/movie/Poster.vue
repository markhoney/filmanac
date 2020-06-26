<template>
	<div class="relative">
		<div class="rounded-lg rounded-r-none absolute opacity-0 hover:opacity-100 transition duration-1000 ease-in-out transition-opacity flex flex-col bg-black bg-opacity-75 top-0 left-0 w-full h-full p-2 text-center justify-around">
			<div>
				Score: {{movie.score.id}} %
			</div>
			<div v-if="movie.awards">
				Awards:
				{{movie.awards}}
			</div>
			<div>
				Length: {{movie.runtime}} mins
			</div>
		</div>
		<g-image class="rounded-lg rounded-r-none" :src="movie.images.poster" :alt="movie.title + ' poster'" />
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {
			Score,
			Classification,
			// VueFlip: () => import('vue-flip').then((m) => m.VueFlip),
		},
		props: {
			movie: Object,
		},
	};
</script>
