<template>
	<nav class="z-50 font-bold">
		<ul class="h-full">
			<li><g-link to="/" title="See all movies for today">Today</g-link></li>
			<li>
				<g-link to="/">Days</g-link>
				<ul class="bg-white dark:bg-primary-dark">
					<li v-for="month in $static.months.edges" :key="month.node.id">
						<g-link :to="month.node.path" :title="'See all movies in ' + month.node.title">{{month.node.title}}</g-link>
						<ul class="bg-white dark:bg-primary-dark">
							<li v-for="day in month.node.daysofyear" :key="day.day.id"><g-link :to="day.path" :title="`See all movies for ${month.node.title} ${day.day.id}${day.day.ordinal}`">{{day.day.id}}{{day.day.ordinal}}</g-link></li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				Categories
				<ul class="bg-white dark:bg-primary-dark">
					<li v-for="category in categories" :key="category">
						<g-link :to="category.toLowerCase()" :title="`See all ${category} movies`">{{category}}</g-link>
					</li>
				</ul>
			</li>
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

<script>
	export default {
		data() {
			return {
				categories: [
					'Genres',
					'Studios',
					'Languages',
					'Countries',
					'Scores',
					'Classifications',
					// 'Directors',
					// 'Writers',
					// 'Actors',
				],
			};
		},
	};
</script>

<style scoped lang="postcss">
	nav > ul a {
		@apply block;
	}

	nav > ul a:hover {
		@apply no-underline;
	}

	nav > ul > li {
		@apply relative float-left p-2 h-full pt-6;
	}

	nav li:hover {
		@apply bg-secondary-lighter;
	 }

	nav > ul li:hover > ul {
		@apply inline;
	}

	nav li li {
		@apply relative;
		height: 1.6rem;
	}

	nav > ul > li > ul {
		@apply absolute left-0 hidden w-32;
		top: 4rem;
	}

	nav > ul > li > ul > li > ul {
		@apply absolute top-0 hidden w-24;
		right: -6rem;
	}

</style>
