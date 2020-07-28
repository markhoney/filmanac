<template>
	<div ref="imgParent" class="flex items-center justify-center w-full overflow-hidden" @scroll="parallax"> <!-- bg-fixed bg-center bg-cover bg-no-repeat :style="`background-image: url('${src}');`" -->
		<g-image
			ref="img"
			:src="src"
			class="absolute z-0 w-full object-cover"
			:class="styles"
			style="height: 20rem; filter: saturate(0.3) brightness(0.3);"
		/>
		<blockquote v-if="title" class="bg-black bg-opacity-75 font-serif mx-4 mt-56 p-4 px-64 text-center text-white z-10">
			<p class="font-bold italic text-3xl">{{title}}</p>
		</blockquote>
	</div>
</template>

<script>
	export default {
		props: ['src', 'title', 'speed'],
		data() {
			return {
				height: 0,
				scrollFactor: 0,
				width: 0,
				styles: {
					top: '0%',
					transform: 'translate(-50%, -0%)',
				},
			};
		},
		created () {
			window.addEventListener('scroll', this.parallax);
		},
		destroyed () {
			window.removeEventListener('scroll', this.parallax);
		},
		methods: {
			parallax(event) {
				const speed = this.speed || 0.5;
				const imgY = this.$refs.imgParent.offsetTop;
				const winY = this.$refs.img.scrollTop;
				const winH = this.$refs.img.height;
				// const parentH = this.$refs.imgParent.innerHeight || ;
				const parentH = this.$refs.img.clientHeight;
				console.log(this.$refs);
				console.log(imgY, winY, winH, parentH);
				const winBottom = winY + winH;
				// if (winBottom > imgY && winY < imgY + parentH) {
					const imgPercent = ((((winBottom - imgY) * speed) / (winH + parentH)) * 100) + (50 - (speed * 50));
					this.styles.top = imgPercent + '%';
					this.styles.transform = 'translate(-50%, -' + imgPercent + '%)';
					console.log(this.src.src, this.styles.top, this.styles.transform);
				// }
				/* this.$refs.img.css({
					top: imgPercent + '%',
					transform: 'translate(-50%, -' + imgPercent + '%)'
				}); */
			},
		},
	};
</script>
