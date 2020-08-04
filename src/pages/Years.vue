<template>
	<Fixed :title="title" class="flex flex-wrap">
		<g-link
			v-for="year in $page.allYears.edges"
			:key="year.node.id"
			:to="year.node.path"
			:title="'See all events in ' + year.node.title"
			class="w-32 m-8 text-2xl text-center"
		>
			{{year.node.title}}
		</g-link>
	</Fixed>
</template>

<page-query>
	{
		allYears(sortBy: "id", order: ASC) {
			edges {
				node {
					id
					path
					title
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo() {return {title: this.title}},
		data() {return {title: 'Event Years'}},
	};
</script>
