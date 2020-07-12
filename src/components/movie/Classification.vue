<template>
	<g-link
		:to="value.path"
		:title="'See all movies classified ' + value.title"
		style="font-family: Garamond, 'Times New Roman', serif;"
		class="m-2 px-1 border-4 rounded-lg font-serif font-bold uppercase whitespace-no-wrap"
	>
		{{value.title}}
	</g-link>
</template>

<script>
	export default {
		props: ['value'],
	};
</script>
