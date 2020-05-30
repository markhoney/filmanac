<template>
	<Layout>
		<h1>{{$page.genres.title}}</h1>
		<Movie v-for="(movie, index) in $page.genre.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query genres($id: ID) {
		genre: genres(id: $id) {
			title
			icon
			belongsTo {
				edges {
					node {
						... on Movie {
							id
							title
							plot
							directors
							actors
							year
							rating
							runtime
							actors
							awards
							images {
								poster {
									path
								}
							}
							rated {
								id
								title
							}
							studios {
								id
								title
								icon
							}
							genres {
								id
								title
								icon
							}
							countries {
								id
								title
								map
							}
							languages {
								id
								title
								country {
									id
									flag
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
	import Movie from '@/components/MovieCard.vue';
	export default {
		components: {Movie},
		metaInfo() {
			return {
				title: this.$page.genre.title + ' Movies',
			};
		},
	};
</script>
