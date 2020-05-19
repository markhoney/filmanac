<template>
	<Layout>
		<h1 class="font-bold text-4xl">
			<g-link :to="day.previous">&lt;</g-link>
			{{date}}
			<g-link :to="day.next">&gt;</g-link>
		</h1>
		<Event v-for="(event, index) in day.events" :key="index" :event="event" />
		<p v-if="!day.events.length">Sorry, there are no movies for today. If you know of a movie that is connected to this date, please let me know by emailing me at <a href="mailto:mark@honeychurch.org">mark@honeychurch.org</a></p>
	</Layout>
</template>

<page-query>
	query days($month: Int, $day: Int) {
		days: allDays(filter: {month: {eq: $month}, day: {eq: $day}}) {
			edges {
				node {
					month
					month_full
					day
					day_ordinal
					previous
					next
					events {
						id
						info {
							wikipedia {
								url
							}
						}
						reason {
							short
							description
						}
						refreshments {
							list
							description
						}
						mention {
							timestamp
							description
						}
						movie {
							id
							title
							plot
							director
							year
							images {
								poster {
									path
								}
							}
							studios {
								id
								name
								icon
							}
							genres {
								id
								name
								icon
							}
							countries {
								id
								name
								icon
							}
							languages {
								id
								name
								icon
							}
						}
					}
				}
			}
		}
	}
</page-query>

<script>
	import Event from '@/components/EventCard.vue';
	export default {
		components: {Event},
		metaInfo() {
			return {
				title: 'Movies for ' + this.date,
			};
		},
		computed: {
			day() {return this.$page.days.edges[0].node},
			date() {return this.day.month_full + ' ' + this.day.day_ordinal},
		},
	};
</script>
