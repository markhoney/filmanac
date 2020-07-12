<template>
	<div class="button-container flex justify-between mb-2">
		<a v-for="(service, index) in value" :key="index" :href="service.url">
			<img v-if="service.image" :src="service.image" :title="service.title" class="icon" />
		</a>
	</div>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>
