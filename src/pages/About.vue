<template>
	<Fixed>
		<h2>About</h2>
		<p>Have you ever spotted a date mentioned in a movie, or wondered when historical events in movies actually took place? Wouldn't it be cool if you could watch a movie on the same date the events in it occurred?</p>
		<p>Have you ever arrived home after a long day at work, sat down in front of the TV to relax and unwind, and then found that you can't choose a movie to watch? With all the streaming options available these days there's so much choice, maybe you just want someone to make the decision for you.</p>
		<p>Well, fret no longer. For every day of the year, this website suggests movies that you can watch. What makes this site interesting is that it's not just picking random movies. Each suggestion is in someone connected to the day it's connected to.</p>
		<ul>
			<li>It might be that a movie this site suggests is based on historical events, and an event in the movie happened on the day in question.</li>
			<li>It may be a fictional movie, but one which mentions real dates. Maybe one that happens on a single day.</li>
			<li>It could be that there's a day of the year where that movie is celebrated, such as Top Gun Day (13th May), Back to the Future Day (21st October) or Blade Runner Day (1st November).</li>
			<li>Or it could just be that the day's a special day, and there's an obvious movie or two for that day, like Pi or The Life of Pi on Pi Day (March 14th) or Pirates of the Caribbean on Talk Like a Pirate Day (September 19th)</li>
		</ul>
		<h2>Stats</h2>
		<p>This database contains {{stat('events')}} events, from {{stat('movies')}} movies. These events cover {{stat('days')}} days of the year, and the events occurred in {{stat('years')}} different years. The movies were made in {{stat('countries')}} countries, have {{stat('languages')}} spoken (or signed) languages and were made by {{stat('studios')}} different movie studios.
		<h2>History</h2>
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

<style scoped lang="postcss">
	h2 {
		@apply text-4xl;
	}
	p {
		@apply m-3;
	}
</style>
