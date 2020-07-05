<template>
	<Fixed :title="$page.year.title">
		<div v-for="month in months" :key="month.id">
			<h2 class="text-4xl border-b-2 border-white"><g-link :to="month.path">{{month.title}}</g-link></h2>
			<ul>
				<li v-for="movie in month.movies" :key="movie.id">
					<h3 class="text-2xl"><g-link :to="movie.path">{{movie.title}}</g-link></h3>
					<h4 v-for="event in movie.events" :key="event.id"><g-link :to="event.dayofyear.path"><b>{{event.dayofyear.day.id}}{{event.dayofyear.day.ordinal}}</b></g-link> {{event.title}}</h4>
				</li>
			</ul>
		</div>
	</Fixed>
</template>

<page-query>
	query year($id: ID) {
		year(id: $id) {
			title
			events {
				id
				title
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
					const month = event.dayofyear.month;
					if (!months[month.id]) months[month.id] = {...month, movies: {}};
					if (!months[month.id].movies[event.movie.id]) months[month.id].movies[event.movie.id] = {...event.movie, events: []};
					months[month.id].movies[event.movie.id].events.push(event);
					return months;
				}, {});
			},
		},
	};
</script>
