<template>
	<Card
		:link="'/' + event.movie.id"
		:poster="event.movie.images && event.movie.images.poster && event.movie.images.poster.path"
		:title="event.movie.title"
		:subtitle="event.year"
		:icons="{genres: event.movie.genres, studios: event.movie.studios, countries: event.movie.countries, languages: event.movie.languages}"
	>
		<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{event.reason.description || event.title + " - " + event.reason.short}}</p>
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
