<template>
	<div class="flex flex-col min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300" style="background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05));">
		<site-header />
		<div class="flex-grow bg-repeat" :style="{backgroundImage: background}">
			<slot />
		</div>
		<site-footer />
	</div>
</template>

<script>
	// https://www.transparenttextures.com/
	// https://www.heropatterns.com/
	import SiteHeader from '@/components/site/Header.vue';
	import SiteFooter from '@/components/site/Footer.vue';
	export default {
		components: {SiteHeader, SiteFooter},
		data() {
			return {
				backgrounds: [
					'overlook',
					'peacock',
					'goldroom',
					'maze',
				],
			};
		},
		computed: {
			background() {
				return `url('/img/${this.backgrounds[~~(Math.random() * this.backgrounds.length)]}.png')`;
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
</style>
