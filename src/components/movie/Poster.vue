<template>
	<div class="relative text-gray-100 font-bold">
		<div :class="{absolute: movie.images && movie.images.poster, 'opacity-0': movie.images && movie.images.poster}" class="rounded-lg rounded-r-none hover:opacity-100 duration-500 ease-in-out transition-opacity flex flex-col bg-black bg-opacity-75 top-0 left-0 w-full h-full p-2 text-center justify-around">
			<div v-if="movie.score">
				Rating: {{movie.score.id}} %
			</div>
			<div v-if="movie.awards">
				Awards:
				{{movie.awards}}
			</div>
			<div v-if="movie.runtime">
				Length: {{movie.runtime}} mins
			</div>
		</div>
		<g-image v-if="movie.images && movie.images.poster" class="rounded-lg rounded-r-none" :src="movie.images.poster" :alt="movie.title + ' poster'" />
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {
			Score,
			Classification,
		},
		props: {
			movie: Object,
		},
	};
</script>
