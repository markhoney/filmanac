<template>
	<Fixed :title="title" class="flex flex-wrap">
		<g-link v-for="studio in $page.allStudios.edges" :key="studio.node.id" :to="studio.node.path" class="w-32 m-8">
			<g-image v-if="studio.node.image" :src="studio.node.image" />
			<h3 v-else class="text-center">{{studio.node.title}}</h3>
		</g-link>
	</Fixed>
</template>

<page-query>
	{
		allStudios(sortBy: "id", order: ASC) {
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
		data() {return {title: 'Movie Studios'}},
	};
</script>
