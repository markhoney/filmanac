<template>
	<Layout>
		<h1>
			{{$page.studio.name}}
		</h1>
		<Movie v-for="(movie, index) in $page.studio.belongsTo.edges" :key="index" :movie="movie.node" />
	</Layout>
</template>

<page-query>
	query studio ($id: ID) {
		studio(id: $id) {
			name
			icon
			belongsTo {
				edges {
					node {
						... on Movie {
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
	};
</script>
