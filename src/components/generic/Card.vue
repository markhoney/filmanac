<template>
	<div class="rounded shadow-lg m-4 flex bg-gray-900">
		<div class="flex-auto">
			<g-link v-if="poster" :to="link">
				<g-image class="" :src="poster" :alt="title + ' poster'" />
			</g-link>
		</div>
		<div class="flex-grow px-4">
			<h3 class="font-bold text-2xl md:text-4xl text-gray-200">
				<g-link :to="link">{{title}}</g-link>
			</h3>
			<h4 class="text-base md:text-xl">{{subtitle}}</h4>
			<div class="hidden md:block mt-4">
				<slot />
			</div>
			<Icons :icons="icons" class="hidden md:flex mt-6" />
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
