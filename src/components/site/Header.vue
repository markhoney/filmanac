<template>
	<header class="sm:flex p-2 pt-0 text-center bg-primary-dark text-gray-200 shadow-xl" style="background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));">
		<dark class="mr-4" />
		<site-menu class="mt-4" />
		<h1 class="flex-auto text-center text-5xl font-bold" style="font-family: Racing Sans One;">
			<g-link to="/">
				{{title || $static.metadata.siteName}}
			</g-link>
		</h1>
		<search />
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
