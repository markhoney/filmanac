<template>
	<span class="ml-4 pb-1 px-5 font-bold rounded-md" :class="'bg-' + colours[value]" :title="title">{{value}}</span>
</template>

<script>
	export default {
		props: ['value'],
		data() {
			return {
				levels: [
					'This movie does not have two women in it',
					'This movie has at least two women in it',
					'who talk to each other',
					'about something other than a man'
				],
				colours: [
					'red-600',
					'orange-600',
					'yellow-600',
					'green-600',
				],
			};
		},
		computed: {
			title() {
				if (this.value === 0) return this.levels[0] + '.';
				return this.levels.slice(1, this.value + 1).join(', ') + '.';
			}
		},
	};
</script>
