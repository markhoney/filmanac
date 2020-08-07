<template>
	<fixed :title="title">
		<movie-details v-for="movie in $page.genre.movies" :key="movie.id" :value="movie" />
	</fixed>
</template>

<page-query>
	query($id: ID) {
		genre: genres(id: $id) {
			title
			image
			movies {
				id
				title
				path
				plot
				year {
					id
					path
				}
				score {
					id
					number
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
					image
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
			title() {return 'Today in ' + this.$page.genre.title},
		},
	};
</script>
