<template>
	<Layout>
		<h1>{{date}}</h1>
		<Movie v-for="(movie, index) in $page.movies.edges[0].node.movies" :key="index" :movie="movie.imdb" />
	</Layout>
</template>

<page-query>
	query movies ($month: Int, $day: Int) {
		movies: allDay(filter: {month: {eq: $month}, day: {eq: $day}}) {
			edges {
				node {
					month
					day
					movies {
						id
						reason
						imdb {
							id
							title
							plot
							director
							year
							images {
								art {
									poster {
										path
									}
								}
								icon {
									studio {
										path
										title
									}
									genre {
										path
										title
									}
									country {
										path
										title
									}
									language {
										path
										title
									}
								}
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
