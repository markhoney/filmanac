<template>
	<h2 v-if="value.images && value.images.logo">
		<g-link v-if="value.path" :to="value.path" :title="'See details for the movie ' + value.title">
			<g-image :src="value.images.logo" immediate />
		</g-link>
		<g-image v-else :src="value.images.logo" />
	</h2>
	<h2 v-else>
		<g-link v-if="value.path" :to="value.path" :title="'See details for the movie ' + value.title">{{value.title}}</g-link>
		<template v-else>{{value.title}}</template>
		<template v-if="value.year"> (<g-link :to="value.year.path" :title="'See all movies released in ' + value.year.id">{{value.year.id}}</g-link>)</template>
	</h2>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>
