<template>
	<div>
		<parallax :src="fanart[0]" title="About" class="mb-16 h-64" />
		<p>
			Have you ever spotted a date mentioned in a movie, or wondered when historical events in movies actually took place?
			Wouldn't it be cool if you could watch a movie on the same date the events in it occurred?
		</p>
		<p>
			Maybe you've arrived home after a long day at work, sat down in front of the TV to relax and unwind, and found that you can't choose a movie to watch.
			With all the streaming options available these days there's so much choice, maybe you just want someone to make the decision for you.
		</p>
		<p>
			Well, fret no longer. For every day of the year, this website suggests movies that you can watch.
			What makes this site interesting is that it's not just picking random movies. Each suggestion is in some way connected to the day it's connected to.
		</p>
		<ul class="list-disc">
			<li>It might be that a movie this site suggests is based on historical events, and an event in the movie happened on the day in question.</li>
			<li>It may be a fictional movie, but one which mentions real dates. Maybe one that happens on a single day.</li>
			<li>
				It could be that there's a day of the year where that movie is celebrated, such as
				<g-link to="/movie/tt0092099">Top Gun</g-link> Day (<g-link to="/may/13">13th May</g-link>),
				<g-link to="/movie/tt0088763">Back to the Future</g-link> Day (<g-link to="/october/21">21st October</g-link>) or
				<g-link to="/movie/tt0083658">Blade Runner</g-link> Day (<g-link to="/november/1">1st November</g-link>).
			</li>
			<li>
				Or it could just be that the day's a special day, and there's an obvious movie or two for that day, like
				<g-link to="/movie/tt0138704">Pi</g-link> or
				<g-link to="/movie/tt0454876">Life of Pi</g-link> on
				Pi Day (<g-link to="/march/14">March 14th</g-link>), or
				<g-link to="/movie/tt0325980">Pirates of the Caribbean</g-link> on
				Talk Like a Pirate Day (<g-link to="/september/19">September 19th</g-link>)
			</li>
		</ul>
		<parallax :src="fanart[1]" title="Stats" class="mt-24 mb-16 h-64" />
		<p>
			This database contains <b>{{stat('events')}}</b> events from <b>{{stat('movies')}}</b> movies.
			These events cover <g-link to="/days">{{stat('days')}}</g-link> days of the year,
			and the events occurred in <g-link to="/years">{{stat('years')}}</g-link> different years.
			The movies were made in <g-link to="/countries">{{stat('countries')}}</g-link> countries,
			by <g-link to="/studios">{{stat('studios')}}</g-link> different movie studios,
			have <g-link to="/languages">{{stat('languages')}}</g-link> spoken (or signed) languages
			and were released in <g-link to="/released">{{stat('releaseyears')}}</g-link> different years.
		</p>
		<div class="stats">
			<p><span>{{stat('events')}}</span>Events</p>
			<p><span>{{stat('movies')}}</span>Movies</p>
			<p><g-link to="/days">{{stat('days')}}</g-link>Days of the Year</p>
			<p><g-link to="/years">{{stat('years')}}</g-link>Event Years</p>
			<p><g-link to="/countries">{{stat('countries')}}</g-link>Countries</p>
			<p><g-link to="/studios">{{stat('studios')}}</g-link>Studios</p>
			<p><g-link to="/languages">{{stat('languages')}}</g-link>Languages</p>
			<p><g-link to="/released">{{stat('releaseyears')}}</g-link>Movie Release Years</p>
		</div>
		<parallax :src="fanart[2]" title="History" class="mt-24 mb-16 h-64" />
		<p>
			The idea for this website came about when a friend watched <g-link to="/movie/tt0367594">Charlie and the Chocolate Factory</g-link> on the First of February,
			and spotted that the visit to the chocolate factory happens on <g-link to="/february/1">February the first</g-link>.
			When he realised that the next day, <g-link to="/february/2">February the second</g-link>, was <g-link to="/movie/tt0107048">Groundhog Day</g-link>,
			he thought it was a nice coincidence.
		</p>
		<p>
			When I was told this story a few days later, we both sat there and thought of a few more movies that are related to a particular day of the year.
			Some of the first movies we came up with were
			<g-link to="/movie/tt0116629">Independence Day</g-link>,
			<g-link to="/movie/tt0058777">Zulu</g-link>,
			<g-link to="/movie/tt0077651">Halloween</g-link> and
			<g-link to="/movie/tt0095016">Die Hard</g-link>.
			Of course, it seemed prudent to start adding these movies to a spreadsheet.
		</p>
		<p>
			As the spreadsheet started growing, I realised that it would be nice to have a website where others could see the list.
			So I figured I'd try out <a href="https://gridsome.org/" target="_blank" rel="noopener">Gridsome</a>,
			a nice Vue based static site generator that uses <a href="https://graphql.org/" target="_blank" rel="noopener">GraphQL</a> as a data layer.
			I'm a big fan of shiny new JavaScript technologies, and a <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a>/GraphQL solution seemed perfect.
			I've also used <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>, a utility-first CSS library, to make things look pretty.
		</p>
		<parallax :src="fanart[3]" title="Metrics" class="mt-24 mb-16 h-64" />
		<h3 id="stars">Stars</h3>
		<p>
			The star rating on this website is based on
			<a href="https://www.imdb.com/" target="_blank" rel="noopener">IMDB</a> and
			<a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TheMovieDB</a> scores,
			and takes into account that only very bad movies score below 40% (and not many of those reach below 30%), and very few movies score higher than 80%.
		</p>
		<div class="scores">
			<p><score :percent="35" :stars="5" />0% - 40%</p>
			<p><score :percent="45" :stars="5" />40% - 50%</p>
			<p><score :percent="55" :stars="5" />50% - 60%</p>
			<p><score :percent="65" :stars="5" />60% - 70%</p>
			<p><score :percent="75" :stars="5" />70% - 80%</p>
			<p><score :percent="85" :stars="5" />80% - 100%</p>
		</div>
		<h3 id="bechdel">Bechdel Score</h3>
		<p>
			The Bechdel score uses the popular <a href="https://en.wikipedia.org/wiki/Bechdel_test" target="_blank" rel="noopener">Bechdel Test</a>
			to measure how well represented women are in a movie.
			The bar for scoring is fairly low, but it's surprising how many movies don't manage to score the full three points.
			Here's are the three levels of Bechdel scores:
		</p>
		<p><bechdel :value="0" class="mr-2" />The movie does not have at least two women in it</p>
		<p><bechdel :value="1" class="mr-2" />The movie has at least two women in it</p>
		<p><bechdel :value="2" class="mr-2" />The movie has at least two women in it who talk to each other</p>
		<p><bechdel :value="3" class="mr-2" />The movie has at least two women in it who talk to each other about something other than a man</p>
		<p>
			Bechdel results are scraped from the <a href="http://bechdeltest.com/" target="_blank" rel="noopener">Bechdel Test website</a>,
			so if you want to see a Bechdel score for a movie on this site that's missing one, watch the movie, work out its score and add it to the site's API.
			When the next build of this website is run, the score will be added.
		</p>
		<h3 id="value">Value for Money</h3>
		<p>Coming soon...</p>
		<parallax :src="fanart[4]" class="mt-32 h-64" />
	</div>
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
		allMovies(limit: 20, skip: 500) {
			edges {
				node {
					images {
						fanart
					}
				}
			}
		}

	}
</page-query>

<script>
	import Parallax from '@/components/generic/Parallax.vue';
	import Score from '@/components/movie/Score.vue';
	import Bechdel from '@/components/movie/Bechdel.vue';
	export default {
		metaInfo: {
			title: 'About'
		},
		components: {
			Parallax,
			Score,
			Bechdel,
		},
		computed: {
			title() {return 'Movies classified ' + this.$page.classification.title},
			fanart() {
				return this.$page.allMovies.edges.filter((edge) => edge.node.images.fanart).map((edge) => edge.node.images.fanart);
			},
		},
		methods: {
			stat(name) {
				const stat = this.$page.allStats.edges.find((stat) => stat.node.id === name);
				if (stat) return stat.node.value;
			},
		},
	};
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
	p, ul, ol, dl, h2, h3, .stats, .scores {
		@apply m-4 max-w-screen-xl mx-auto px-4;
	}
	ul, ol {
		@apply pl-16;
	}
	.scores, .stats {
		@apply flex flex-wrap text-center;
	}
	.stats span, .stats a {
		@apply block text-3xl;
	}
	/* dt::after {
		content: ":";
	} */
</style>
