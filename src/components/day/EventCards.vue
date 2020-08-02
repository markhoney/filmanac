<template>
	<section v-if="value">
		<h1 class="font-bold text-4xl text-center">
			<g-link :to="value.previous.path" :title="value.previous.title">🠰</g-link>&nbsp;
			<span class="inline-block"><g-link :to="value.month.path" :title="'See all events in ' + value.month.title">{{value.month.title}}</g-link> {{value.day.id}}{{value.day.ordinal}}</span>&nbsp;
			<g-link :to="value.next.path" :title="value.next.title">🠲</g-link>
		</h1>
		<template v-if="events">
			<Event v-for="event in events" :key="event.id" :value="event" class="my-4 md:my-8" />
		</template>
		<NoEvents v-else />
		<div class="text-center text-6xl font-bold">
			<g-link :to="value.previous.path" :title="value.previous.title">
				<button class="mr-8 px-2">
					🠰
				</button>
			</g-link>
			<g-link :to="value.next.path" :title="value.next.title">
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
		props: ['value'],
		data() {
			return {
				bottom: true,
			};
		},
		computed: {
			date() {return this.value.month.title + ' ' + this.value.day.id + this.value.day.ordinal},
			events() {return this.value.events.sort((a, b) => b.movie.votes - a.movie.votes)},
		},
		methods: {
			navigate(key) {
				if (key.code === 'ArrowLeft' && this.value) this.$router.push({path: this.value.previous.path});
				else if (key.code === 'ArrowRight' && this.value) this.$router.push({path: this.value.next.path}); // || (key.code === 'Space' && this.bottom)
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
