<template>
	<Layout>
		<h1 class="font-bold text-4xl">
			<g-link :to="$page.movies.edges[0].node.previous">&lt;</g-link>
			{{$page.movies.edges[0].node.month_full}} {{$page.movies.edges[0].node.day_ordinal}}
			<g-link :to="$page.movies.edges[0].node.next">&gt;</g-link>
		</h1>
		<Movie v-for="(event, index) in $page.movies.edges[0].node.events" :key="index" :movie="event.movie" />
	</Layout>
</template>

<page-query>
	query movies ($month: Int, $day: Int) {
		movies: allDay(filter: {month: {eq: $month}, day: {eq: $day}}) {
			edges {
				node {
					month
					month_full
					day
					day_ordinal
					previous
					next
					events {
						id
						reason
						movie {
							id
							title
							plot
							director
							year
							images {
								poster {
									path
								}
							}
							studios {
								id
								icon
							}
							genres {
								id
								icon
							}
							countries {
								id
								icon
							}
							languages {
								id
								icon
							}
						}
					}
				}
			}
		}
	}
</page-query>

<script>
	import Movie from '@/components/Movie.vue';
	export default {
		components: {Movie},
		metaInfo: {
			title: 'Movies for ', // + this.date,
		},
		methods: {
			ord: (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''),
			mon: (n) => ['Month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ][n],
		},
		computed: {
			date() {return this.ord(this.$page.movies.edges[0].node.day) + ' ' + this.mon(this.$page.movies.edges[0].node.month)},
		},
	};
</script>
