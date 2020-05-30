<template>
	<Day :day="this.today" />
</template>

<script>
	import Day from '@/components/Day.vue';
	export default {
		components: {Day},
		metaInfo: {
			title: 'Movies for Today',
		},
		data () {
			return {
				now: new Date(),
				mounted: false,
			};
		},
		created () {
			setInterval(() => this.now = new Date, 1000 * 60);
		},
		mounted () {
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
					const results = await fetch(`/assets/data/${this.month}/${this.day}/index.json`);
					try {
						const json = await results.json();
						return json.data.days.edges[0].node;
					} catch(e) {
						console.log('Data file not found');
					}
				}
				return null;
			},
		},
	};
</script>
