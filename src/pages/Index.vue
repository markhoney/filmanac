<template>
	<section>
		<day :value="this.today" />
		</section>
</template>

<script>
	import Day from '@/components/day/EventCards.vue';
	export default {
		components: {Day},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		data () {
			return {
				now: new Date(),
				frontend: false,
				title: "Today's Movies",
				months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			};
		},
		created () {
			setInterval(() => this.now = new Date, 1000 * 60);
		},
		mounted () {
			if (window) this.frontend = true;
		},
		computed: {
			// month() {return this.now.getMonth() + 1},
			month() {return this.months[this.now.getMonth()].toLowerCase()},
			day() {return this.now.getDate()},
			dev() {return !!process.env.TheMovieDBKey},
		},
		asyncComputed: {
			async today() {
				if (this.frontend) {
					const month = this.months[this.now.getMonth()].toLowerCase();
					const day = this.now.getDate();
					const results = await fetch(`/assets/data/${month}/${day}/index.json`);
					try {
						const json = await results.json();
						return json.data.days.edges[0].node;
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
