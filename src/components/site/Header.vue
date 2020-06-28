<template>
	<header class="sm:flex p-4 text-center bg-red-900 text-gray-400">
		<dark class="mr-4" />
		<site-menu />
		<div class="flex-auto text-center text-4xl font-bold" style="font-family: Josefin Sans;">
			<g-link to="/">
				{{title || $static.metadata.siteName}}
			</g-link>
		</div>
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
	import Search from './Search.vue';
	import SiteMenu from './Menu.vue';
	import Dark from './Dark.vue';
	export default {
		components: {Search, SiteMenu, Dark},
		props: ['title'],
	}
</script>
