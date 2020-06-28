<template>
	<div>
		<h1 class="text-4xl">{{$page.year.title}}</h1>
		<div v-for="month in months" :key="month.id">
			<h2 class="text-2xl"><g-link :to="month.path">{{month.title}}</g-link></h2>
			<ul>
				<li v-for="movie in month.movies" :key="movie.id">
					<h3 class="text-xl"><g-link :to="movie.path">{{movie.title}}</g-link></h3>
					<h4 v-for="event in movie.events" :key="event.id">{{event.day.id}}{{event.day.ordinal}} {{event.title}}</h4>
				</li>
			</ul>
		</div>
	</div>
</template>

<page-query>
	query year($id: ID) {
		year(id: $id) {
			title
			events {
				id
				title
				month {
					id
					title
					path
				}
				day {
					id
					ordinal
				}
				movie {
					id
					path
					title
					year
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			title() {return this.$page.year.title + ' Movies'},
			months() {
				return this.$page.year.events.reduce((months, event) => {
					if (!months[event.month.id]) months[event.month.id] = {...event.month, movies: {}};
					if (!months[event.month.id].movies[event.movie.id]) months[event.month.id].movies[event.movie.id] = {...event.movie, events: []};
					months[event.month.id].movies[event.movie.id].events.push(event);
					return months;
				}, {});
			},
		},
	};
</script>
