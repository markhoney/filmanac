<template>
	<Layout>
		<h1>
			{{$page.genres.name}}
		</h1>
		<Movie v-for="(movie, index) in $page.genres.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query genres($id: ID) {
		genres(id: $id) {
			name
			icon
			belongsTo {
				edges {
					node {
						... on Movies {
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
								name
								icon
							}
							genres {
								id
								name
								icon
							}
							countries {
								id
								name
								icon
							}
							languages {
								id
								name
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
	import Movie from '@/components/MovieCard.vue';
	export default {
		components: {Movie},
		metaInfo() {
			return {
				title: this.$page.genres.name + ' Movies',
			};
		},
	};
</script>
