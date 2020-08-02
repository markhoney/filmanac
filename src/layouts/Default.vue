<template>
	<div
		class="h-screen flex flex-col min-h-screen text-grey-darkest dark:text-grey-lighter bg-repeat bg-fixed"
		:style="{backgroundImage}"
	>
		<site-header class="z-10 shadow-xl" />
		<div class="overflow-y-auto flex-1 flex-grow bg-grey-lightest dark:bg-grey-darkest" style="--bg-opacity: 0.95; backdrop-filter: grayscale(100%);">
			<slot />
		</div>
		<site-footer class="z-10" />
	</div>
</template>

<script>
	// https://katgregorowicz.com/The-Shining
	import SiteHeader from '@/components/site/Header.vue';
	import SiteFooter from '@/components/site/Footer.vue';
	export default {
		components: {SiteHeader, SiteFooter},
		data() {
			return {
				backgrounds: [
					'overlook',
					'peacock',
					'gold',
					'maze',
				],
			};
		},
		computed: {
			backgroundImage() {
				// return `url('/img/backgrounds/${this.backgrounds[~~(Math.random() * this.backgrounds.length)]}.png')`;
				return `url('/img/backgrounds/tiles/${this.backgrounds[~~(Math.random() * this.backgrounds.length)]}.jpg')`;
			},
		},
	}
</script>

<style lang="postcss">
	a {
		@apply font-medium;
	}
	a:hover {
		@apply underline;
	}
	.invert {
		filter: invert(1);
	}
</style>
