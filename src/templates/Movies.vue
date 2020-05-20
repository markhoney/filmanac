<template>
	<Layout>
		<div>
			<Movie :movie="$page.movie" />
		</div>
	</Layout>
</template>

<page-query>
	query movie($id: ID) {
		movie: movies(id: $id) {
			id
			title
			plot
			director
			year
			rated
			runtime
			actors
			awards
			rating
			images {
				poster {
					path
				}
			}
			studios {
				id
				name
				icon
			}
			genres {
				id
				name
				icon
			}
			countries {
				id
				name
				icon
			}
			languages {
				id
				name
				icon
			}
		}
	}
</page-query>

<script>
	import Movie from '~/components/MovieCard.vue';
	export default {
		components: {Movie},
		metaInfo() {
			return {
				title: this.$page.movie.title,
			};
		},
	};
</script>
