<template>
	<Fixed :title="title">
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
		metaInfo() {return {title: this.title}},
		data() {
			return {
				title: 'Search',
				searchTerm: '',
			};
		},
		mounted() {
			if (this.$route.query.s) this.searchTerm = decodeURIComponent(this.$route.query.s);
		},
		watch: {
			searchTerm(searchTerm) {
				let searchParams = new URLSearchParams(window.location.search);
				searchParams.set('s', searchTerm);
				window.history.replaceState(null, '', window.location.pathname + searchTerm ? ('?' + searchParams.toString()) : '');
				// this.$router.replace(window.location.pathname + '?' + searchParams.toString());
				// this.$router.replace(window.location.pathname + '?s=' + searchTerm);
			},
		},
	};
</script>
