<template>
	<div class="w-full md:w-full max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between">
		<div class="md:flex-shrink-0">
			<g-link v-if="poster" :to="link">
				<g-image class="md:w-56" :src="poster" :alt="title + ' poster'" />
			</g-link>
		</div>
		<div class="flex flex-col flex-grow px-8 py-4 bg-color-333">
			<h3 class="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200 movie--title">
				<g-link :to="link">{{title}}</g-link>
			</h3>
			<span class="movie--year text-xl lg:text-sm lg:mb-4">{{subtitle}}</span>
			<div class="flex-grow">
				<slot />
			</div>
			<Icons :categories="icons" />
		</div>
	</div>
</template>

<script>
	import Icons from './Icons.vue';
	export default {
		components: {Icons},
		props: ['link', 'poster', 'title', 'subtitle', 'icons'],
	};
</script>

<style>
	/* body {
		background: #111;
		width: 100%;
		margin: 64px auto;
		font-size: 16px;
		color: #ccc;
	} */

	.icon {
		max-height: 32px;
		width: auto;
		/* margin: 8px; */
	}
	.flex--movie {
		max-width: 80%;
		margin: 0 auto;
	}

	.bg-color-333 {
		background-color: #333;
	}

	.movie--year {
		font-variant-numeric: ordinal;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.07em;
		font-family: monospace;
	}

	.truncate-overflow {
		--max-lines: 3;
		position: relative;
		max-height: calc(1.375rem * 5);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	}
</style>
