<template>
	<nav class="z-40 font-semibold">
		<ul class="h-full">
			<li><dark /></li>
			<li><g-link to="/" title="See all movies for today">Today</g-link></li>
			<li>
				<g-link to="/">Days</g-link>
				<ul class="dark:bg-primary-darker">
					<li v-for="month in $static.months.edges" :key="month.node.id">
						<g-link :to="month.node.path" :title="'See all movies in ' + month.node.title">{{month.node.title}}</g-link>
						<ul class="dark:bg-primary-darker">
							<li v-for="day in month.node.daysofyear" :key="day.day.id"><g-link :to="day.path" :title="`See all movies for ${month.node.title} ${day.day.id}${day.day.ordinal}`">{{day.day.id}}{{day.day.ordinal}}</g-link></li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				Categories
				<ul class="dark:bg-primary-darker">
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
	import Dark from './Dark.vue';
	export default {
		components: {Dark},
		data() {
			return {
				categories: [
					'Genres',
					'Studios',
					'Languages',
					'Countries',
					'Classifications',
					'Years',
					'Released',
					// 'Celebrations',
					// 'Bechdel',
					// 'Scores',
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
		@apply relative float-left p-3;
	}

	nav li:hover {
		@apply bg-tertiary;
	}

	nav > ul li:hover > ul {
		@apply inline;
	}

	nav ul ul {
		@apply bg-white;
	}

	nav li li {
		@apply relative p-2;
	}

	nav > ul > li > ul {
		@apply absolute left-0 hidden w-32;
		top: 2.5rem;
	}

	nav > ul > li > ul > li > ul {
		@apply absolute top-0 hidden;
		columns: 2;
		left: 8rem;
		/* right: -6rem; */
	}

</style>
