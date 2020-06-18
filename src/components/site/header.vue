<template>
	<header class="sm:flex justify-center light:bg-red-400 p-4">
		<h1 class="flex-auto text-4xl font-sans font-bold"><g-link to="/">{{title || $static.metadata.siteName}}</g-link></h1>
		<nav class="flex-none flex mt-3">
			<ul class="flex-none">
				<li class="inline mr-6"><g-link class="nav__link" to="/">Today</g-link></li>
				<li class="inline mr-6">
					<g-link class="nav__link" to="/">Days</g-link>
					<ul style="display: none;">
						<li v-for="month in $static.allMonth.edges" :key="month.node.id">
							{{month.node.id}}
							<ul>
								<li v-for="day in month.node.days" :key="day.node.id">{{day.node.id}}</li>
							</ul>
						</li>
					</ul>
					</li>
				<li class="inline mr-6"><g-link class="nav__link" to="/about/">About</g-link></li>
			</ul>
			<Search class="flex-none" />
		</nav>
	</header>
</template>

<static-query>
	query {
		metadata {
			siteName
		}
		allMonth {
			edges {
				node {
					id
				}
			}
		}
	}
</static-query>

<script>
	import Search from '@/components/generic/Search.vue';
	export default {
		components: {Search},
		props: ['title'],
	}
</script>
