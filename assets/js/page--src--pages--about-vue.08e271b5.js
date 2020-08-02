(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"2IBc":function(t,e,a){"use strict";a("oVuX"),a("+2oP");var s={props:["value"],data:function(){return{levels:["This movie does not have two women in it","This movie has at least two women in it","who talk to each other","about something other than a man"],colours:["bg-red-600","bg-orange-600","bg-yellow-600","bg-green-600"]}},computed:{title:function(){return 0===this.value?this.levels[0]+".":this.levels.slice(1,this.value+1).join(", ")+"."}}},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this.$createElement;return(this._self._c||t)("span",{staticClass:"ml-4 py-1 px-5 font-bold rounded-md",class:this.colours[this.value],attrs:{title:this.title}},[this._v(this._s(this.value))])}),[],!1,null,null,null);e.a=i.exports},"7u/c":function(t,e,a){},A2Ty:function(t,e,a){"use strict";var s=a("7u/c");a.n(s).a},TeQF:function(t,e,a){"use strict";var s=a("I+eb"),n=a("tycR").filter,i=a("Hd5f"),r=a("rkAj"),o=i("filter"),l=r("filter");s({target:"Array",proto:!0,forced:!o||!l},{filter:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},e2bQ:function(t,e,a){"use strict";a("qePV");var s={title:"StarRating",props:{percent:Number,stars:Number,colour:String,numeric:Boolean},computed:{rating:function(){return Math.min(Math.max(this.percent/10-3,0),5)}}},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:{color:t.colour||"#4299E1"},attrs:{title:t.percent+"%"}},[t._l(t.stars,(function(e){return a("button",{key:e,class:{"text-grey-lighter":e>t.rating}},[a("svg",{staticClass:"w-8",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 260 245"}},[a("path",{attrs:{d:"M55 237L129 9l74 228L9 96h240"}})])])})),t.numeric?a("span",{staticClass:"ml-5 text-3xl text-grey-lighter"},[t._v(t._s(t.percent)+"%")]):t._e()],2)}),[],!1,null,"5a7fa020",null);e.a=i.exports},odGf:function(t,e,a){"use strict";a.r(e);a("TeQF"),a("fbCW"),a("2B1R");var s={props:["src","title","speed"],data:function(){return{width:0,height:0,innerHeight:0,scrollFactor:0,factor:.5,aspectRatio:9/16}},mounted:function(){this.parallax(),window.addEventListener("resize",this.animation),window.addEventListener("scroll",this.animation)},destroyed:function(){window.removeEventListener("resize",this.animation),window.removeEventListener("scroll",this.animation)},computed:{offset:function(){return this.scrollFactor*this.height*this.factor},compensatedHeight:function(){return this.innerHeight-this.innerHeight*this.factor},style:function(){return{image:{height:"".concat(this.compensatedHeight,"px")},element:{transform:"translate3d(0, ".concat(this.offset,"px, 0)"),paddingTop:"".concat(100*this.aspectRatio,"%")}}}},methods:{parallax:function(){var t=this.$refs.container.getBoundingClientRect();this.width=t.width,this.height=t.height,this.innerHeight=this.$refs.inside.getBoundingClientRect().height;var e=t.top,a=window.innerHeight-e;this.scrollFactor=a/(window.innerHeight+this.height)},animation:function(){requestAnimationFrame(this.parallax)}}},n=a("KHd+"),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"container",staticClass:"overflow-hidden"},[t.title?a("blockquote",{staticClass:"absolute bg-white text-black dark:bg-black dark:text-white bg-opacity-75 w-full mt-40 p-3 px-64 font-serif text-center z-10"},[a("p",{staticClass:"font-bold italic text-5xl"},[t._v(t._s(t.title))])]):t._e(),t._t("default"),a("div",{ref:"image",style:t.style.image},[a("div",{ref:"element",staticClass:"relative overflow-hidden h-0",staticStyle:{top:"-100%"},style:t.style.element},[a("div",{ref:"inside",staticClass:"absolute top-0 left-0 h-full w-full"},[a("g-image",{ref:"img",staticClass:"absolute z-10",staticStyle:{filter:"saturate(0.5) brightness(0.5)"},attrs:{src:t.src}})],1)])])],2)}),[],!1,null,null,null).exports,r=a("e2bQ"),o=a("2IBc"),l={metaInfo:{title:"About this website"},components:{Parallax:i,Score:r.a,Bechdel:o.a},computed:{fanart:function(){return this.$page.allMovies.edges.filter((function(t){return t.node.images.fanart})).map((function(t){return t.node.images.fanart}))}},methods:{stat:function(t){var e=this.$page.allStats.edges.find((function(e){return e.node.id===t}));if(e)return e.node.value}}},h=(a("A2Ty"),null),c=Object(n.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("parallax",{staticClass:"mb-16 h-64",attrs:{src:t.fanart[0],title:"About"}}),a("p",[t._v("\n\t\tHave you ever spotted a date mentioned in a movie, or wondered when historical events in movies actually took place?\n\t\tWouldn't it be cool if you could watch a movie on the same date the events in it occurred?\n\t")]),a("p",[t._v("\n\t\tMaybe you've arrived home after a long day at work, sat down in front of the TV to relax and unwind, and found that you can't choose a movie to watch.\n\t\tWith all the streaming options available these days there's so much choice, maybe you just want someone to make the decision for you.\n\t")]),a("p",[t._v("\n\t\tWell, fret no longer. For every day of the year, this website suggests movies that you can watch.\n\t\tWhat makes this site interesting is that it's not just picking random movies. Each suggestion is in some way connected to the day it's connected to.\n\t")]),a("ul",{staticClass:"list-disc"},[a("li",[t._v("It might be that a movie this site suggests is based on historical events, and an event in the movie happened on the day in question.")]),a("li",[t._v("It may be a fictional movie, but one which mentions real dates. Maybe one that happens on a single day.")]),a("li",[t._v("\n\t\t\tIt could be that there's a day of the year where that movie is celebrated, such as\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0092099"}},[t._v("Top Gun")]),t._v(" Day ("),a("g-link",{attrs:{to:"/may/13"}},[t._v("13th May")]),t._v("),\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0088763"}},[t._v("Back to the Future")]),t._v(" Day ("),a("g-link",{attrs:{to:"/october/21"}},[t._v("21st October")]),t._v(") or\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0083658"}},[t._v("Blade Runner")]),t._v(" Day ("),a("g-link",{attrs:{to:"/november/1"}},[t._v("1st November")]),t._v(").\n\t\t")],1),a("li",[t._v("\n\t\t\tOr it could just be that the day's a special day, and there's an obvious movie or two for that day, like\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0138704"}},[t._v("Pi")]),t._v(" or\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0454876"}},[t._v("Life of Pi")]),t._v(" on\n\t\t\tPi Day ("),a("g-link",{attrs:{to:"/march/14"}},[t._v("March 14th")]),t._v("), or\n\t\t\t"),a("g-link",{attrs:{to:"/movie/tt0325980"}},[t._v("Pirates of the Caribbean")]),t._v(" on\n\t\t\tTalk Like a Pirate Day ("),a("g-link",{attrs:{to:"/september/19"}},[t._v("September 19th")]),t._v(")\n\t\t")],1)]),a("parallax",{staticClass:"mt-24 mb-16 h-64",attrs:{src:t.fanart[1],title:"Stats"}}),a("p",[t._v("\n\t\tThis database contains "),a("b",[t._v(t._s(t.stat("events")))]),t._v(" events from "),a("b",[t._v(t._s(t.stat("movies")))]),t._v(" movies.\n\t\tThese events cover "),a("g-link",{attrs:{to:"/days"}},[t._v(t._s(t.stat("days")))]),t._v(" days of the year,\n\t\tand the events occurred in "),a("g-link",{attrs:{to:"/years"}},[t._v(t._s(t.stat("years")))]),t._v(" different years.\n\t\tThe movies were made in "),a("g-link",{attrs:{to:"/countries"}},[t._v(t._s(t.stat("countries")))]),t._v(" countries,\n\t\tby "),a("g-link",{attrs:{to:"/studios"}},[t._v(t._s(t.stat("studios")))]),t._v(" different movie studios,\n\t\thave "),a("g-link",{attrs:{to:"/languages"}},[t._v(t._s(t.stat("languages")))]),t._v(" spoken (or signed) languages\n\t\tand were released in "),a("g-link",{attrs:{to:"/released"}},[t._v(t._s(t.stat("releaseyears")))]),t._v(" different years.\n\t")],1),a("div",{staticClass:"stats"},[a("p",[a("span",[t._v(t._s(t.stat("events")))]),t._v("Events")]),a("p",[a("span",[t._v(t._s(t.stat("movies")))]),t._v("Movies")]),a("p",[a("g-link",{attrs:{to:"/days"}},[t._v(t._s(t.stat("days")))]),t._v("Days of the Year")],1),a("p",[a("g-link",{attrs:{to:"/years"}},[t._v(t._s(t.stat("years")))]),t._v("Event Years")],1),a("p",[a("g-link",{attrs:{to:"/countries"}},[t._v(t._s(t.stat("countries")))]),t._v("Countries")],1),a("p",[a("g-link",{attrs:{to:"/studios"}},[t._v(t._s(t.stat("studios")))]),t._v("Studios")],1),a("p",[a("g-link",{attrs:{to:"/languages"}},[t._v(t._s(t.stat("languages")))]),t._v("Languages")],1),a("p",[a("g-link",{attrs:{to:"/released"}},[t._v(t._s(t.stat("releaseyears")))]),t._v("Movie Release Years")],1)]),a("parallax",{staticClass:"mt-24 mb-16 h-64",attrs:{src:t.fanart[2],title:"History"}}),a("p",[t._v("\n\t\tThe idea for this website came about when a friend watched "),a("g-link",{attrs:{to:"/movie/tt0367594"}},[t._v("Charlie and the Chocolate Factory")]),t._v(" on the First of February,\n\t\tand spotted that the visit to the chocolate factory happens on "),a("g-link",{attrs:{to:"/february/1"}},[t._v("February the first")]),t._v(".\n\t\tWhen he realised that the next day, "),a("g-link",{attrs:{to:"/february/2"}},[t._v("February the second")]),t._v(", was "),a("g-link",{attrs:{to:"/movie/tt0107048"}},[t._v("Groundhog Day")]),t._v(",\n\t\the thought it was a nice coincidence.\n\t")],1),a("p",[t._v("\n\t\tWhen I was told this story a few days later, we both sat there and thought of a few more movies that are related to a particular day of the year.\n\t\tSome of the first movies we came up with were\n\t\t"),a("g-link",{attrs:{to:"/movie/tt0116629"}},[t._v("Independence Day")]),t._v(",\n\t\t"),a("g-link",{attrs:{to:"/movie/tt0058777"}},[t._v("Zulu")]),t._v(",\n\t\t"),a("g-link",{attrs:{to:"/movie/tt0077651"}},[t._v("Halloween")]),t._v(" and\n\t\t"),a("g-link",{attrs:{to:"/movie/tt0095016"}},[t._v("Die Hard")]),t._v(".\n\t\tOf course, it seemed prudent to start adding these movies to a spreadsheet.\n\t")],1),t._m(0),a("parallax",{staticClass:"mt-24 mb-16 h-64",attrs:{src:t.fanart[3],title:"Metrics"}}),a("h3",{attrs:{id:"stars"}},[t._v("Stars")]),t._m(1),a("div",{staticClass:"scores"},[a("p",[a("score",{attrs:{percent:35,stars:5}}),t._v("0% - 40%")],1),a("p",[a("score",{attrs:{percent:45,stars:5}}),t._v("40% - 50%")],1),a("p",[a("score",{attrs:{percent:55,stars:5}}),t._v("50% - 60%")],1),a("p",[a("score",{attrs:{percent:65,stars:5}}),t._v("60% - 70%")],1),a("p",[a("score",{attrs:{percent:75,stars:5}}),t._v("70% - 80%")],1),a("p",[a("score",{attrs:{percent:85,stars:5}}),t._v("80% - 100%")],1)]),a("h3",{attrs:{id:"bechdel"}},[t._v("Bechdel Score")]),t._m(2),a("p",[a("bechdel",{staticClass:"mr-2",attrs:{value:0}}),t._v("The movie does not have at least two women in it")],1),a("p",[a("bechdel",{staticClass:"mr-2",attrs:{value:1}}),t._v("The movie has at least two women in it")],1),a("p",[a("bechdel",{staticClass:"mr-2",attrs:{value:2}}),t._v("The movie has at least two women in it who talk to each other")],1),a("p",[a("bechdel",{staticClass:"mr-2",attrs:{value:3}}),t._v("The movie has at least two women in it who talk to each other about something other than a man")],1),t._m(3),a("h3",{attrs:{id:"value"}},[t._v("Value for Money")]),a("p",[t._v("Coming soon...")]),a("parallax",{staticClass:"mt-32 h-64",attrs:{src:t.fanart[4]}})],1)}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v("\n\t\tAs the spreadsheet started growing, I realised that it would be nice to have a website where others could see the list.\n\t\tSo I figured I'd try out "),a("a",{attrs:{href:"https://gridsome.org/",target:"_blank",rel:"noopener"}},[t._v("Gridsome")]),t._v(",\n\t\ta nice Vue based static site generator that uses "),a("a",{attrs:{href:"https://graphql.org/",target:"_blank",rel:"noopener"}},[t._v("GraphQL")]),t._v(" as a data layer.\n\t\tI'm a big fan of shiny new JavaScript technologies, and a "),a("a",{attrs:{href:"https://vuejs.org/",target:"_blank",rel:"noopener"}},[t._v("Vue")]),t._v("/GraphQL solution seemed perfect.\n\t\tI've also used "),a("a",{attrs:{href:"https://tailwindcss.com/",target:"_blank",rel:"noopener"}},[t._v("Tailwind CSS")]),t._v(", a utility-first CSS library, to make things look pretty.\n\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\tThe star rating on this website is based on\n\t\t"),e("a",{attrs:{href:"https://www.imdb.com/",target:"_blank",rel:"noopener"}},[this._v("IMDB")]),this._v(" and\n\t\t"),e("a",{attrs:{href:"https://www.themoviedb.org/",target:"_blank",rel:"noopener"}},[this._v("TheMovieDB")]),this._v(" scores,\n\t\tand takes into account that only very bad movies score below 40% (and not many of those reach below 30%), and very few movies score higher than 80%.\n\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\tThe Bechdel score uses the popular "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Bechdel_test",target:"_blank",rel:"noopener"}},[this._v("Bechdel Test")]),this._v("\n\t\tto measure how well represented women are in a movie.\n\t\tThe bar for scoring is fairly low, but it's surprising how many movies don't manage to score the full three points.\n\t\tHere's are the three levels of Bechdel scores:\n\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\tBechdel results are scraped from the "),e("a",{attrs:{href:"http://bechdeltest.com/",target:"_blank",rel:"noopener"}},[this._v("Bechdel Test website")]),this._v(",\n\t\tso if you want to see a Bechdel score for a movie on this site that's missing one, watch the movie, work out its score and add it to the site's API.\n\t\tWhen the next build of this website is run, the score will be added.\n\t")])}],!1,null,"84dd4494",null);"function"==typeof h&&h(c);e.default=c.exports}}]);