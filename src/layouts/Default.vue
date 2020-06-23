<template>
	<div class="flex flex-col min-h-screen">
		<site-header />
		<div class="flex-grow">
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
