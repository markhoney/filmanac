<template>
	<div class="text-center pb-2">
		<g-link
			:to="value.previous.path"
			:title="'See all events for ' + value.previous.title"
			class="pr-2 text-lg"
		>{{value.previous.title}}</g-link>
		<h1 v-if="title" class="inline-block px-6 pb-3" style="min-width: 20rem;">
			<g-link :to="value.month.path" :title="'See all events in ' + value.month.title">{{value.month.title}}</g-link>
			{{value.day.id}}{{value.day.ordinal}}
		</h1>
		<g-link
			:to="value.next.path"
			:title="'See all events for ' + value.next.title"
			class="pl-5 text-lg"
		>{{value.next.title}}</g-link>
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
