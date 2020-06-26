<template>
	<div class="flex flex-col min-h-screen bg-gray-800 light:bg-gray-100 text-gray-300 light:text-gray-900">
		<site-header />
		<div class="flex-grow bg-repeat" style="background-image: url('/img/background.png')">
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
