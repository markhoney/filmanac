<template>
	<g-link
		:to="value.path"
		:title="'See all movies classified ' + value.title"
		class="px-4 border-4 rounded-lg font-serif font-bold uppercase whitespace-no-wrap hover:no-underline"
		style="font-family: Garamond, 'Times New Roman', serif;"
	>
		{{value.title}}
	</g-link>
</template>

<script>
	export default {
		props: ['value'],
	};
</script>
