<template>
	<div
		class="flex shadow-xl bg-grey-lightest dark:bg-grey-darkest rounded-lg"
		style="background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.05));"
	>
		<movie-poster :value="value.movie" rounded class="relative" />
		<div class="w-3/4 pt-4 pl-6 pr-4 pb-1 rounded-lg flex flex-col">
			<movie-title :value="value.movie" class="mb-4 font-bold text-2xl md:text-4xl leading-none" />
			<div class="flex-grow">
				<h4 v-if="value.title" class="text-lg md:text-xl leading-tight text-primary-dark dark:text-primary-light">
					<event-line :value="value" />
				</h4>
				<div class="hidden sm:block">
					<p class="plot">{{value.movie.plot}}</p>
				</div>
			</div>
			<div classs="flex justify-around">
				<!--<movie-icons :value="value.movie" class="bg-grey-darker m-2 mb-4 p-2 pt-3 rounded-full float-right hidden sm:inline-flex" />-->
				<movie-icons :value="value.movie" class="m-2 mb-4 p-2 pt-3 float-right hidden sm:inline-flex" />
			</div>
		</div>
	</div>
</template>

<script>
	import MovieIcons from '@/components/movie/Icons.vue';
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
		@apply text-base leading-snug h-20 overflow-hidden pt-3 text-justify italic;
		/* text-overflow: ellipsis; */
	}
	/* .plot::after {
	  content: "...";
	} */
</style>
