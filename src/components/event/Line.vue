<template>
	<span>
		<b>
			<g-link :to="event.dayofyear.path" :title="'See all events on ' + date">{{date}}</g-link>{{event.year && ', '}}
			<g-link v-if="event.year" :to="event.year.path" :title="'See all events in ' + event.year.id">{{event.year.id}}</g-link>
		</b>
		{{separator}}
		{{event.title}}
	</span>
</template>

<script>
	export default {
		props: ['event', 'separator'],
		computed: {
			date() {return this.event.dayofyear.month.title + ' ' + this.event.dayofyear.day.id + this.event.dayofyear.day.ordinal},
		},
	}
</script>
