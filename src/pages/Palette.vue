<template>
	<div>
		<div
			class="flex flex-wrap"
			v-for="(shades, colour) in colours"
			:key="colour"
		>
			<h2 class="w-full ml-4 text-3xl">{{colour}}</h2>
			<div
				v-for="(hex, shade) in shades"
				class="w-24 h-24 m-4"
				:class="['bg', colour, shade.replace('default', '')].filter(Boolean).join('-')"
				:title="[colour, shade.replace('default', '')].filter(Boolean).join('-') + ' - ' + hex"
				:key="shade"
			/>
		</div>
	</div>
</template>

<script>
	import tailwind from '@/../tailwind.config';
	export default {
		data() {
			return {
				colours: tailwind.theme.extend.colors,
			};
		},
	};
</script>>
