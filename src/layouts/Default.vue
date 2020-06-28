<template>
	<div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
		<site-header />
		<div class="flex-grow bg-repeat" style="background-image: url('/img/concrete.png')">
			<slot />
		</div>
		<site-footer />
	</div>
</template>

<script>
	import SiteHeader from '@/components/site/Header.vue';
	import SiteFooter from '@/components/site/Footer.vue';
	export default {
		components: {SiteHeader, SiteFooter},
	}
</script>
