<template>
	<Day :day="this.$page.days.edges[0].node" />
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
	import Day from '@/components/Day.vue';
	export default {
		components: {Day},
		metaInfo() {
			return {
				title: 'Movies for ' + this.date,
			};
		},
		computed: {
			date() {return this.$page.days.edges[0].node.month_full + ' ' + this.$page.days.edges[0].node.day_ordinal},
		},
	};
</script>
