<template>
	<Layout>
		<div>
			<Movie :movie="$page.movie" />
		</div>
	</Layout>
</template>

<page-query>
	query movie($id: ID) {
		movie(id: $id) {
			id
			title
			plot
			directors
			actors
			year
			rating
			runtime
			actors
			awards
			images {
				poster {
					path
				}
			}
			rated {
				id
				title
			}
			studios {
				id
				title
				icon
			}
			genres {
				id
				title
				icon
			}
			countries {
				id
				title
				map
			}
			languages {
				id
				title
				country {
					id
					flag
				}
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
