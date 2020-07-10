<template>
	<span>
		<b>
			<g-link :to="event.dayofyear.path">{{event.dayofyear.month.title}} {{event.dayofyear.day.id}}{{event.dayofyear.day.ordinal}}</g-link>{{event.year && ', '}}
			<g-link v-if="event.year" :to="event.year.path">{{event.year.id}}</g-link>
		</b>
		{{separator}}
		{{event.title}}
	</span>
</template>

<script>
	export default {
		props: ['event', 'separator'],
	}
</script>
