<template>
	<fixed :title="title" class="flex flex-wrap">
		<g-link
			v-for="language in $page.allLanguages.edges"
			:key="language.node.id"
			:to="language.node.path"
			:title="'See all movies in ' + language.node.title"
			class="w-32 m-8"
		>
			<figure>
				<g-image :src="language.node.image" />
				<figcaption class="text-center">{{language.node.title}}</figcaption>
			</figure>
		</g-link>
	</fixed>
</template>

<page-query>
	{
		allLanguages(sortBy: "id", order: ASC) {
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
		data() {return {title: 'Languages in Movies'}},
	};
</script>
