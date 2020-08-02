<template>
	<header
		class="flex flex-col sm:flex-row pt-0 text-center bg-grey-lighter dark:bg-primary-dark text-black dark:text-grey-lightest bg-repeat-x"
		style="background-image: url('/img/backgrounds/curtain.png');"
	><!-- style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));" -->
		<dark class="mx-4 mt-5" />
		<site-menu />
		<slot />
		<h1 v-if="!$slots.default" class="flex-auto text-center text-5xl font-bold text-primary-darker dark:text-grey-lighter pb-2" style="font-family: Racing Sans One;">
			<g-link class="hover:no-underline" to="/">
				{{title || $static.metadata.siteName}}
			</g-link>
		</h1>
		<search class="m-4" />
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
	import Dark from './Dark.vue';
	export default {
		components: {Search, SiteMenu, Dark},
		props: ['title'],
	}
</script>
