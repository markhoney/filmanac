<template>
	<div>
		<g-link v-for="item in icons" :key="item.title" :to="item.path" class="badge">
			{{item.title.toLowerCase()}}
		</g-link>
	</div>
</template>

<script>
	export default {
		props: ['items'],
	}
</script>

<style scoped lang="postcss">
	.badge {
		@apply mr-2 bg-green-600 text-white p-2 rounded  leading-none flex items-center;
	}
</style>
