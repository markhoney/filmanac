<template>
	<div ref="image" style="height: 20rem;">
		<blockquote
			v-if="title"
			class="absolute bg-white text-black dark:bg-black dark:text-white w-full mt-56 p-3 px-64 font-serif text-center z-10"
			style="--bg-opacity: 0.85;"
		>
			<p class="font-bold italic text-5xl">{{title}}</p>
		</blockquote>
		<slot v-else />
		<g-image
			:src="src"
			class="z-0 w-full object-cover"
			style="height: 20rem; filter: saturate(0.5) brightness(0.5);"
			:style="{objectPosition}"
		/>
	</div>
</template>

<script>
	export default {
		props: ['src', 'title', 'speed'],
		data() {
			return {
				objectPosition: '0 0%',
			};
		},
		mounted() {
			this.parallax();
			window.addEventListener('scroll', this.animation, true);
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.animation);
		},
		methods: {
			parallax() {
				try {
					this.objectPosition = '0 ' + this.$refs.image.getBoundingClientRect().top * 100 / window.innerHeight + '%';
				} catch(e) {}
			},
			animation() {
				requestAnimationFrame(this.parallax);
			},
		},
	};
</script>
