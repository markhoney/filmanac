<template>
	<Card
		:link="movie.path"
		:poster="movie.images && movie.images.poster && movie.images.poster.path"
		:title="movie.title"
		:subtitle="movie.year"
		:icons="[
			...movie.genres || [],
			...movie.studios || [],
			...movie.countries || [],
			...movie.languages || [],
		]"
	>
		<p class="text-xl text-base text-gray-100 leading-snug h-20 overflow-hidden">{{movie.plot}}</p>
		<Rated v-if="movie.rated" class="float-right" :to="movie.rated.path">{{movie.rated.title}}</Rated>
		<Rating class="mt-2" :percent="movie.score" :stars="5" />
		<!--<p class="mt-4 text-gray-100">- Directed by {{movie.director}}.</p>-->
	</Card>
</template>

<script>
	import Card from '@/components/generic/Card.vue';
	import Rating from './Score.vue';
	import Rated from './Rated.vue';
	export default {
		components: {Card, Rating, Rated},
		props: {
			movie: Object,
		},
	};
</script>
