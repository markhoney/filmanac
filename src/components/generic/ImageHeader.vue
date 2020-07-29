<template>
	<div class="flex items-center justify-center w-full" >
		<g-image
			:src="src"
			class="absolute z-0 w-full object-cover object-center"
			style="height: 20rem; filter: saturate(0.5) brightness(0.5);"
		/>
		<blockquote v-if="title" class="bg-black bg-opacity-75 font-serif mx-4 mt-56 p-4 px-64 text-center text-white z-10">
			<p class="font-bold italic text-3xl">{{title}}</p>
		</blockquote>
	</div>
</template>

<script>
	export default {
		props: ['src', 'title'],
	}
</script>
