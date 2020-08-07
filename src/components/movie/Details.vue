<template>
	<div class="flex my-16">
		<movie-poster :value="value" class="w-32" />
		<div class="ml-8 flex-grow flex flex-col">
			<movie-title :value="value" class="font-bold text-4xl tracking-loose leading-none" />
			<event-lines :value="value.events" class="flex-grow text-xl list-disc mt-4 mb-8 ml-16" />
			<movie-icons :value="value" class="ml-8" />
		</div>
	</div>
</template>

<script>
	import MoviePoster from '@/components/movie/Poster.vue';
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLines from '@/components/event/Lines.vue';
	import MovieIcons from '@/components/movie/Icons.vue';
	export default {
		components: {MoviePoster, MovieTitle, EventLines, MovieIcons},
		props: ['value'],
	}
</script>

<style>

</style>
