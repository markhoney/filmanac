<template>
	<Card
		:link="movie.path"
		:image="movie.images && movie.images.poster"
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
		<classification v-if="movie.classification" class="float-right" :to="movie.classification.path">{{movie.classification.title}}</classification>
		<score v-if="movie.score" class="mt-2" :percent="movie.score.id" :stars="5" />
		<!--<p class="mt-4 text-gray-100">- Directed by {{movie.director}}.</p>-->
	</Card>
</template>

<script>
	import Card from '@/components/generic/Card.vue';
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {Card, Score, Classification},
		props: {
			movie: Object,
		},
	};
</script>
