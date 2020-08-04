<template>
	<div class="max-w-screen-lg mx-auto p-8 bg-grey-lightest dark:bg-grey-darkest shadow-lg transition-all duration-500 ease-in-out" style="--bg-opacity: 0.8;">
		<h1 v-if="title" class="text-5xl text-center w-full">{{title}}</h1>
		<slot />
	</div>
</template>

<script>
	export default {
		props: ['title'],
	}
</script>>
