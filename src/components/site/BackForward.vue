<template>
	<div class="font-bold text-center pb-2">
		<g-link
			:to="value.previous.path"
			:title="'Go to ' + value.previous.title"
			class="inline-block font-sans tracking-tighter bg-black bg-opacity-50 pb-3 pl-3 pr-5 rounded-l-lg hover:no-underline hover:bg-opacity-75"
		>&lt;</g-link>
		<h1 v-if="title" class="inline-block bg-black bg-opacity-25 px-6 pb-3" style="min-width: 20rem;">
			<g-link :to="value.month.path" :title="'See all events in ' + value.month.title">{{value.month.title}}</g-link>
			{{value.day.id}}{{value.day.ordinal}}
		</h1>
		<g-link
			:to="value.next.path"
			:title="'Go to ' + value.next.title"
			class="inline-block font-sans tracking-tighter bg-black bg-opacity-50 pb-3 pl-5 pr-3 rounded-r-lg hover:no-underline hover:bg-opacity-75"
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
