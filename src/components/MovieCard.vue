<template>
	<Card
		:link="'/' + movie.id"
		:poster="movie.images && movie.images.poster && movie.images.poster.path"
		:title="movie.title"
		:subtitle="movie.year"
		:icons="{genres: movie.genres, studios: movie.studios, countries: movie.countries, languages: movie.languages}"
	>
		<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{movie.plot}}</p>
		<Rating />
		<p class="mt-4 text-gray-100">- Directed by {{movie.director}}.</p>
	</Card>
</template>

<script>
	import Card from './Card.vue';
	import Rating from './Rating.vue';
	export default {
		components: {Card, Rating},
		props: {
			movie: Object,
		},
	};
</script>

<style>
	/* body {
		background: #111;
		width: 100%;
		margin: 64px auto;
		font-size: 16px;
		color: #ccc;
	} */

	.icon {
		max-height: 32px;
		width: auto;
		/* margin: 8px; */
	}
	.flex--movie {
		max-width: 80%;
		margin: 0 auto;
	}

	.bg-color-333 {
		background-color: #333;
	}

	.movie--year {
		font-variant-numeric: ordinal;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.07em;
		font-family: monospace;
	}

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
