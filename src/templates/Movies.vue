<template>
	<div>
		<g-image
			v-if="$page.movie.images && $page.movie.images.fanart"
			:src="$page.movie.images.fanart"
			class="absolute z-0 w-full object-cover object-top"
			style="height: 20rem; filter: saturate(0.2) brightness(0.5); clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)"
		/>
		<div class="flex w-full h-full p-2 pt-16">
			<div v-if="$page.movie.images && $page.movie.images.poster" class="pr-48 ml-8 hidden sm:inline height-1">
				<movie-poster :value="$page.movie" class="absolute shadow-lg border-4 border-white w-48 z-0" />
			</div>
			<div class="flex-auto ml-8 md:ml-16 z-10">
				<div class="h-56">
					<movie-title :value="$page.movie" class="font-bold text-white text-4xl md:text-5xl tracking-loose leading-tight z-10" style="text-shadow: 2px 2px #111;" />
					<score v-if="$page.movie.score" class="mt-2 inline" :percent="$page.movie.score.number" :stars="5" />
					<icons :value="$page.movie" class="hidden md:inline-flex my-4 md:mr-32 float-right" />
				</div>
				<div class="mt-4 mr-8 max-w-screen-lg p-8 text-xl">
					<p>{{$page.movie.plot}}</p>
					<h3 class="mt-8 text-3xl">Events</h3>
					<ul class="ml-8">
						<li v-for="event in $page.movie.events" :key="event.id"><event-line :value="event" /></li>
					</ul>
					<p v-if="$page.movie.directors" class="mt-4"><b>Directed by</b> {{$page.movie.directors.map((director) => director.title).join(', ')}}</p>
					<p v-if="$page.movie.actors" class="mt-4"><b>Starring</b> {{$page.movie.actors.map((actor) => actor.title).join(', ')}}</p>
					<p v-if="$page.movie.bechdel" class="mt-4"><g-link class="font-bold" to="/about#bechdel">Bechdel score</g-link> <bechdel :value="$page.movie.bechdel.rating" /></p>
				</div>
			</div>
			<div class="z-10">
				<classification v-if="$page.movie.classification" class="hidden lg:block float-right md:mr-16 text-white" :value="$page.movie.classification" />
			</div>
		</div>
	</div>
</template>

<page-query>
	query movies($id: ID) {
		movie: movies(id: $id) {
			id
			title
			plot
			year {
				id
				path
			}
			score {
				id
				number
			}
			runtime
			awards
			bechdel {
				rating
			}
			directors {
				title
				path
			}
			actors {
				title
				path
			}
			images {
				poster (width: 200, height: 300, quality: 80)
				fanart (width: 1280, height: 720, quality: 80)
				logo (width: 400, height: 155)
			}
			classification {
				title
				path
			}
			studios {
				title
				image
				path
			}
			genres {
				title
				image
				path
			}
			countries {
				title
				image
				path
			}
			languages {
				title
				image
				path
			}
			events(sortBy: "date", order: ASC) {
				id
				title
				year {
					id
					path
				}
				info {
					wikipedia {
						url
					}
				}
				dayofyear {
					path
					month {
						id
						title
						path
					}
					day {
						id
						ordinal
					}
				}
			}
		}
	}
</page-query>

<script>
	import Score from '@/components/movie/Score.vue';
	import Classification from '@/components/movie/Classification.vue';
	import Bechdel from '@/components/movie/Bechdel.vue';
	import MoviePoster from '@/components/movie/Poster.vue';
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLine from '@/components/event/Line.vue';
	import Icons from '@/components/movie/Icons.vue';
	export default {
		components: {Icons, Score, MoviePoster, Classification, Bechdel, MovieTitle, EventLine},
		metaInfo() {return {title: this.title}},
		computed: {
			title() {return this.$page.movie.title},
		},
	};
</script>
