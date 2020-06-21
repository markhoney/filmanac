<template>
	<header>
		<h1><g-link to="/">{{title || $static.metadata.siteName}}</g-link></h1>
		<site-menu />
		<Search class="flex-none" />
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

<style scoped lang="postcss">
	header {
		@apply p-4 justify-center bg-black bg-opacity-25; /* sm:flex light:bg-red-400; */
		@screen sm {
			@apply flex;
		}
		@screen light {
			@apply bg-red-400;
		}
	}

	header h1 {
		@apply flex-auto text-4xl font-bold;
		font-family: Josefin Sans;
	}

	header nav {
		@apply flex-none flex mt-3;
	}

	header nav ul {
		@apply flex-none;
	}

	header nav ul li {
		@apply inline mr-6;
	}
</style>
