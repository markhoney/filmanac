<template>
	<Layout>
		<h1>{{$page.language.title}}</h1>
		<Movie v-for="(movie, index) in $page.language.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query languages($id: ID) {
		language: languages(id: $id) {
			title
			country {
				id
				flag
				map
			}
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
				title: this.$page.language.title + ' Movies',
			};
		},
	};
</script>
