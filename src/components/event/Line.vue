<template>
	<span>
		<b>
			<g-link :to="event.dayofyear && event.dayofyear.path">{{event.month.title}} {{event.day.id}}{{event.day.ordinal}}</g-link>{{event.year && ', ' + event.year.id}}
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
