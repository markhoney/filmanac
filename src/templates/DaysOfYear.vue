<template>
	<Fixed v-if="$page.day">
		<h1 class="font-bold text-4xl text-center pb-2 mt-4">
			<g-link
				:to="$page.day.previous.path"
				:title="'Go to ' + $page.day.previous.title"
				class="inline-block font-sans tracking-tighter bg-black bg-opacity-50 pb-2 px-3 rounded-l-lg hover:no-underline hover:bg-opacity-75"
			>&lt;</g-link>
			<span class="inline-block bg-black bg-opacity-25 px-6 pb-2">
				<g-link :to="$page.day.month.path" :title="'See all events in ' + $page.day.month.title">{{$page.day.month.title}}</g-link>
				{{$page.day.day.id}}{{$page.day.day.ordinal}}
			</span>
			<g-link
				:to="$page.day.next.path"
				:title="'Go to ' + $page.day.next.title"
				class="inline-block font-sans tracking-tighter bg-black bg-opacity-50 pb-2 px-3 rounded-r-lg hover:no-underline hover:bg-opacity-75"
			>&gt;</g-link>
		</h1>
		<template v-if="events">
			<event-card v-for="event in events" :key="event.id" :value="event" class="my-4 md:my-8" />
		</template>
		<no-events v-else />
		<div class="text-center text-6xl font-bold tracking-tighter my-8">
			<g-link
				class="bg-black bg-opacity-50 pb-3 px-6 rounded-l-lg hover:no-underline hover:bg-opacity-75 border-r-4 border-gray-600"
				:to="$page.day.previous.path"
				:title="'Go to ' + $page.day.previous.title"
			>&lt;</g-link>
			<g-link
				class="bg-black bg-opacity-50 pb-3 px-6 rounded-r-lg hover:no-underline hover:bg-opacity-75"
				:to="$page.day.next.path"
				:title="'Go to ' + $page.day.next.title"
			>&gt;</g-link>
		</div>
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
	export default {
		components: {EventCard, NoEvents, Loading},
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
