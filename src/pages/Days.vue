<template>
	<Fixed title="Days of the Year">
		<ul>
			<li v-for="month in $page.allMonths.edges" :key="month.node.id">
				<h2 class="text-4xl border-b-2 border-white"><g-link :to="month.node.path" :title="'See all movies in ' + month.node.title">{{month.node.title}}</g-link></h2>
				<ul>
					<li v-for="day in month.node.daysofyear" :key="day.id" class="inline-block">
						<h3>
							<g-link :to="day.path" :title="'See all movies for the ' + day.day.id + day.day.ordinal + ' of ' + month.node.title">
								{{day.day.id}}{{day.day.ordinal}}</g-link><template v-if="day.id !== month.node.daysofyear.slice(-1)[0].id">,&nbsp;</template>
						</h3>
					</li>
				</ul>
			</li>
		</ul>
	</Fixed>
</template>

<page-query>
	{
		allMonths(sortBy: "number", order: ASC) {
			edges {
				node {
					id
					title
					path
					daysofyear {
						id
						title
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
</page-query>

<script>
	export default {

	}
</script>

<style>

</style>
