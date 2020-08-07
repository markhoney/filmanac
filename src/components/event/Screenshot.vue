<template>
	<div>
		<g-image :src="value" class="h-full w-8 object-cover object-right hover:w-full" />
	</div>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>
