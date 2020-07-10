<template>
	<Fixed :title="title">
		<h1>{{$page.country.title}}</h1>
		<Movie v-for="(movie, index) in $page.country.movies" :key="index" :movie="movie" />
	</Fixed>
</template>

<page-query>
	query($id: ID) {
		country: countries(id: $id) {
			title
			possessive
			flag
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
			title() {return this.$page.country.possessive + ' Movies'},
		},
	};
</script>
