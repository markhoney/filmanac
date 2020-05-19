<template>
	<div class="w-full md:w-full max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between">
		<div class="md:flex-shrink-0">
			<g-link :to="'/' + event.movie.id">
				<g-image v-if="event.movie.images && event.movie.images.poster" class="md:w-56"
					:src="event.movie.images.poster.path"
					:alt="event.movie.title + ' movie poster'"
				/>
			</g-link>
		</div>
		<div class="flex flex-col flex-grow px-8 py-4 bg-color-333">
			<h3 class="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200 movie--title"><g-link :to="'/' + event.movie.id">{{event.movie.title}}</g-link></h3>
			<span class="movie--year text-xl lg:text-sm lg:mb-4">{{event.year}}</span>
			<div class="flex-grow">
				<p class="text-xl md:text-base lg:text-base text-gray-100 leading-snug truncate-overflow">{{event.reason.description}}</p>
				<p v-if="event.refreshments.list.length" :title="event.refreshments.description" class="mt-4 text-gray-100">- Suggested refreshments: {{event.refreshments.list.join(', ')}}.</p>
			</div>
			<div class="button-container flex justify-between mb-2">
				<template v-for="category in ['genres', 'studios', 'countries', 'languages']">
					<g-link v-for="(item, index) in event.movie[category]" :key="category + index" :to="'/' + category + '/' + item.id">
						<img v-if="item.icon" :src="item.icon" :title="item.name" class="icon" />
					</g-link>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			event: Object,
		},
		data() {
			return {
			};
		},
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
