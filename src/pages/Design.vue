<template>
	<div class="p-16">
		<h2 class="my-4 text-4xl">Colours</h2>
		<div
			class="flex flex-wrap"
			v-for="(shades, colour) in colours"
			:key="colour"
		>
			<h3 class="w-full text-2xl capitalize">{{colour}}</h3>
			<div
				v-for="(hex, shade) in shades"
				class="w-32 h-24 m-4"
				:class="['bg', colour, shade.replace('default', '')].filter(Boolean).join('-')"
				:title="[colour, shade.replace('default', '')].filter(Boolean).join('-') + ' - ' + hex"
				:key="shade"
			>
				<h4>{{[colour, shade.replace('default', '')].filter(Boolean).join('-')}}</h4>
				<p class="text-white dark:text-black">{{[colour, shade.replace('default', '')].filter(Boolean).join('-')}}</p>
			</div>
		</div>
		<h2 class="my-4 text-4xl">Fonts</h2>
		<template v-for="font in $store.state.fonts">
			<h3 class="text-2xl" :key="font">{{font}}</h3>
			<h4 :style="'font-family: ' + font" class="uppercase text-6xl ml-4" :key="font.toLowerCase()">A Movie for Today</h4>
		</template>
		<h2 class="my-4 text-4xl">Tiles</h2>
		<div class="flex flex-wrap">
			<figure v-for="tile in $store.state.tiles" :key="tile" class="m-8">
				<img :src="'/img/backgrounds/tiles/' + tile" />
				<figcaption class="text-center">{{tile}}</figcaption>
			</figure>
		</div>
	</div>
</template>

<script>
	import tailwind from '@/../tailwind.config';
	export default {
		metaInfo() {return {title: this.title}},
		data() {
			return {
				title: 'Colour Palette',
				colours: tailwind.theme.extend.colors,
			};
		},
	};
</script>>
