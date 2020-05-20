<template>
	<div class="button-container flex justify-between mb-2">
		<template v-for="(category, name) in categories">
			<g-link v-for="(item, index) in category" :key="name + index" :to="'/' + name + '/' + item.id">
				<img v-if="item.icon" :src="item.icon" :title="item.name" class="icon" />
			</g-link>
		</template>
	</div>
</template>

<script>
	export default {
		props: ['categories'],
	}
</script>
