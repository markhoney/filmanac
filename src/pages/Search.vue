<template>
	<Fixed title="Search">
		<p>This site has very simple search functionality. Just type what you're looking for in the search box below, and the relevant results will be shown when you've typed more than two characters. You can search for movie names, days of the year, genres, languages, studios, years, countries, etc.</p>
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
