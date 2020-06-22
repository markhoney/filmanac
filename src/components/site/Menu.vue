<template>
	<nav class="mt-3">
		<ul>
			<li class="group">
				<g-link to="/days">Days</g-link>
				<ul class="hidden absolute group-hover:block p-2 bg-black bg-opacity-50">
					<li v-for="month in $static.allMonth.edges" :key="month.node.id" class="group p-1">
						<g-link :to="month.node.path">{{month.node.title}}</g-link>
						<ul class="hidden absolute">
							<li v-for="day in month.node.days" :key="day.day.id"><g-link :to="day.path">{{day.day.id}}{{day.day.ordinal}}</g-link></li>
						</ul>
					</li>
				</ul>
				</li>
			<li><g-link to="/">Today</g-link></li>
			<li><g-link to="/about/">About</g-link></li>
		</ul>
	</nav>
</template>

<static-query>
	query {
		allMonth(sortBy: "id", order: ASC) {
			edges {
				node {
					id
					path
					title
					days {
						id
						path
						day {
							id
							ordinal
						}
					}
				}
			}
		}
	}
</static-query>

<script>
	export default {
		data: () => ({
			menu: {

			}
		}),
	}
</script>

<style scoped lang="postcss">
	nav > ul > li {
		@apply inline mr-6;
	}

	/* li:hover > ul {
		display: block;
	}

	ul:hover {
		display: block;
	} */

</style>
