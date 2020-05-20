<template>
	<Card
		:link="'/' + event.movie.id"
		:poster="event.movie.images && event.movie.images.poster && event.movie.images.poster.path"
		:title="event.movie.title"
		:subtitle="event.year"
		:icons="{genres: event.movie.genres, studios: event.movie.studios, countries: event.movie.countries, languages: event.movie.languages}"
	>
		<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{event.reason.description}}</p>
	</Card>
</template>

<script>
	import Card from './Card.vue';
	export default {
		components: {Card},
		props: {
			event: Object,
		},
	};
</script>

<style>
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
