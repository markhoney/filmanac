<template>
	<Layout>
		<h1>
			{{$page.studios.name}}
		</h1>
		<Movie v-for="(movie, index) in $page.studios.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query studios($id: ID) {
		studios(id: $id) {
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
				title: this.$page.studios.name + ' Movies',
			};
		},
	};
</script>
