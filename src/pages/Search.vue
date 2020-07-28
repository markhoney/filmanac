<template>
	<Fixed title="Search">
		<search-box v-model="searchTerm" class="my-8" />
		<search-list :value="searchTerm" />
	</Fixed>
</template>

<script>
	import SearchBox from '@/components/site/search/Box.vue';
	import SearchList from '@/components/site/search/List.vue';
	export default {
		components: {SearchBox, SearchList},
		data() {
			return {
				searchTerm: '',
			};
		},
	};
</script>
