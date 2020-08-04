<template>
	<Fixed :title="title">

	</Fixed>
</template>

<script>
	export default {
		metaInfo() {return {title: this.title}},
		data() {return {title: '404 - Page not Found'}},
	};
</script>

<style>

</style>
