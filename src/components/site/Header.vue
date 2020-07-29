<template>
	<header
		class="flex flex-col sm:flex-row pt-0 text-center bg-white dark:bg-primary-light text-black dark:text-gray-400 shadow-xl bg-repeat-x"
		style="background-image: url('/img/backgrounds/curtain.png'), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2));"
	><!-- style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));" -->
		<dark class="mx-4" />
		<site-menu />
		<h1 class="flex-auto text-center text-5xl font-bold text-primary-light dark:text-gray-300" style="font-family: Racing Sans One;">
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
	import Search from './Search.vue';
	import SiteMenu from './Menu.vue';
	import Dark from './Dark.vue';
	export default {
		components: {Search, SiteMenu, Dark},
		props: ['title'],
	}
</script>
