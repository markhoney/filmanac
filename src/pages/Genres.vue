<template>
	<fixed :title="title" class="flex flex-wrap">
		<g-link
			v-for="genre in $page.allGenres.edges"
			:key="genre.node.id"
			:to="genre.node.path"
			:title="'See all ' + genre.node.title + ' movies'"
			class="w-32 m-8"
		>
			<figure>
				<g-image v-if="genre.node.image" :src="genre.node.image" :class="{invert: !$store.state.dark}" />
				<figcaption class="text-center">{{genre.node.title}}</figcaption>
			</figure>
		</g-link>
	</fixed>
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
		metaInfo() {return {title: this.title}},
		data() {return {title: 'Movie Genres'}},
	};
</script>
