<template>
	<fixed :title="'Movies classified ' + $page.classification.title">
		<movie-card v-for="movie in $page.classification.movies" :key="movie.id" :value="movie" />
	</fixed>
</template>

<page-query>
	query($id: ID) {
		classification: classifications(id: $id) {
			title
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
			title() {return this.$page.classification.title + ' Movies'},
		},
	};
</script>
