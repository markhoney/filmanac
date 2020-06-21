<template>
	<nav>
		<ul>
			<li><g-link class="nav__link" to="/">Today</g-link></li>
			<li>
				<g-link class="nav__link" to="/">Days</g-link>
				<ul style="display: none;">
					<li v-for="month in $static.allMonth.edges" :key="month.node.id">
						{{month.node.id}}
						<ul>
							<li v-for="day in month.node.days" :key="day.day.id">{{day.day.id}}{{day.day.ordinal}}</li>
						</ul>
					</li>
				</ul>
				</li>
			<li><g-link to="/about/">About</g-link></li>
		</ul>
	</nav>
</template>

<static-query>
	query {
		allMonth {
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

<style>

</style>
