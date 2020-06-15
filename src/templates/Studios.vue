<template>
	<Layout :title="title">
		<h1>{{$page.studio.title}}</h1>
		<Movie v-for="(movie, index) in $page.studio.movies" :key="index" :movie="movie" />
	</Layout>
</template>

<page-query>
	query studios($id: ID) {
		studio: studios(id: $id) {
			title
			icon
			movies {
				id
				title
				plot
				year
				rating
				runtime
				awards
				images {
					poster {
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
			title() {return this.$page.studio.title + ' Movies'},
		},
	};
</script>
