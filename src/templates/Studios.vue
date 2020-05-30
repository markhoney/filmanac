<template>
	<Layout>
		<h1>{{$page.studios.title}}</h1>
		<Movie v-for="(movie, index) in $page.studio.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query studios($id: ID) {
		studio: studios(id: $id) {
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
				title: this.$page.studio.title + ' Movies',
			};
		},
	};
</script>
