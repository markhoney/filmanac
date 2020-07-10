<template>
	<Fixed>
		<ul>
			<li v-for="language in $page.allLanguages.edges" :key="language.node.id">
				<g-link :to="language.node.path">
					{{language.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allLanguages {
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
