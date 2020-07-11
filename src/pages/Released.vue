<template>
	<Fixed>
		<ul>
			<li v-for="year in $page.years.edges" :key="year.node.id">
				<g-link :to="year.node.path">
					{{year.node.id}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		years: allReleaseYears {
			edges {
				node {
					id
					path
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
