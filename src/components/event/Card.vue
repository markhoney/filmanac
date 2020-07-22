<template>
	<div class="flex shadow-xl bg-gray-100 dark:bg-gray-900 rounded-lg" style="background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.05));"><!-- mx-auto my-16 max-w-3xl -->
		<movie-poster :value="value.movie" class="relative" />
		<div class="w-3/4 pt-4 pl-6 pb-1 rounded-lg flex flex-col">
			<movie-title :value="value.movie" class="mb-4 font-bold text-2xl md:text-4xl leading-none" />
			<div class="flex-grow">
				<h4 v-if="value.title" class="text-lg md:text-xl leading-tight text-primary-dark dark:text-primary-lighter">
					<event-line :value="value" />
				</h4>
				<div class="hidden sm:block">
					<p class="plot">{{value.movie.plot}}</p>
				</div>
			</div>
			<movie-icons :value="value.movie" class="hidden sm:flex mt-2 mb-3 p-3 bg-gray-700 rounded-lg" />
		</div>
	</div>
</template>

<script>
	import MovieIcons from '@/components/movie/categories/Icons.vue';
	import MoviePoster from '@/components/movie/Poster.vue';
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLine from '@/components/event/Line.vue';
	export default {
		components: {MovieIcons, MoviePoster, MovieTitle, EventLine},
		props: ['value'],
	};
</script>

<style scoped lang="postcss">
	.plot {
		@apply text-4xl text-base leading-snug h-20 overflow-hidden pt-3 text-justify italic;
		/* text-overflow: ellipsis; */
	}
	/* .plot::after {
	  content: "...";
	} */
</style>
