<template>
	<div class="flex-grow max-w-screen-lg mx-auto p-4">
		<h1 v-if="title" class="text-5xl text-center">{{title}}</h1>
		<slot />
	</div>
</template>

<script>
	export default {
		props: ['title'],
	}
</script>>
