<template>
	<div ref="container" class="flex items-center justify-center w-full" >
		<blockquote v-if="title" class="absolute bg-white text-black dark:bg-black dark:text-white bg-opacity-75 w-full mt-48 p-3 px-64 font-serif text-center z-10">
			<p class="font-bold italic text-5xl">{{title}}</p>
		</blockquote>
		<g-image
			:src="src"
			class="z-0 w-full object-cover object-center"
			style="height: 17rem; filter: saturate(0.5) brightness(0.5);"
		/>
	</div>
</template>

<script>
	export default {
		props: ['src', 'title'],
	}
</script>
