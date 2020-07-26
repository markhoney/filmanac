<template>
	<Fixed title="Genres" class="flex flex-wrap">
		<g-link v-for="genre in $page.allGenres.edges" :key="genre.node.id" :to="genre.node.path" class="w-32 m-8">
			<figure>
				<g-image v-if="genre.node.image" :src="genre.node.image" class="invert" />
				<figcaption class="text-center">{{genre.node.title}}</figcaption>
			</figure>
		</g-link>
	</Fixed>
</template>

<page-query>
	{
		allGenres(sortBy: "id", order: ASC) {
			edges {
				node {
					id
					path
					title
					image
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo: {
			title: 'Movie Genres',
		},
	};
</script>

<style scoped lang="postcss">
	.invert {
		filter: invert(1);
	}
</style>
