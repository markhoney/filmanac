<template>
	<Fixed :title="$metaInfo.title">
		<div class="flex flex-wrap justify-between mt-12">
			<classification
				v-for="classification in $page.allClassifications.edges"
				:key="classification.node.id"
				class="text-black border-black dark:text-white dark:border-white text-4xl m-8"
				:value="classification.node"
			/>
		</div>
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
	import Classification from '@/components/movie/Classification.vue';
	export default {
		components: {Classification},
		metaInfo() {return {title: this.title}},
		data() {return {title: 'Movie Classifications'}},
	};
</script>
