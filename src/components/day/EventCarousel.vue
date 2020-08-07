<template>
	<section v-if="day">
		<h1 class="font-bold text-4xl text-center">
			<g-link :to="value.previous.path" :title="value.previous.title">⇦</g-link>&nbsp;
			<span class="inline-block">{{date}}</span>&nbsp;
			<g-link :to="value.next.path" :title="value.next.title">⇨</g-link>
		</h1>
		<carousel-3d v-if="value.events" controlsVisible :count="value.events.length" height="300" width="800">
			<slide v-for="(event, index) in events" :key="event.id" :index="index">
				<Event :value="event" />
			</slide>
		</carousel-3d>
		<NoEvents v-else />
		<div class="text-center text-6xl font-bold">
			<g-link :to="value.previous.path" :title="value.previous.title">
				<button class="mr-8 px-2">
					⇦
				</button>
			</g-link>
			<g-link :to="value.next.path" :title="value.next.title">
				<button class="mr-8 px-2">
					⇨
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
	import {Carousel3d, Slide} from 'vue-carousel-3d';
	export default {
		components: {Event, NoEvents, Loading, Carousel3d, Slide},
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
				if (key.code === 'ArrowLeft') this.$router.push({path: this.value.previous.path});
				else if (key.code === 'ArrowRight') this.$router.push({path: this.value.next.path}); // || (key.code === 'Space' && this.bottom)
			},
			scroll () {
				this.bottom = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
			}
		},
		created() {
			window.addEventListener('keydown', this.navigate);
		},
		destroyed() {
			window.removeEventListener('keydown', this.navigate);
		},
	};
</script>
