<template>
	<Card
		:link="'/' + movie.id"
		:poster="movie.images && movie.images.poster && movie.images.poster.path"
		:title="movie.title"
		:subtitle="movie.year"
		:icons="{genres: movie.genres, studios: movie.studios, countries: movie.countries, languages: movie.languages}"
	>
		<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{movie.plot}}</p>
		<Rated v-if="movie.rated" class="float-right">{{movie.rated.title}}</Rated>
		<Rating class="mt-2" :percent="movie.rating" :stars="5" />
		<!--<p class="mt-4 text-gray-100">- Directed by {{movie.director}}.</p>-->
	</Card>
</template>

<script>
	import Card from './Card.vue';
	import Rating from './Rating.vue';
	import Rated from './Rated.vue';
	export default {
		components: {Card, Rating, Rated},
		props: {
			movie: Object,
		},
	};
</script>

<style>
	.truncate-overflow {
		--max-lines: 3;
		position: relative;
		max-height: calc(1.375rem * 5);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	}
</style>
