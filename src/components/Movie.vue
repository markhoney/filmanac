<template>
	<div class="w-full md:w-full lg:w-1/2 max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between">
		<div class="md:flex-shrink-0">
			<g-image class="md:w-56"
				:src="movie.images.poster.path"
				:alt="movie.images.poster.title + ' movie poster'"
			/>
		</div>
		<div class="flex flex-col flex-grow px-8 py-4 bg-color-333">
			<h3 class="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200 movie--title">{{movie.title}}</h3>
			<span class="movie--year text-xl lg:text-sm lg:mb-4">{{movie.year}}</span>
			<div class="flex-grow">
				<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{movie.plot}}</p>
				<p class="mt-4 text-gray-100">- Directed by {{movie.director}}.</p>
			</div>
			<div class="button-container flex justify-between mb-2">
				<g-image
					v-for="(icon, index) in [
						...movie.images.studio,
						...movie.images.genre,
						...movie.images.country,
						...movie.images.language,
					]"
					:key="index"
					:src="icon.path"
					:title="icon.title"
					style="max-height: 32px; width: auto; margin: 8px;"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			movie: Object,
		},
		data() {
			return {
			};
		},
	};
</script>

<style>
	body {
		background: #111;
		width: 100%;
		margin: 64px auto;
		font-size: 16px;
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
