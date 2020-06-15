<template>
	<Layout>
		<Movie :movie="$page.movie" />
	</Layout>
</template>

<page-query>
	query movie($id: ID) {
		movie(id: $id) {
			id
			title
			plot
			year
			score
			runtime
			awards
			images {
				poster {
					path
				}
				fanart {
					path
				}
			}
			rated {
				title
				path
			}
			studios {
				title
				icon
				path
			}
			genres {
				title
				icon
				path
			}
			countries {
				title
				icon
				path
			}
			languages {
				title
				icon
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
