<template>
	<div class="flex shadow-xl bg-gray-400 bg-opacity-75 dark:bg-gray-700 rounded-lg"><!-- mx-auto my-16 max-w-3xl -->
		<!--<g-link v-if="event.movie.images && event.movie.images.poster" :to="event.movie.path">
			<g-image class="h-full rounded-lg rounded-r-none" :src="event.movie.images.poster" :alt="event.movie.title + ' poster'" />
		</g-link>-->
		<Poster :movie="event.movie" class="rounded-lg rounded-r-none" />
		<div class="w-3/4 p-4 px-6 rounded-lg flex flex-col">
			<h3 class="mb-4 font-bold text-2xl md:text-4xl leading-none">
				<g-link :to="event.movie.path">{{event.movie.title}}<span class="hidden sm:inline"> {{event.movie.year && ` (${event.movie.year})`}}</span></g-link>
			</h3>
			<div class="flex-grow">
				<h4 v-if="event.title" class="text-lg md:text-xl leading-tight text-orange-600 dark:text-orange-500">
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
	import EventLine from '@/components/event/Line.vue';
	export default {
		components: {Icons, Poster, EventLine},
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
