<template>
	<div class="flex mb-2">
		<template v-for="(category, name) in categories">
			<g-link v-for="(item, index) in category" :key="name + index" :to="'/' + name + '/' + item.id">
				<img v-if="item.icon" :src="item.icon" :title="item.title" class="mx-2 icon" />
			</g-link>
		</template>
	</div>
</template>

<script>
	export default {
		props: ['categories'],
	}
</script>

<style>
	.icon {
		max-height: 32px;
		width: auto;
		/* margin: 8px; */
	}
</style>
