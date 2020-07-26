<template>
	<Fixed title="Studios" class="flex flex-wrap">
		<g-link v-for="studio in $page.allStudios.edges" :key="studio.node.id" :to="studio.node.path" class="w-32 m-8">
			<g-image v-if="studio.node.image" :src="studio.node.image" class="invert" />
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
		metaInfo: {
			title: 'Movie Studios',
		},
	};
</script>
