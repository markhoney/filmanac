<template>
	<Fixed v-if="$page.day">
		<h1 class="font-bold text-4xl text-center">
			<g-link :to="$page.day.previous.path" :title="$page.day.previous.title">&lt;-</g-link>&nbsp;
			<span class="inline-block"><g-link :to="$page.day.month.path" :title="'See all events in ' + $page.day.month.title">{{$page.day.month.title}}</g-link> {{$page.day.day.id}}{{$page.day.day.ordinal}}</span>&nbsp;
			<g-link :to="$page.day.next.path" :title="$page.day.next.title">-&gt;</g-link>
		</h1>
		<template v-if="events">
			<Event v-for="event in events" :key="event.id" :event="event" class="my-4 md:my-8" />
		</template>
		<NoEvents v-else />
		<div class="text-center text-6xl font-bold">
			<g-link :to="$page.day.previous.path" :title="$page.day.previous.title">
				<button class="mr-8 px-2">
					&lt;-
				</button>
			</g-link>
			<g-link :to="$page.day.next.path" :title="$page.day.next.title">
				<button class="mr-8 px-2">
					-&gt;
				</button>
			</g-link>
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
	import Event from '@/components/event/Card.vue';
	import NoEvents from '@/components/event/None.vue';
	import Loading from '@/components/day/Loading.vue';
	export default {
		components: {Event, NoEvents, Loading},
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
