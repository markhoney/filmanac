<template>
	<div>
		<svg v-for="i in stars" :key="i" :class="[percent * stars + 1 / 100 >= i ? 'text-blue': 'text-grey']" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block h-8 w-8" viewBox="0 0 20 20"><path d="M10 15l-6 3 1-6-5-5 7-1 3-6 3 6 7 1-5 5 1 6z"/></svg>
	</div>
</template>

<script>
	export default {
		name: "StarRating",
		props: ['percent', 'stars'],
	};
</script>
