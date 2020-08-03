<template>
	<footer
		class="text-center p-1 bg-grey-lighter dark:bg-grey-darker transition-all duration-500 ease-in-out"
		:class="{'p-4': $store.state.top}"
		>
		<slot />
		Site created by <a href="https://mark.honeychurch.org" target="_blank" rel="noopener" class="font-bold">Mark Honeychurch</a>, with a little help from my friends
	</footer>
</template>
