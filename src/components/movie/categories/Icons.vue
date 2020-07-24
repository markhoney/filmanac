<template>
	<ul class="inline-flex flex-row">
		<li v-for="icon in icons" :key="icon.title">
			<g-link :to="icon.path">
				<g-image v-if="icon.image" :src="icon.image" :title="icon.title" class="icon hover:scale-150 transform transition-transform ease-in-out duration-500" />
			</g-link>
		</li>
	</ul>
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
		@apply mx-2 h-6 text-white;
	}
</style>
