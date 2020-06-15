<template>
	<div class="flex mb-2">
		<g-link v-for="item in icons" :key="item.title" :to="item.path">
			<g-image v-if="item.icon" :src="item.icon" :title="item.title" class="icon" height="32" />
		</g-link>
	</div>
</template>

<script>
	export default {
		props: ['icons'],
	}
</script>

<style>
	.icon {
		@apply mx-2 w-auto h-6 text-white;
	}
</style>
