<template>
	<div class="font-bold text-center pb-2">
		<g-link
			:to="value.previous.path"
			:title="'Go to ' + value.previous.title"
			class="arrow pr-5 rounded-l-lg"
		>&lt;</g-link>
		<h1 v-if="title" class="inline-block bg-secondary-light bg-opacity-50 px-6 pb-3" style="min-width: 20rem;">
			<g-link :to="value.month.path" :title="'See all events in ' + value.month.title">{{value.month.title}}</g-link>
			{{value.day.id}}{{value.day.ordinal}}
		</h1>
		<g-link
			:to="value.next.path"
			:title="'Go to ' + value.next.title"
			class="arrow pl-5 rounded-r-lg"
		>&gt;</g-link>
	</div>
</template>

<script>
	export default {
		props: {
			value: Object,
			title: Boolean,
		},
	};
</script>

<style scoped lang="postcss">
	.arrow {
		@apply inline-block font-sans tracking-tighter bg-secondary-light bg-opacity-75 p-3 pt-0;
	}
	.arrow:hover {
		@apply no-underline bg-opacity-100;
	}
</style>
