<template>
	<div>
		<site-header />
		<div class="main">
			<slot />
		</div>
		<site-footer />
	</div>
</template>

<script>
	import SiteHeader from '@/components/site/header.vue';
	import SiteFooter from '@/components/site/footer.vue';
	export default {
		components: {SiteHeader, SiteFooter},
	}
</script>

<style scoped lang="postcss">
	.main {
		@apply max-w-screen-lg mx-auto;
	}
</style>
