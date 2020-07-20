<template>
	<div class="flex mb-2">
		<g-link v-for="icon in icons" :key="icon.title" :to="icon.path">
			<g-image v-if="icon.image" :src="icon.image" :title="icon.title" class="icon" height="32" />
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
