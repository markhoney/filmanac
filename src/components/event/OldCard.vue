<template>
	<card
		v-if="value.movie"
		:link="value.movie.path"
		:image="value.movie.images && value.movie.images.poster"
		:title="value.movie.title + (value.movie.year ? ' (' + value.movie.year.id + ')' : '')"
		:subtitle="value.title && [value.month.title, value.day.id + value.day.ordinal, value.year && value.year.id, '-', value.title].join(' ')"
		:icons="[
			...value.movie.genres,
			...value.movie.studios,
			...value.movie.countries,
			...value.movie.languages,
		]"
	>
		<p class="plot">{{value.movie.plot}}</p>
	</card>
</template>

<script>
	import Card from '@/components/generic/Card.vue';
	export default {
		components: {Card},
		props: ['value'],
	};
</script>

<style scoped lang="postcss">
	.plot {
		@apply text-4xl text-base text-grey-lightest leading-snug h-16 overflow-hidden;
		text-overflow: ellipsis;
	}
</style>
