<template>
	<div :title="percent + '%'">
		<button v-for="i in stars" :key="i" :class="[i <= rating ? 'text-blue-500' : 'text-gray-200']">
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8" viewBox="0 0 260 245">
				<path d="M55 237L129 9l74 228L9 96h240"/>
			</svg>
		</button>
	</div>
</template>

<script>
	export default {
		title: "StarRating",
		props: ['percent', 'stars'],
		computed: {
			rating() {
				return this.percent * (this.stars + 1) / 100 - 0.5;
			},
		},
	};
</script>
