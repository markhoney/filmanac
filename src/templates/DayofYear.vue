<template>
	<Layout :title="title">
		<Day :day="this.$page.dayofYear" />
	</Layout>
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
				path
			}
			next {
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
				month {
					title
				}
				day {
					id
					ordinal
				}
				refreshments
				mention
				movie {
					id
					path
					title
					plot
					year
					score
					votes
					runtime
					awards
					images {
						poster {
							path
						}
					}
					rated {
						title
						path
					}
					studios {
						title
						icon
						path
					}
					genres {
						title
						icon
						path
					}
					countries {
						title
						icon
						path
					}
					languages {
						title
						icon
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
