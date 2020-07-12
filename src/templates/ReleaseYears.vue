<template>
	<Fixed :title="title">
		<movie-card v-for="movie in $page.year.movies" :key="movie.id" :value="movie" />
	</Fixed>
</template>

<page-query>
	query($id: ID) {
		year: releaseYears(id: $id) {
			id
			movies {
				id
				title
				path
				plot
				year {
					id
				}
				score {
					id
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
				events {
					id
					title
					info {
						wikipedia {
							url
						}
					}
					year {
						id
						path
					}
					dayofyear {
						month {
							title
						}
						day {
							id
							ordinal
						}
					}
					refreshments
					mention
				}
			}
		}
	}
</page-query>

<script>
	import MovieCard from '@/components/movie/Card.vue';
	export default {
		components: {MovieCard},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			title() {return 'Movies released in ' + this.$page.year.id},
		},
	};
</script>
