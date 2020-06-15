<template>
	<div class="w-full md:w-full max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between">
		<div class="md:flex-shrink-0">
			<g-link v-if="poster" :to="link">
				<g-image class="md:w-56" :src="poster" :alt="title + ' poster'" />
			</g-link>
		</div>
		<div class="flex flex-col flex-grow px-8 py-4 bg-gray-800">
			<h3 class="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200">
				<g-link :to="link">{{title}}</g-link>
			</h3>
			<span class="text-xl lg:mb-4">{{subtitle}}</span>
			<div class="flex-grow">
				<slot />
			</div>
			<Icons :icons="icons" style="color: #ff0000;" />
		</div>
	</div>
</template>

<script>
	import Icons from '@/components/movie/categories/Icons.vue';
	export default {
		components: {Icons},
		props: ['link', 'poster', 'title', 'subtitle', 'icons'],
	};
</script>
