<template>
	<div
		class="h-screen flex flex-col min-h-screen text-grey-darkest dark:text-grey-lighter bg-repeat bg-fixed transition-all duration-500 ease-in-out"
		:style="{backgroundImage}"
	>
		<site-header class="z-10 shadow-xl" />
		<div
			ref="fixed"
			class="overflow-y-auto flex-grow bg-grey-lightest dark:bg-grey-darkest"
			style="--bg-opacity: 0.99; backdrop-filter: grayscale(100%);"
		>
			<slot />
		</div>
		<site-footer class="z-10" />
	</div>
</template>

<script>
	import SiteHeader from '@/components/site/Header.vue';
	import SiteFooter from '@/components/site/Footer.vue';
	export default {
		components: {SiteHeader, SiteFooter},
		data() {
			return {
				backgroundImage: `url('/img/backgrounds/tiles/${this.random(this.$store.state.tiles)}')`,
			};
		},
		methods: {
			random: (array) => array[~~(Math.random() * array.length)],
			scroll() {
				const fixed = this.$refs.fixed;
				if (this.$refs.fixed.scrollTop < 20) this.$store.commit('top', true);
				if (this.$refs.fixed.scrollTop > 100) this.$store.commit('top', false);
				this.$store.commit('bottom', fixed.scrollHeight - fixed.clientHeight - fixed.scrollTop === 0);

			},
		},
		/* watch: {
			$route() {
				this.backgroundImage = `url('/img/backgrounds/tiles/${this.random(this.$store.state.tiles)}')`;
			},
		}, */
		mounted() {
			this.$refs.fixed.addEventListener('scroll', this.scroll);
		},
		beforeDestroy() {
			this.$refs.fixed.removeEventListener('scroll', this.scroll);
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
