<template>
	<div class="flex shadow-xl bg-gray-400 dark:bg-gray-900 rounded-lg"><!-- mx-auto my-16 max-w-3xl -->
		<Poster :movie="event.movie" class="rounded-lg rounded-r-none" />
		<div class="w-3/4 p-4 px-6 rounded-lg flex flex-col">
			<movie-title :movie="event.movie" class="mb-4 font-bold text-2xl md:text-4xl leading-none" />
			<!--<h3 class="mb-4 font-bold text-2xl md:text-4xl leading-none">
				<g-link :to="event.movie.path" :title="'See details for the movie ' + event.movie.title">{{event.movie.title}}</g-link>
				<g-link v-if="event.movie.year" class="hidden sm:inline font-semibold" :to="event.movie.year.path" :title="'See all movies released in ' + event.movie.year.id"> ({{event.movie.year.id}})</g-link>
			</h3>-->
			<div class="flex-grow">
				<h4 v-if="event.title" class="text-lg md:text-xl leading-tight text-primary-dark dark:text-primary-lighter">
					<event-line :event="event" />
				</h4>
				<div class="hidden sm:block">
					<p class="plot">{{event.movie.plot}}</p>
				</div>
			</div>
			<Icons :icons="icons" class="hidden sm:flex mt-2" />
		</div>
	</div>
</template>

<script>
	import Icons from '@/components/movie/categories/Icons.vue';
	import Poster from '@/components/movie/Poster.vue';
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLine from '@/components/event/Line.vue';
	export default {
		components: {Icons, Poster, MovieTitle, EventLine},
		props: ['event'],
		computed: {
			icons() {
				return [
					...this.event.movie.genres || [],
					...this.event.movie.studios || [],
					...this.event.movie.countries || [],
					...this.event.movie.languages || [],
				];
			},
		},
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
