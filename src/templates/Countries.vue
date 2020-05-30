<template>
	<Layout>
		<h1>{{$page.country.title}}</h1>
		<Movie v-for="(movie, index) in $page.countries.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query counties($id: ID) {
		country: countries(id: $id) {
			title
			flag
			map
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
				title: this.$page.country.title + ' Movies',
			};
		},
	};
</script>
