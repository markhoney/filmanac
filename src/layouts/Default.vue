<template>
	<div class="flex flex-col">
		<site-header />
		<div class="flex-grow max-w-screen-lg mx-auto p-4">
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
