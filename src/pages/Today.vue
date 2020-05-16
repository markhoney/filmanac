<template>
	<Layout>
		<p></p>
		<div v-if="$page.movies.edges[0].node.movies">
			<Movie v-for="(movie, index) in $page.movies.edges[0].node.movies" :key="index" :movie="movie" />
		</div>
	</Layout>
</template>

<page-query>
	query Movies ($month: Int, $day: Int) {
		movies: allDay(filter: {month: {eq: $month}, day: {eq: $day}}) {
			edges {
				node {
					id
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
			title: 'Today',
		},
	};
</script>
