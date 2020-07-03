<template>
	<span>
		<b>
			<g-link :to="event.dayofyear.path">{{event.dayofyear.month.title}} {{event.dayofyear.day.id}}{{event.dayofyear.day.ordinal}}</g-link>{{event.year && ', ' + event.year.id}}
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
