<template>
	<fixed :title="title">
		<movie-details v-for="movie in $page.studio.movies" :key="movie.id" :value="movie" />
	</fixed>
</template>

<page-query>
	query($id: ID) {
		studio: studios(id: $id) {
			title
			image
			movies {
				id
				title
				plot
				year {
					id
					path
				}
				runtime
				awards
				images {
					poster (width: 200, height: 300, quality: 80)
				}
				classification {
					title
					path
				}
				studios {
					title
					image
					path
				}
				genres {
					title
					image
					path
				}
				countries {
					title
					image
					path
				}
				languages {
					title
					image
					path
				}
				events(sortBy: "date", order: ASC) {
					id
					title
					year {
						id
						path
					}
					info {
						wikipedia {
							url
						}
					}
					dayofyear {
						path
						month {
							id
							title
							path
						}
						day {
							id
							ordinal
						}
					}
				}
			}
		}
	}
</page-query>

<script>
	import MovieDetails from '@/components/movie/Details.vue';
	export default {
		components: {MovieDetails},
		metaInfo() {return {title: this.title}},
		computed: {
			title() {return 'Movies made by ' + this.$page.studio.title},
		},
	};
</script>
