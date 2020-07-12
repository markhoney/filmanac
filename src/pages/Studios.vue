<template>
	<Fixed>
		<ul>
			<li v-for="studio in $page.allStudios.edges" :key="studio.node.id">
				<g-link :to="studio.node.path">
					{{studio.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allStudios {
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
		metaInfo: {
			title: 'Movie Studios',
		},
	};
</script>
