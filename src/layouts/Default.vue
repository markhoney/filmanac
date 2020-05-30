<template>
	<div class="layout">
		<header class="header">
			<strong>
				<g-link to="/">{{$static.metadata.siteName}}</g-link>
			</strong>
			<nav class="nav">
				<g-link class="nav__link" to="/">Home</g-link>
				<g-link class="nav__link" to="/about/">About</g-link>
				<Search />
			</nav>
		</header>
		<slot/>
	</div>
</template>

<static-query>
	query {
		metadata {
			siteName
		}
	}
</static-query>

<script>
	import Search from '@/components/Search.vue';
	export default {
		components: {Search},
	}
</script>

<style>
	body {
		font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
		margin:0;
		padding:0;
		line-height: 1.5;
		background: #111;
		color: #ccc;
	}

	/* body {
		background: #111;
		width: 100%;
		margin: 64px auto;
		font-size: 16px;
		color: #ccc;
	} */

	.layout {
		max-width: 760px;
		margin: 0 auto;
		padding-left: 20px;
		padding-right: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		height: 80px;
	}

	.nav__link {
		margin-left: 20px;
	}
</style>
