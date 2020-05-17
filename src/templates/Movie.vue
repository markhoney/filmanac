<template>
	<Layout>
		<div>
			<Movie :movie="$page.movie" />
		</div>
	</Layout>
</template>

<page-query>
	query movie ($id: ID) {
		movie(id: $id) {
			id
			title
			plot
			director
			year
			images {
				poster {
					path
				}
			}
			studios {
				id
				icon
			}
			genres {
				id
				icon
			}
			countries {
				id
				icon
			}
			languages {
				id
				icon
			}
		}
	}
</page-query>

<script>
	import Movie from '~/components/Movie.vue';
	export default {
		components: {Movie},
		metaInfo: {
			title: 'Blog',
		},
	};
</script>
