<template>
<div class="text-gray-700">
	<input class="form-control" type="text" v-model="searchTerm" @focus="focus = true" @blur="setTimeout(() => {focus = false}, 500)" />
	<ul v-if="focus && searchResults" class="absolute bg-white pt-1">
		<li v-for="result in searchResults" :key="result.id">
			<g-link :to="result.path">{{result.title}}</g-link>
		</li>
	</ul>
</div>
</template>

<script>
	import Search from 'gridsome-plugin-flexsearch/SearchMixin';
	export default {
		mixins: [Search],
		data() {
			return {
				searchTerm: '',
				items: [],
				focus: false,
			};
		},
	};
</script>
