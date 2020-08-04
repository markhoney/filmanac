<template>
	<Fixed :title="title" class="flex flex-wrap">
		<g-link
			v-for="country in $page.allCountries.edges"
			:key="country.node.id"
			:to="country.node.path"
			:title="'See all movies from ' + country.node.title"
			class="w-32 m-4"
		>
			<figure>
				<g-image v-if="country.node.image" :src="country.node.image" :class="{invert: !$store.state.dark}" />
				<figcaption class="text-center">{{country.node.title}}</figcaption>
			</figure>
		</g-link>
	</Fixed>
</template>

<page-query>
	{
		allCountries(sortBy: "id", order: ASC) {
			edges {
				node {
					id
					path
					title
					image (width: 100, height: 100)
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo() {return {title: this.title}},
		data() {return {title: 'Movie Countries'}},
	};
</script>
