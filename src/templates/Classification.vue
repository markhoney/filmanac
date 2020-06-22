<template>
	<div>
		<h1>{{$page.classification.title}}</h1>
		<Movie v-for="(movie, index) in $page.classification.movies" :key="index" :movie="movie" />
	</div>
</template>

<page-query>
	query classification($id: ID) {
		classification(id: $id) {
			title
			movies {
				id
				title
				plot
				year
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
			title() {return this.$page.classification.title + ' Movies'},
		},
	};
</script>
