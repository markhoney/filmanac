<template>
	<ul class="inline-flex flex-row">
		<template v-for="category in ['genres', 'studios', 'countries', 'languages']">
			<li v-for="icon in value[category]" :key="icon.title">
				<g-link :to="icon.path">
					<g-image
						v-if="icon.image"
						:src="icon.image"
						:title="icon.title"
						class="icon hover:scale-150 transform transition-transform ease-in-out duration-500"
						:class="{invert: ['genres', 'countries'].includes(category) && !$store.state.dark}"
					/>
				</g-link>
			</li>
		</template>
	</ul>
</template>

<script>
	export default {
		props: ['value', 'invert'],
	};
</script>

<style scoped lang="postcss">
	.icon {
		@apply mx-2 h-6 text-white;
	}
</style>
