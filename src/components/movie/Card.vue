<template>
	<Card
		:link="value.path"
		:image="value.images && value.images.poster"
		:title="value.title"
		:subtitle="value.year && value.year.id"
		:icons="[
			...value.genres || [],
			...value.studios || [],
			...value.countries || [],
			...value.languages || [],
		]"
	>
		<p class="text-xl text-gray-100 leading-snug h-20 overflow-hidden">{{value.plot}}</p>
		<classification v-if="value.classification" class="float-right" :value="value.classification" />
		<score v-if="value.score" class="mt-2" :percent="value.score.id" :stars="5" />
		<!--<p class="mt-4 text-gray-100">- Directed by {{value.director}}.</p>-->
	</Card>
</template>

<script>
	import Card from '@/components/generic/Card.vue';
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {Card, Score, Classification},
		props: ['value'],
	};
</script>
