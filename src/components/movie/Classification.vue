<template>
	<g-link
		:to="value.path"
		:title="'See all movies classified ' + value.title"
		style="font-family: Garamond, 'Times New Roman', serif;"
		class="px-4 border-4 rounded-lg font-serif font-bold uppercase whitespace-no-wrap hover:no-underline"
	>
		{{value.title}}
	</g-link>
</template>

<script>
	export default {
		props: ['value'],
	};
</script>
