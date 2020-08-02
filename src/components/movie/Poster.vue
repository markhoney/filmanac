<template>
	<div class="text-grey-lightest font-bold hover:scale-110 transform transition-transform ease-in-out duration-500" style="max-width: 200px;">
		<div
			:class="{absolute: value.images && value.images.poster, 'rounded-l-lg': rounded, 'opacity-0': value.images && value.images.poster}"
			class="hover:opacity-100 duration-500 ease-in-out transition-all hover:rounded-l-none flex flex-col bg-black bg-opacity-75 top-0 left-0 w-full h-full p-2 text-center justify-around"
		>
			<div v-if="value.score">
				Rating: {{value.score.id}} %
			</div>
			<div v-if="value.awards">
				Awards:
				{{value.awards}}
			</div>
			<div v-if="value.runtime">
				Length: {{value.runtime}} mins
			</div>
		</div>
		<g-image v-if="value.images && value.images.poster" :src="value.images.poster" :alt="value.title + ' poster'" :class="{'rounded-l-lg': rounded}" />
	</div>
</template>

<script>
	import Score from './Score.vue';
	import Classification from './Classification.vue';
	export default {
		components: {
			Score,
			Classification,
		},
		props: {
			value: Object,
			rounded: Boolean,
		},
	};
</script>
