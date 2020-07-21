<template>
	<Fixed>
		<h2>About</h2>
		<p>Have you ever spotted a date mentioned in a movie, or wondered when historical events in movies actually took place? Wouldn't it be cool if you could watch a movie on the same date the events in it occurred?</p>
		<p>Or, imagine you arrive home after a long day at work, sit down in front of the TV to relax and unwind, and then find that you can't choose a movie to watch. With all the streaming options available these days there's so much choice, maybe you just want someone to make the decision for you.</p>
		<p>Well, fret no longer. For every day of the year, this website suggests movies that you can watch. What makes this site interesting is that it's not just picking random movies. Each suggestion is in someone connected to the day it's connected to.</p>
		<ul class="list-disc">
			<li>It might be that a movie this site suggests is based on historical events, and an event in the movie happened on the day in question.</li>
			<li>It may be a fictional movie, but one which mentions real dates. Maybe one that happens on a single day.</li>
			<li>It could be that there's a day of the year where that movie is celebrated, such as <g-link to="/movie/tt0092099">Top Gun</g-link> Day (<g-link to="/may/13">13th May</g-link>), <g-link to="/movie/tt0088763">Back to the Future</g-link> Day (<g-link to="/october/21">21st October</g-link>) or <g-link to="/movie/tt0083658">Blade Runner</g-link> Day (<g-link to="/november/1">1st November</g-link>).</li>
			<li>Or it could just be that the day's a special day, and there's an obvious movie or two for that day, like <g-link to="/movie/tt0138704">Pi</g-link> or <g-link to="/movie/tt0454876">Life of Pi</g-link> on Pi Day (<g-link to="/march/14">March 14th</g-link>) or <g-link to="/movie/tt0325980">Pirates of the Caribbean</g-link> on Talk Like a Pirate Day (<g-link to="/september/19">September 19th</g-link>)</li>
		</ul>
		<h2>Stats</h2>
		<p>This database contains {{stat('events')}} events, from {{stat('movies')}} movies. These events cover {{stat('days')}} days of the year, and the events occurred in {{stat('years')}} different years. The movies were made in {{stat('countries')}} countries, have {{stat('languages')}} spoken (or signed) languages and were made by {{stat('studios')}} different movie studios.
		<h2>History</h2>
		<p>The idea for this website came about a friend watched <g-link to="/tt0367594">Charlie and the Chocolate Factory</g-link> on the First of February, and spotted that the visit to the chocolate factory happens on <g-link to="/february/1">February the first</g-link>. When he realised that the next day, <g-link to="/february/2">February the second</g-link>, was <g-link to="/tt0107048">Groundhog Day</g-link>, he thought it was a nice coincidence.</p>
		<p>When my friend told me this story a few days later, we sat there and thought of a few more movies that are related to a particular day of the year. Some of the first movies we came up with were <g-link to="/tt0116629">Independence Day</g-link>, <g-link to="/tt0058777">Zulu</g-link>, <g-link to="/tt0077651">Halloween</g-link> and <g-link to="/tt0095016">Die Hard</g-link>. Of course, it seemed prudent to start adding these movies to a spreadsheet.</p>
		<p>As the spreadsheet started growing, I realised that it would be nice to have a website where others could see the list. So I figured I'd try out Gridsome, a nice Vue based static site generator that uses GraphQL as a data layer. I'm a big fan of shiny new JavaScript technologies, and a Vue/GraphQL solution seemed perfect. I've also used Tailwind CSS, a utility-first CSS library, to make things look nice.</p>
		<h2>Metrics</h2>
		<h3 id="stars">Stars</h3>
		<p>The star rating on this website is based on IMDB and TheMovieDB scores, and takes into account that only very bad movies score below 40% (and not many reach below 30%), and not many movies score higher than 80%.</p>
		<dl>
			<dt>0% - 40%</dt><dd>0 stars</dd>
			<dt>40% - 50%</dt><dd>1 star</dd>
			<dt>50% - 60%</dt><dd>2 stars</dd>
			<dt>60% - 70%</dt><dd>3 stars</dd>
			<dt>70% - 80%</dt><dd>4 stars</dd>
			<dt>80% - 100%</dt><dd>5 stars</dd>
		</dl>
		<h3 id="bechdel">Bechdel Score</h3>
		<p>The Bechdel score uses the popular <a href="https://en.wikipedia.org/wiki/Bechdel_test" target="_blank">Bechdel Test</a> to measure how well represented women are in a movie. The bar for scoring is fairly low, but it's surprising how many movies don't manage to score the full three points. Here's are the three levels of Bechdel scores:</p>
		<ol class="list-decimal">
			<li>A movie has at least two women in it</li>
			<li>A movie has at least two women in it who talk to each other</li>
			<li>A movie has at least two women in it who talk to each other about something other than a man</li>
		</ol>
		<p>A movie with a Bechdel score of 0 does not even reach the level of having two women in it. This is frequently the case, for example, in older war movies.</p>
		<p>Bechdel results are scraped from the <a href="http://bechdeltest.com/">Bechdel Test website</a>, so if you want to see a Bechdel score for a movie on this site that's missing one, watch the movie, work out its score and add it to the site's API. When the next build of this website is run, the score will be added.</p>
		<h3 id="value">Value for Money</h3>
		<p>Coming soon...</p>
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
		@apply text-4xl ml-2 border-b-2 border-white;
		/* @screen dark {
			@apply border-white;
		} */
	}
	h3 {
		@apply text-2xl ml-2;
	}
	p, ul, ol, dl {
		@apply m-4;
	}
	ul, ol {
		@apply ml-8;
	}
	dt {
		@apply inline-block text-right w-24;
	}
	dd {
		@apply inline ml-3 font-bold;
	}
	dd:after {
		content: '\A';
		white-space: pre;
	}
	/* dt::after {
		content: ":";
	} */
</style>
