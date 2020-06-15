<template>
	<div :title="percent + '%'" :style="{color: colour || '#4299E1'}">
		<button v-for="i in stars" :key="i" :class="{'text-gray-300': i > rating}">
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8" viewBox="0 0 260 245">
				<path d="M55 237L129 9l74 228L9 96h240"/>
			</svg>
		</button>
		<span v-if="numeric" class="ml-5 text-3xl text-gray-300">{{percent}}%</span>
	</div>
</template>

<script>
	export default {
		title: "StarRating",
		props: ['percent', 'stars', 'colour', 'numeric'],
		computed: {
			rating() {
				return this.percent * (this.stars + 1) / 100 - 0.5;
			},
		},
	};
</script>

<style scoped>
</style>
