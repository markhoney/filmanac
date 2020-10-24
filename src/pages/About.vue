<template>
	<div class="bg-grey-lightest dark:bg-grey-darkest">
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
		<parallax :src="fanart[1]" title="Data" class="mb-16 h-64" />
		<h3>Sources</h3>
		<p>
			The data has been collected from a variety of sources, including several Wikipedia list pages, the Movie Quotes database, the Movie Timeline website and user collated IMDB lists.
			Here are some of the URLs that have been used:
		</p>
		<ul class="list-disc">
			<li v-for="url in sources" :key="url"><a :href="url" target="_blank" rel="noopener">{{url}}</a></li>
		</ul>
		<h3>Dates</h3>
		<p>
			Please be aware when looking at the screenshots of dates that they may be in either US (month/day/year) or European (day/month/year) format.
			For some dates, with a day beyond the 12th, there's only one format that makes sense, so in those cases working out the correct format is easy.
			Beyond that, in a lot of cases the date format can be inferred from the country the movie is set in.
			However, sometimes (especially for some movies made in the US but set elsewhere) the date format may not match the movie's country.
			In those cases, the correct format can often be inferred from hints found elsewhere in the movie.
		</p>
		<parallax :src="fanart[2]" title="Stats" class="mt-24 mb-16 h-64" />
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
		<parallax :src="fanart[3]" title="History" class="mt-24 mb-16 h-64" />
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
		<parallax :src="fanart[4]" title="Metrics" class="mt-24 mb-16 h-64" />
		<h3 id="stars">Stars</h3>
		<p>
			The star rating on this website is based on
			<a href="https://www.imdb.com/" target="_blank" rel="noopener">IMDB</a> and
			<a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TheMovieDB</a> scores,
			and takes into account that only very bad movies score below 40% (and not many of those reach below 30%), and very few movies score higher than 80%.
		</p>
		<div class="scores">
			<p><score :percent="35" :stars="5" />0% - 39%</p>
			<p><score :percent="45" :stars="5" />40% - 49%</p>
			<p><score :percent="55" :stars="5" />50% - 59%</p>
			<p><score :percent="65" :stars="5" />60% - 69%</p>
			<p><score :percent="75" :stars="5" />70% - 79%</p>
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
		<p>This custom designed metric is based on a movie score of 1 to 100, and a budget and revenue in dollars,
			and aims to represent how well the movie did compared to its cost - not just how much money did it make, but how much enjoyment did it bring to people.
			The metric was tuned for the movies in this dataset, and kindly created for the site by James Kerr.
		</p>
		<p>The formula used for calculating value for money is:</p>
		<p>( score / 100 ) <sup>1.8 / 2.8</sup> x ( revenue / ( budget + revenue ) ) <sup>1 / 2.8</sup></p>
		<p>On this site the metric has been turned into a score from 0 to 5, with the following equally spaced ranges:</p>
		<div class="values">
			<p><value :value="0" :scale="5" />0% - 16%</p>
			<p><value :value="20" :scale="5" />17% - 33%</p>
			<p><value :value="40" :scale="5" />34% - 50%</p>
			<p><value :value="60" :scale="5" />51% - 66%</p>
			<p><value :value="80" :scale="5" />67% - 83%</p>
			<p><value :value="100" :scale="5" />84% - 100%</p>
		</div>
		<parallax :src="fanart[5]" title="Technology" class="mt-24 mb-16 h-64" />
		<p>
			This website uses the awesome <a href="https://gridsome.org/" target="_blank" rel="noopener">Gridsome</a> static site generator, which creates the entire site
			as a set of static HTML pages (along with CSS, JS and JSON files) that are deployed to <a href="https://pages.github.com/" target="_blank" rel="noopener">GitHub Pages</a>.
			The code used to create the site is <a href="https://github.com/markhoney/inmovies.today" target="_blank" rel="noopener">available on GitHub</a>.
		</p>
		<p>
			All data about the events in movies has been lovingly compiled by hand into a Google sheet.
			The code used to build this website reads from that spreadsheet and downloads a bunch of metadata before running the Gridsome build command to construct the site.
		</p>
		<p>
			Metadata (images, movie information) is scraped from a variety of sources, including The Movie DB, the Open Movie DB, the Bechdel Test website, IMDB, Wikipedia and WikiData.
		</p>
		<parallax :src="fanart[6]" class="mt-32 h-64" />
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
	import Value from '@/components/movie/Value.vue';
	export default {
		metaInfo: {
			title: 'About'
		},
		components: {
			Parallax,
			Score,
			Bechdel,
			Value,
		},
		data() {
			return {
				sources: [
					'https://en.wikipedia.org/wiki/List_of_films_based_on_actual_events',
					'https://en.wikipedia.org/wiki/Category:Lists_of_documentary_films',
					'https://en.wikipedia.org/wiki/Category:Documentary_films',
					'http://www.quodb.com/',
					'https://www.imdb.com/list/ls063654949/',
					'https://www.imdb.com/list/ls020840979/',
					'https://books.google.co.nz/books?id=hsuhCgAAQBAJ&printsec=frontcover',
					'http://www.themovietimeline.com/',
					'https://en.wikipedia.org/wiki/Category:American_disaster_films',
					'https://www.youtube.com/playlist?list=PLRDnnvx-4xZ0dHwuIvZbnWPojyQ1ZLqxO',
					'https://www.daysoftheyear.com/',
					'https://en.wikipedia.org/wiki/List_of_biographical_films',
					'https://www.imdb.com/list/ls009393621/',
					'https://en.wikipedia.org/wiki/Category:Crime_films_based_on_actual_events',
					'https://en.wikipedia.org/wiki/Category:Drama_films_based_on_actual_events',
					'http://www.aetherco.com/timelinks/',
					'https://en.wikipedia.org/wiki/Category:Films_about_time_travel',
					'https://en.wikipedia.org/wiki/One-shot_film',
					'https://en.wikipedia.org/wiki/List_of_media_set_within_one_day',
				]
			};
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
	p, ul, ol, dl, h2, h3, .stats, .scores, .values {
		@apply m-4 max-w-screen-xl mx-auto px-4;
	}
	ul, ol {
		@apply pl-16;
	}
	.scores, .stats, .values {
		@apply flex flex-wrap text-center;
	}
	.stats span, .stats a, .values div {
		@apply block text-3xl;
	}
	/* dt::after {
		content: ":";
	} */
</style>
