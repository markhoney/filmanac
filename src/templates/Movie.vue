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
				art {
					poster {
						path
					}
				}
				icon {
					studio {
						path
						title
					}
					genre {
						path
						title
					}
					country {
						path
						title
					}
					language {
						path
						title
					}
				}
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
