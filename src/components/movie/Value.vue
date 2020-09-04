<template>
	<div :title="value + '%'" class="ml-4 font-black inline-block" :style="{color: colour || '#38A169'}">
		<span v-for="i in scale" :key="i" class="mx-1" :class="{'opacity-25': i > dollars}">$</span>
		<span v-if="numeric" class="ml-5 text-3xl text-grey-lighter">{{value}}%</span>
	</div>
</template>

<script>
	export default {
		title: "ValueForMoney",
		props: {
			value: Number,
			scale: Number,
			colour: String,
			numeric: Boolean,
		},
		computed: {
			dollars() {
				const dollars = Math.floor((this.value / 100) * (this.scale + 1));
				if (dollars > this.scale) return this.scale;
				if (dollars < 0) return 0;
				return dollars;
			},
			undollars() {
				return this.scale - dollars;
			},
		},
	};
</script>

<style scoped>
</style>
