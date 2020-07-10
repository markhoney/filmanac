<template>
	<Fixed>
		<ul>
			<li v-for="year in $page.allYear.edges" :key="year.node.id">
				<g-link :to="year.node.path">
					{{year.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allYears {
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
