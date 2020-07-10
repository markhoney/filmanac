<template>
	<div>
		<section>
			<g-image
				v-if="movie.images && movie.images.fanart"
				:src="movie.images.fanart" class="absolute z-0 w-full object-cover object-top"
				style="height: 20rem; filter: saturate(0.3) brightness(0.7); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)"
			/>
			<div class="flex w-full h-full p-2 pt-16">
				<div v-if="movie.images && movie.images.poster" class="pr-48 ml-8 hidden sm:inline height-1">
					<g-image class="absolute shadow-lg border-4 border-white w-48 z-0" :src="movie.images.poster" />
				</div>
				<div class="flex-auto md:ml-16 z-10">
					<div class="h-56">
						<h1
							class="font-bold text-4xl md:text-6xl tracking-loose leading-tight z-10"
							style="text-shadow: 2px 2px #111;"
						>
							{{movie.title}} ({{movie.year}})
						</h1>
						<score v-if="movie.score" class="mt-2" :percent="movie.score.id" :stars="5" :numeric="true" />
					</div>
					<div class="mt-4 mr-8 max-w-screen-lg p-8 text-xl">
						<p>{{movie.plot}}</p>
						<p v-if="movie.directors" class="mt-4"><b>Directed by</b> {{movie.directors.map((director) => director.title).join(', ')}}</p>
						<p v-if="movie.actors" class="mt-4"><b>Starring</b> {{movie.actors.map((actor) => actor.title).join(', ')}}</p>
						<h3 class="mt-8 text-3xl">Events</h3>
						<ul class="ml-8">
							<li v-for="event in movie.events" :key="event.id"><event-line :event="event" /></li>
						</ul>
					</div>
				</div>
				<div class="z-10">
					<classification v-if="movie.classification" class="float-right md:mr-16" :to="movie.classification.path">{{movie.classification.title}}</classification>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	import EventLine from '@/components/event/Line.vue';
	import Icons from './categories/Icons.vue';

	export default {
		components: {Icons, Score, Classification, EventLine},
		props: ['movie'],
	}
</script>
