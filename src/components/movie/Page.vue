<template>
	<div>
		<section class="h-64">
			<g-image v-if="movie.images && movie.images.fanart" :src="movie.images.fanart" class="absolute z-0 h-64 w-full object-cover object-top" style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2vw), 0 100%)" />
			<div class="flex w-full h-full p-2">
				<div v-if="movie.images && movie.images.poster" class="pr-48 ml-8 mt-16 hidden sm:inline height-1">
					<g-image class="absolute shadow-lg border-4 border-white w-48 z-0" :src="movie.images.poster" />
				</div>
				<div class="flex-auto md:ml-8 z-10">
					<h1 class="font-bold text-4xl md:text-6xl tracking-loose leading-tight md:mt-16 z-10" style="text-shadow: 2px 2px #111;">{{movie.title}} ({{movie.year}})</h1>
					<score v-if="movie.score" class="mt-2" :percent="movie.score.id" :stars="5" :numeric="true" />
				</div>
				<div class="z-10">
					<classification v-if="movie.classification" class="float-right md:mr-16 mt-16">{{movie.classification.title}}</classification>
				</div>
			</div>
		</section>
		<section class="mt-8 ml-8 sm:ml-64 mr-8 max-w-screen-lg pa-16 text-xl">
			<p>{{movie.plot}}</p>
			<h3 class="mt-8 text-3xl">Events</h3>
			<ul>
				<li v-for="event in movie.events" :key="event.id"><g-link :to="event.dayofyear.path">{{event.month.title}} {{event.day.id}}{{event.day.ordinal}}</g-link> {{event.year && event.year.id}} - {{event.title}}</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	import Icons from './categories/Icons.vue';

	export default {
		components: {Icons, Score, Classification},
		props: ['movie'],
	}
</script>
