<template>
	<nav class="z-10 font-bold">
		<ul>
			<li>
				<g-link to="/days">Days</g-link>
				<ul>
					<li v-for="month in $static.months.edges" :key="month.node.id">
						<g-link :to="month.node.path">{{month.node.title}}</g-link>
						<ul>
							<li v-for="day in month.node.daysofyear" :key="day.day.id"><g-link :to="day.path">{{day.day.id}}{{day.day.ordinal}}</g-link></li>
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
		months: allMonths(sortBy: "number", order: ASC) {
			edges {
				node {
					id
					path
					title
					daysofyear {
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

<style scoped lang="postcss">
	nav > ul > li {
		@apply relative float-left p-2;
	}

	nav > ul > li:hover {
		@apply bg-primary-light;
	 }

	nav > ul li:hover > ul {
		@apply inline;
	}

	nav > ul a {
		@apply block;
	}

	nav > ul > li > ul {
		@apply absolute left-0 hidden;
		top: 40px;
		width: 150px;
	}

	nav > ul > li > ul > li {
		@apply relative bg-primary-dark;
		height: 25px;
	}

	nav > ul > li > ul > li:hover {
		@apply bg-primary-light;
	}

	nav > ul > li > ul > li > ul {
		@apply absolute top-0 hidden;
		right: -150px;
		width: 150px;
	}

	nav > ul > li > ul > li > ul > li {
		height: 25px;
		@apply bg-primary-dark;
	}

	nav > ul > li > ul > li > ul > li:hover {
		@apply bg-primary-light;
	}

</style>
