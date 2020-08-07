<template>
	<ul>
		<li v-for="event in value" :key="event.id">
			<event-line :value="event" />
		</li>
	</ul>
</template>

<script>
	import EventLine from './Line.vue';
	export default {
		components: {EventLine},
		props: ['value'],
	}
</script>
