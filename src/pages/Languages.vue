<template>
	<Fixed title="Languages" class="flex flex-wrap">
		<g-link v-for="language in $page.allLanguages.edges" :key="language.node.id" :to="language.node.path" class="w-32 m-8">
			<figure>
				<g-image :src="language.node.image" class="invert" />
				<figcaption class="text-center">{{language.node.title}}</figcaption>
			</figure>
		</g-link>
	</Fixed>
</template>

<page-query>
	{
		allLanguages {
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
			title: 'Movie Languages',
		},
	};
</script>
