<template>
	<section v-if="day">
		<h1 class="font-bold text-4xl text-center">
			<g-link :to="day.previous.path" :title="day.previous.title">🠰</g-link>&nbsp;
			<span class="inline-block"><g-link :to="day.month.path" :title="'See all events in ' + day.month.title">{{day.month.title}}</g-link> {{day.day.id}}{{day.day.ordinal}}</span>&nbsp;
			<g-link :to="day.next.path" :title="day.next.title">🠲</g-link>
		</h1>
		<template v-if="day.events">
			<Event v-for="event in events" :key="event.id" :event="event" class="my-4 md:my-8" />
		</template>
		<NoEvents v-else />
		<div class="text-center text-6xl font-bold">
			<g-link :to="day.previous.path" :title="day.previous.title">
				<button class="mr-8 px-2">
					🠰
				</button>
			</g-link>
			<g-link :to="day.next.path" :title="day.next.title">
				<button class="mr-8 px-2">
					🠲
				</button>
			</g-link>
		</div>
	</section>
	<section v-else>
		<Loading />
	</section>
</template>

<script>
	import Event from '@/components/event/Card.vue';
	import NoEvents from '@/components/event/None.vue';
	import Loading from '@/components/day/Loading.vue';
	export default {
		components: {Event, NoEvents, Loading},
		props: ['day'],
		data() {
			return {
				bottom: true,
			};
		},
		computed: {
			date() {return this.day.month.title + ' ' + this.day.day.id + this.day.day.ordinal},
			events() {return this.day.events.sort((a, b) => b.movie.votes - a.movie.votes)},
		},
		methods: {
			navigate(key) {
				if (key.code === 'ArrowLeft') this.$router.push({path: this.day.previous.path});
				else if (key.code === 'ArrowRight') this.$router.push({path: this.day.next.path}); // || (key.code === 'Space' && this.bottom)
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
