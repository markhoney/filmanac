<template>
	<div>
		<g-link v-for="item in value" :key="item.title" :to="item.path" class="badge text-sm">
			{{item.title.toLowerCase()}}
		</g-link>
	</div>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>

<style scoped lang="postcss">
	.badge {
		@apply mr-2 bg-green-600 text-white p-2 rounded leading-none flex items-center;
	}
</style>
