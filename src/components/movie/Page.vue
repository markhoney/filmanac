<template>
	<div>
		<section class="h-64 bg-cover bg-center mb-8" :style="{'background-image': `url('${movie.images && movie.images.fanart && movie.images.fanart.src}')`}">
			<div style="backdrop-filter: blur(5px) brightness(50%)" class="flex w-full h-full">
				<div class="flex-none pr-48 ml-8 mt-16 hidden sm:inline height-1">
					<g-image v-if="movie.images && movie.images.poster" :src="movie.images.poster" class="absolute shadow-xl border-4 border-white w-48 z-20" />
				</div>
				<div style="backdrop-filter: blur(1px) brightness(50%)" class="flex-auto ml-8">
					<h1 class="font-bold text-4xl tracking-loose mt-16 z-10" style="text-shadow: 2px 2px #111;">{{movie.title}} ({{movie.year}})</h1>
					<score v-if="movie.rated" class="float-right">{{movie.rated.title}}</score>
					<classification class="mt-2" :percent="movie.score" :stars="5" :numeric="true" />
				</div>
			</div>
		</section>
		<section class="mx-64 pa-16 text-xl">
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
