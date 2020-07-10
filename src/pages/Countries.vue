<template>
	<Fixed>
		<ul>
			<li v-for="country in $page.allCountries.edges" :key="country.node.id">
				<g-link :to="country.node.path">
					{{country.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allCountries {
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
