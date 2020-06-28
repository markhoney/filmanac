<template>
	<section>
		<p>Have you ever arrived home after a long day at work, sat down in front of the TV to relax and unwind, and then found that you can't choose a movie to watch? Maybe you want someone to make the decision for you, maybe with all the streaming options available these days there's too much choice.</p>
		<p>Well, fret no longer. For every day of the year, this website suggests movies that you can watch. What makes this site interesting is that it's not just picking random movies. Each suggestion is in someone connected to the day it's connected to.</p>
		<ul>
			<li>It might be that a movie this site suggests is based on historical events, and an event in the movie happened on the day in question.</li>
			<li>It may be a fictional movie, but one which mentions real dates.</li>
			<li>It could be that there's a day of the year where that movie is celebrated, such as Top Gun Day (13th May), Back to the Future Day (21st October) or Blade Runner Day (1st November).</li>
			<li>Or it could just be that the day's a special day, and there's an obvious movie or two for that day, like Pi or The Life of Pi on Pi Day (March 14th) or Pirates of the Caribbean on Talk Like a Pirate Day (September 19th)</li>
		</ul>
		<Day :day="this.today" />
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
