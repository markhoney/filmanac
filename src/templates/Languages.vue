<template>
	<Fixed :title="title">
		<h1>{{$page.language.title}}</h1>
		<Movie v-for="(movie, index) in $page.language.movies" :key="index" :movie="movie" />
	</Fixed>
</template>

<page-query>
	query languages($id: ID) {
		language: languages(id: $id) {
			title
			country {
				id
				flag
			}
			movies {
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
	import Movie from '@/components/movie/Card.vue';
	export default {
		components: {Movie},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			title() {return this.$page.language.title + ' Movies'},
		},
	};
</script>
