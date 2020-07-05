<template>
	<Fixed>
		<Day :day="this.$page.dayofYear" />
	</Fixed>
</template>

<page-query>
	query ($id: ID!) {
		dayofYear(id: $id) {
			month {
				title
			}
			day {
				id
				ordinal
			}
			previous {
				title
				path
			}
			next {
				title
				path
			}
			events {
				id
				title
				info {
					wikipedia {
						url
					}
				}
				year {
					id
				}
				dayofyear {
					month {
						title
					}
					day {
						id
						ordinal
					}
				}
				refreshments
				mention
				movie {
					id
					path
					title
					plot
					year
					score {
						id
					}
					votes
					runtime
					awards
					images {
						poster (width: 200, height: 300, quality: 80)
					}
					classification {
						title
						path
					}
					studios {
						title
						image
						path
					}
					genres {
						title
						image
						path
					}
					countries {
						title
						image
						path
					}
					languages {
						title
						image
						path
					}
				}
			}
		}
	}
</page-query>

<script>
	import Day from '@/components/day/EventCards.vue';
	export default {
		components: {Day},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			date() {return this.$page.dayofYear.month.title + ' ' + this.$page.dayofYear.day.id + this.$page.dayofYear.day.ordinal},
			title() {return this.date + ' Movies'},
		},
	};
</script>
