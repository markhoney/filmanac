<template>
	<Fixed :title="title">
		<Movie v-for="movie in $page.year.movies" :key="movie.id" :movie="movie" />
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
	import Movie from '@/components/movie/Card.vue';
	export default {
		components: {Movie},
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
