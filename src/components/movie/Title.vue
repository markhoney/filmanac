<template>
	<h2>
		<g-link v-if="movie.path" :to="movie.path" :title="'See details for the movie ' + movie.title">{{movie.title}}</g-link>
		<template v-else>{{movie.title}}</template>
		<template v-if="movie.year"> (<g-link :to="movie.year.path" :title="'See all movies released in ' + movie.year.id">{{movie.year.id}}</g-link>)</template>
	</h2>
</template>

<script>
	export default {
		props: ['movie'],
	}
</script>
