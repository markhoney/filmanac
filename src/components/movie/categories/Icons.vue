<template>
	<div class="flex mb-2">
		<g-link v-for="item in icons" :key="item.title" :to="item.path">
			<g-image v-if="item.image" :src="item.image" :title="item.title" class="icon" height="32" />
		</g-link>
	</div>
</template>

<script>
	export default {
		props: ['value'],
		computed: {
			icons() {
				return [
					...this.value.genres || [],
					...this.value.studios || [],
					...this.value.countries || [],
					...this.value.languages || [],
				];
			},
		},
	};
</script>

<style scoped lang="postcss">
	.icon {
		@apply mx-2 w-auto h-6 text-white;
	}
</style>
