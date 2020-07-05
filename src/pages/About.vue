<template>
	<Fixed>
		<h2 class="text-4xl">Stats</h2>
		<p>This database contains {{stat('events')}} events, from {{stat('movies')}} movies. These events cover {{stat('days')}} days of the year, and the events occurred in {{stat('years')}} different years. {{366 - stat('days')}} days unfortunately still have no movie events connected to them. The movies were made in {{stat('countries')}} countries, have {{stat('languages')}} spoken (or signed) languages and were made by {{stat('studios')}} different movie studios.
		<h2 class="text-4xl">History</h2>
		<p>The idea for this website came about a friend watched <g-link to="/tt0367594">Charlie and the Chocolate Factory</g-link> on the First of February, and spotted that the visit to the chocolate factory happens on February the first. When he realised that the next day, February the second, was <g-link to="/tt0107048">Groundhog Day</g-link>, he thought it was a nice coincidence.</p>
		<p>When my friend told me this story a few days later, we sat there and thought of a few more movies that are related to a particular day of the year. Some of the first movies we came up with were <g-link to="/tt0116629">Independence Day</g-link>, <g-link to="/tt0058777">Zulu</g-link>, <g-link to="/tt0077651">Halloween</g-link> and <g-link to="/tt0095016">Die Hard</g-link>. Of course, it seemed prudent to start adding these movies to a spreadsheet.</p>
		<p>As the spreadsheet started growing, I realised that it would be nice to have a website where others could see the list. So I figured I'd try out Gridsome, a nice Vue based static site generator that uses GraphQL as a data layer. I'm a big fan of shiny new JavaScript technologies, and a Vue/GraphQL solution seemed perfect. I've also used Tailwind CSS, a utility-first CSS library, to make things look nice.</p>
	</Fixed>
</template>

<page-query>
	{
		allStats {
			edges {
				node {
					id
					value
				}
			}
		}
	}
</page-query>


<script>
export default {
	metaInfo: {
		title: 'About this website'
	},
	methods: {
		stat(name) {
			const stat = this.$page.allStats.edges.find((stat) => stat.node.id === name);
			if (stat) return stat.node.value;
		}
	}
}
</script>
