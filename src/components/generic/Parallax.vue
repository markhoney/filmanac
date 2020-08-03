<template>
	<div ref="container" class="overflow-hidden"> <!-- flex items-center justify-center -->
		<blockquote v-if="title" class="absolute bg-white text-black dark:bg-black dark:text-white bg-opacity-75 w-full mt-40 p-3 px-64 font-serif text-center z-10">
			<p class="font-bold italic text-5xl">{{title}}</p>
		</blockquote>
		<slot />
		<div ref="image" :style="style.image">
			<div ref="element" :style="style.element" class="relative overflow-hidden h-0" style="top: -100%;">
				<div ref="inside" class="absolute top-0 left-0 h-full w-full">
					<g-image
						ref="img"
						:src="src"
						class="absolute z-10"
						style="filter: saturate(0.5) brightness(0.5);"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['src', 'title', 'speed'],
		data() {
			return {
				width: 0,
				height: 0,
				innerHeight: 0,
				scrollFactor: 0,
				factor: 0.5,
				aspectRatio: 9 / 16,
			};
		},
		created() {
			this.parallax();
			window.addEventListener('resize', this.animation);
			window.addEventListener('scroll', this.animation);
		},
		destroyed() {
			window.removeEventListener('resize', this.animation);
			window.removeEventListener('scroll', this.animation);
		},
		computed: {
			offset() {
				return this.scrollFactor * this.height * this.factor;
			},
			compensatedHeight() {
				return this.innerHeight - (this.innerHeight * this.factor);
			},
			style() {
				return {
					image: {height: `${this.compensatedHeight}px`},
					element: {
						transform: `translate3d(0, ${this.offset}px, 0)`,
						paddingTop: `${this.aspectRatio * 100}%`,
					},
				};
			},
		},
		methods: {
			parallax() {
				const containerRect = this.$refs.container.getBoundingClientRect();
				this.width = containerRect.width;
				this.height = containerRect.height;
				this.innerHeight = this.$refs.inside.getBoundingClientRect().height;
				const viewportOffsetTop = containerRect.top;
				const viewportOffsetBottom = window.innerHeight - viewportOffsetTop;
				this.scrollFactor = viewportOffsetBottom / (window.innerHeight + this.height);
			},
			animation() {
				requestAnimationFrame(this.parallax);
			},
		},
	};
</script>
