<template>
	<div>
		<g-image
			v-if="value.images && value.images.fanart"
			:src="value.images.fanart" class="absolute z-0 w-full object-cover object-top"
			style="height: 20rem; filter: saturate(0.3) brightness(0.7); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)"
		/>
		<div class="flex w-full h-full p-2 pt-16">
			<div v-if="value.images && value.images.poster" class="pr-48 ml-8 hidden sm:inline height-1">
				<movie-poster :value="value" class="absolute shadow-lg border-4 border-white w-48 z-0" />
			</div>
			<div class="flex-auto md:ml-16 z-10">
				<div class="h-56">
					<movie-title :value="value" class="font-bold text-4xl md:text-6xl tracking-loose leading-tight z-10" style="text-shadow: 2px 2px #111;" />
					<score v-if="value.score" class="mt-2" :percent="value.score.number" :stars="5" :numeric="true" />
				</div>
				<div class="mt-4 mr-8 max-w-screen-lg p-8 text-xl">
					<p>{{value.plot}}</p>
					<p v-if="value.directors" class="mt-4"><b>Directed by</b> {{value.directors.map((director) => director.title).join(', ')}}</p>
					<p v-if="value.actors" class="mt-4"><b>Starring</b> {{value.actors.map((actor) => actor.title).join(', ')}}</p>
					<h3 class="mt-8 text-3xl">Events</h3>
					<ul class="ml-8">
						<li v-for="event in value.events" :key="event.id"><event-line :value="event" /></li>
					</ul>
				</div>
			</div>
			<div class="z-10">
				<classification v-if="value.classification" class="float-right md:mr-16" :value="value.classification" />
			</div>
		</div>
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	import MoviePoster from '@/components/movie/Poster.vue';
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLine from '@/components/event/Line.vue';
	import Icons from './Icons.vue';

	export default {
		components: {Icons, Score, MoviePoster, Classification, MovieTitle, EventLine},
		props: ['value'],
	}
</script>
