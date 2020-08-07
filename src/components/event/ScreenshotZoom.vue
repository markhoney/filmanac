<template>
	<div class="zoom w-16">
		<g-image :src="value" fit="fill" />
	</div>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>

<style scoped>
	.zoom:hover {
		--transform-scale-y: 8;
		--transform-scale-x: 8;
	}
</style>
