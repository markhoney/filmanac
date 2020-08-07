<template>
	<fixed class="flex flex-col h-full">
		<template v-if="events">
			<div v-if="events.length" class="flex-grow">
				<event-card v-for="event in events" :key="event.id" :value="event" class="my-4 md:my-8" />
			</div>
			<no-events v-else class="flex-grow" />
		</template>
		<loading v-else />
	</fixed>
</template>

<script>
	import Day from '@/components/day/EventCards.vue';
	import Loading from '@/components/day/Loading.vue';
	export default {
		components: {Day, Loading},
		metaInfo() {return {title: this.title}},
		data () {
			return {
				now: new Date(),
				frontend: false,
				title: "Today's Movies",
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			};
		},
		mounted () {
			setInterval(() => this.now = new Date, 1000 * 60);
			if (window) this.frontend = true;
		},
		computed: {
			// month() {return this.now.getMonth() + 1},
			month() {return this.months[this.now.getMonth()].toLowerCase()},
			day() {return this.now.getDate()},
			dev() {return !!process.env.TheMovieDBKey},
		},
		asyncComputed: {
			async events() {
				if (this.frontend) {
					const month = this.months[this.now.getMonth()].toLowerCase();
					const day = this.now.getDate();
					const results = await fetch(`/assets/data/${month}/${day}/index.json`);
					try {
						const json = await results.json();
						return json.data.day;
					} catch(e) {
						// if (!dev) this.$router.push({path: `/${this.month}/${this.day}/`});
						this.$router.push({path: `/${this.month}/${this.day}/`});
					}
				}
				return null;
			},
		},
	};
</script>
