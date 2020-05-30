<template>
	<Day :day="this.$page.dayofYear" />
</template>

<page-query>
	query ($id: ID!) {
		dayofYear(id: $id) {
			month {
				id
				title
			}
			day {
				id
				ordinal
			}
			previous
			next
			belongsTo {
				edges {
					node {
						... on Event {
							id
							title
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
								directors
								actors
								year
								rating
								runtime
								actors
								awards
								images {
									poster {
										path
									}
								}
								rated {
									id
									title
								}
								studios {
									id
									title
									icon
								}
								genres {
									id
									title
									icon
								}
							countries {
								id
								title
								map
							}
							languages {
								id
								title
								country {
									id
									flag
								}
							}
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
			date() {return this.$page.dayofYear.month.title + ' ' + this.$page.dayofYear.day.id + this.$page.dayofYear.day.ordinal},
		},
	};
</script>
