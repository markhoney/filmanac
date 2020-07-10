<template>
	<Fixed>
		<ul>
			<li v-for="genre in $page.allGenres.edges" :key="genre.node.id">
				<g-link :to="genre.node.path">
					{{genre.node.title}}
				</g-link>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allGenres {
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
