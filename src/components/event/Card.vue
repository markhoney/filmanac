<template>
	<Card
		v-if="event.movie"
		:link="event.movie.path"
		:poster="event.movie.images && event.movie.images.poster && event.movie.images.poster.image"
		:title="event.movie.title + (event.movie.year ? ' (' + event.movie.year + ')' : '')"
		:subtitle="[event.month.title, event.day.id + event.day.ordinal, event.year && event.year.id, '-', event.title].join(' ')"
		:icons="[
			...event.movie.genres,
			...event.movie.studios,
			...event.movie.countries,
			...event.movie.languages,
		]"
	>
		<p class="plot">{{event.movie.plot}}</p>
	</Card>
</template>

<script>
	import Card from '@/components/generic/Card.vue';
	export default {
		components: {Card},
		props: ['event'],
	};
</script>

<style scoped lang="postcss">
	.plot {
		@apply text-4xl text-base text-gray-100 leading-snug h-16 overflow-hidden;
		text-overflow: ellipsis;
	}
</style>
