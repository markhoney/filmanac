<template>
	<Fixed>
		<ul>
			<li v-for="year in $page.years.edges" :key="year.node.id">
				<g-link :to="year.node.path">
					{{year.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		years: allYears {
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
			title: 'Event Years',
		},
	};
</script>
