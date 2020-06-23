<template>
	<header class="sm:flex p-4 text-center bg-black bg-opacity-25 light:bg-red-400">
		<site-menu />
		<div class="flex-auto text-center text-4xl font-bold" style="font-family: Josefin Sans;"><g-link to="/">{{title || $static.metadata.siteName}}</g-link></div>
		<Search />
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
	import Search from '@/components/site/Search.vue';
	import SiteMenu from '@/components/site/Menu.vue';
	export default {
		components: {Search, SiteMenu},
		props: ['title'],
	}
</script>
