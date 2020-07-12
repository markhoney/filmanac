<template>
	<Fixed title="Movie Classifications">
		<ul>
			<li v-for="classification in $page.allClassification.edges" :key="classification.node.id">
				<g-link :to="classification.node.path">
					{{classification.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allClassifications {
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
