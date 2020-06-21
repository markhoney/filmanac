<template>
	<div class="flex shadow-lg mx-auto my-16 max-w-3xl bg-gray-600 bg-opacity-25 rounded-lg">
		<!--<g-link v-if="image" :to="link">
			<g-image class="h-full rounded-lg rounded-r-none" :src="image" :alt="title + ' poster'" />
		</g-link>-->
		<Poster :movie="event.movie" />
		<div class="w-3/4 px-4 py-4 rounded-lg flex flex-col">
			<h3 class="mb-2 font-bold text-2xl md:text-4xl text-gray-200">
				<g-link :to="event.movie.path">{{event.movie.title + (event.movie.year ? ' (' + event.movie.year + ')' : '')}}</g-link>
			</h3>
			<div class="flex-grow">
				<h4 class="text-lg md:text-xl mb-4">{{event.title && [event.month.title, event.day.id + event.day.ordinal, event.year && event.year.id, '-', event.title].join(' ')}}</h4>
				<div class="hidden sm:block">
					<p class="plot">{{event.movie.plot}}</p>
				</div>
			</div>
			<Icons :icons="icons" class="mt-6" />
		</div>
	</div>
</template>

<script>
	import Icons from '@/components/movie/categories/Icons.vue';
	import Poster from '@/components/movie/Poster.vue';
	export default {
		components: {Icons, Poster},
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
		@apply text-4xl text-base text-gray-100 leading-snug h-20 overflow-hidden pt-3;
		text-overflow: ellipsis;
	}
	.plot::after {
	  content: "...";
	}
</style>
