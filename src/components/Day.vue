<template>
	<Layout v-if="day">
		<h1 class="font-bold text-4xl">
			<g-link :to="day.previous">&lt;</g-link>
			{{date}}
			<g-link :to="day.next">&gt;</g-link>
		</h1>
		<Event v-for="(event, index) in day.events" :key="index" :event="event" />
		<NoEvents v-if="!day.events.length" />
	</Layout>
	<Layout v-else>
		<Loading />
	</Layout>
</template>

<script>
	import Event from '@/components/EventCard.vue';
	import NoEvents from '@/components/NoEvents.vue';
	import Loading from '@/components/Loading.vue';
	export default {
		components: {Event, NoEvents, Loading},
		props: ['day'],
		computed: {
			date() {return this.day.month_full + ' ' + this.day.day_ordinal},
		},
	};
</script>
