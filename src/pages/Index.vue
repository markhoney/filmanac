<template>
	<Layout>
		<Day :day="this.today" />
	</Layout>
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
				mounted: false,
				frontend: false,
				title: "Today's Movies",
			};
		},
		created () {
			setInterval(() => this.now = new Date, 1000 * 60);
		},
		mounted () {
			if (window) this.frontend = true;
			this.mounted = true;
		},
		computed: {
			month() {return this.now.getMonth() + 1},
			day() {return this.now.getDate()},
			date() {return this.day.month_full + ' ' + this.day.day_ordinal},
		},
		asyncComputed: {
			async today() {
				if (this.mounted) {
					if (this.frontend) {
						this.$router.push({path: `/${this.month}/${this.day}/`});
					} else {
						const results = await fetch(`/assets/data/${this.month}/${this.day}/index.json`);
						try {
							const json = await results.json();
							return json.data.days.edges[0].node;
						} catch(e) {
							this.$router.push({path: `/${this.month}/${this.day}/`});
						}
					}
				}
				return null;
			},
		},
	};
</script>
