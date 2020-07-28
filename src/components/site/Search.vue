<template>
	<div class="w-48 text-gray-700">
		<search-box v-model="searchTerm" />
		<transition name="fade">
			<search-list
				:value="searchTerm"
				class="absolute w-auto max-w-sm right-0 bg-white p-0 rounded mr-6 overflow-y-auto z-50"
				style="min-width: 192px; max-height: 90vh;"
			/>
		</transition>
	</div>
</template>

<script>
	import SearchBox from './search/Box.vue';
	import SearchList from './search/List.vue';
	export default {
		components: {SearchBox, SearchList},
		data() {
			return {
				searchTerm: '',
			};
		},
	};
</script>
