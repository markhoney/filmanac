<template>
	<Fixed :title="title">
		<movie-card v-for="movie in $page.genre.movies" :key="movie.id" :value="movie" />
	</Fixed>
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
			title() {return this.$page.genre.title + ' Movies'},
		},
	};
</script>
