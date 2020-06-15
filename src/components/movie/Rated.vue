<template>
	<g-link :to="to" style="font-family: Garamond, 'Times New Roman', serif;" class="m-2 px-1 border-4 rounded-lg font-serif font-bold uppercase">
		<slot />
	</g-link>
</template>

<script>
	export default {
		props: ['to'],
	};
</script>
