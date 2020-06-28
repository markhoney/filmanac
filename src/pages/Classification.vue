<template>
	<ul>
		<li v-for="classification in $page.allClassification.edges.node" :key="classification.id">
			{{classification.title}}
		</li>
	</ul>
</template>

<page-query>
	{
		allClassification {
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
			title: 'Movies for Today',
		},
	};
</script>
