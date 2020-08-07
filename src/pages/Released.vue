<template>
	<fixed :title="title" class="flex flex-wrap">
		<g-link
			v-for="year in $page.allReleaseYears.edges"
			:key="year.node.id"
			:to="year.node.path"
			:title="'See all movies released in ' + year.node.title"
			class="w-32 m-8 text-2xl text-center"
		>
			{{year.node.title}}
		</g-link>
	</fixed>
</template>

<page-query>
	{
		allReleaseYears(sortBy: "id", order: ASC) {
			edges {
				node {
					id
					title
					path
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo() {return {title: this.title}},
		data() {return {title: 'Movie Release Years'}},
	};
</script>
