<template>
	<header
		class="flex flex-col sm:flex-row pt-0 text-center bg-grey-lightest dark:bg-grey-darkest text-black dark:text-grey-lightest bg-repeat-x leading-none transition-all duration-500 ease-in-out bg-bottom"
		style="--bg-opacity: 0.8;"
		:style="style"
		:class="{'p-6 pt-8': $store.state.top}"
	><!-- style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));" -->
		<site-menu class="pt-2" />
		<slot />
		<h1
			v-if="!$slots.default"
			class="flex-auto text-center text-5xl pt-1 font-bold text-primary-darker dark:text-grey-lighter capitalize font-bold"
			style="font-family: Bangers, Monoton;"
		>
			<g-link class="hover:no-underline" to="/">
				{{title || $static.metadata.siteName}}
			</g-link>
		</h1>
		<search class="m-2" />
	</header>
</template>

<static-query>
	query {
		metadata {
			siteName
		}
	}
</static-query>

<script>
	// Bangers, Carter One, Sail, Bungee Shade, Creepster, Henny Penny, Alfa Slab One, Special Elite, Audiowide, Monoton, Racing Sans One, Josefin Sans, Catamaran
	import Search from './search/Search.vue';
	import SiteMenu from './Menu.vue';
	export default {
		components: {Search, SiteMenu},
		props: ['title'],
		data() {
			return {
				top: true,
			};
		},
		computed: {
			style() {
				// if (this.$store.state.dark) return {backgroundImage: `url('/img/backgrounds/curtain.png')`};
			},
		},
	}
</script>
