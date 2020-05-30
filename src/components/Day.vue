<template>
	<Layout v-if="day">
		<h1 class="font-bold text-4xl">
			<g-link :to="day.previous">&lt;</g-link>
			<span style="width: 400px;"> {{date}} </span>
			<g-link :to="day.next">&gt;</g-link>
		</h1>
		<!--<carousel>
			<slide v-for="(event, index) in day.belongsTo.edges" :key="index" :perPage="1">
				<Event :event="event.node" />
			</slide>
		</carousel>-->
		<Event v-for="(event, index) in day.belongsTo.edges" :key="index" :event="event.node" />
		<NoEvents v-if="!day.belongsTo.edges.length" />
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
			date() {return this.day.month.title + ' ' + this.day.day.id + this.day.day.ordinal},
		},
	};
</script>
