<template>
	<Fixed v-if="$page.day" class="flex flex-col">
		<back-forward :value="$page.day" title class="text-4xl mt-6" />
		<template v-if="events" class="flex-grow">
			<event-card v-for="event in events" :key="event.id" :value="event" class="my-4 md:my-8" />
		</template>
		<no-events v-else class="flex-grow" />
		<back-forward :value="$page.day" class="text-6xl" />
	</Fixed>
	<Fixed v-else>
		<Loading />
	</Fixed>
</template>

<page-query>
	query($id: ID!) {
		day: daysOfYear(id: $id) {
			month {
				title
				path
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
					path
				}
				dayofyear {
					month {
						title
						path
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
					year {
						id
						path
					}
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
	import EventCard from '@/components/event/Card.vue';
	import NoEvents from '@/components/event/None.vue';
	import Loading from '@/components/day/Loading.vue';
	import BackForward from '@/components/site/BackForward.vue';
	export default {
		components: {EventCard, NoEvents, Loading, BackForward},
		data() {
			return {
				bottom: true,
			};
		},
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			date() {return this.$page.day.month.title + ' ' + this.$page.day.day.id + this.$page.day.day.ordinal},
			title() {return this.date + ' Movies'},
			events() {return this.$page.day.events.sort((a, b) => b.movie.votes - a.movie.votes)},
		},
		methods: {
			navigate(key) {
				if (key.code === 'ArrowLeft') this.$router.push({path: this.$page.day.previous.path});
				else if (key.code === 'ArrowRight') this.$router.push({path: this.$page.day.next.path}); // || (key.code === 'Space' && this.bottom)
			},
			scroll () {
				this.bottom = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
			}
		},
		mounted() {
			window.addEventListener('keydown', this.navigate);
			// if (document.body.scrollHeight > document.body.clientHeight) this.bottom = false;
			// window.addEventListener('scroll', this.scroll);
		}
	};
</script>
