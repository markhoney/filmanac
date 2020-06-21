<template>
	<Movie :movie="$page.movie" />
</template>

<page-query>
	query movie($id: ID) {
		movie(id: $id) {
			id
			title
			plot
			year
			score {
				id
			}
			runtime
			awards
			images {
				poster (width: 200, height: 300, quality: 80)
				fanart (width: 1280, height: 720, quality: 80)
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
				year {
					id
				}
				month {
					title
				}
				day {
					id
					ordinal
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
					}
					day {
						id
						ordinal
					}
				}
			}
		}
	}
</page-query>

<script>
	import Movie from '@/components/movie/Page.vue';
	export default {
		components: {Movie},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			title() {return this.$page.movie.title},
		},
	};
</script>
