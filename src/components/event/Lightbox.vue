<template>
	<div tabindex="0" contenteditable="true" @blur="visible = false">
		<g-image
			:src="src"
			@click="visible = !visible"
			class="border-white border-2 rounded cursor-pointer"
		/>
		<g-image
			:src="src"
			v-if="visible"
			@click="visible = false"
			@blur="visible = false"
			class="absolute left-0 z-50 items-center justify-center border-white border-8 rounded shadow max-w-full max-h-full"
		/>
	</div>
</template>

<script>
	export default {
		props: ['src'],
		data() {
			return {
				visible: false,
			};
		},
	};
</script>
