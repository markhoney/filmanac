(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{229:function(t,e){},240:function(t,e,a){"use strict";var s=a(229),n=a.n(s);e.default=n.a},252:function(t,e,a){"use strict";a.r(e);a(144);var s={metaInfo:{title:"About this website"},methods:{stat:function(t){var e=this.$page.allStats.edges.find((function(e){return e.node.id===t}));if(e)return e.node.value}}},n=a(7),o=a(240),i=Object(n.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Fixed",[a("h2",{staticClass:"text-4xl"},[t._v("Stats")]),a("p",[t._v("This database contains "+t._s(t.stat("events"))+" events, from "+t._s(t.stat("movies"))+" movies. These events cover "+t._s(t.stat("days"))+" days of the year, and the events occurred in "+t._s(t.stat("years"))+" different years. "+t._s(366-t.stat("days"))+" days unfortunately still have no movie events connected to them. The movies were made in "+t._s(t.stat("countries"))+" countries, have "+t._s(t.stat("languages"))+" spoken (or signed) languages and were made by "+t._s(t.stat("studios"))+" different movie studios.\n\t")]),a("h2",{staticClass:"text-4xl"},[t._v("History")]),a("p",[t._v("The idea for this website came about a friend watched "),a("g-link",{attrs:{to:"/tt0367594"}},[t._v("Charlie and the Chocolate Factory")]),t._v(" on the First of February, and spotted that the visit to the chocolate factory happens on February the first. When he realised that the next day, February the second, was "),a("g-link",{attrs:{to:"/tt0107048"}},[t._v("Groundhog Day")]),t._v(", he thought it was a nice coincidence.")],1),a("p",[t._v("When my friend told me this story a few days later, we sat there and thought of a few more movies that are related to a particular day of the year. Some of the first movies we came up with were "),a("g-link",{attrs:{to:"/tt0116629"}},[t._v("Independence Day")]),t._v(", "),a("g-link",{attrs:{to:"/tt0058777"}},[t._v("Zulu")]),t._v(", "),a("g-link",{attrs:{to:"/tt0077651"}},[t._v("Halloween")]),t._v(" and "),a("g-link",{attrs:{to:"/tt0095016"}},[t._v("Die Hard")]),t._v(". Of course, it seemed prudent to start adding these movies to a spreadsheet.")],1),a("p",[t._v("As the spreadsheet started growing, I realised that it would be nice to have a website where others could see the list. So I figured I'd try out Gridsome, a nice Vue based static site generator that uses GraphQL as a data layer. I'm a big fan of shiny new JavaScript technologies, and a Vue/GraphQL solution seemed perfect. I've also used Tailwind CSS, a utility-first CSS library, to make things look nice.")])])}),[],!1,null,null,null);"function"==typeof o.default&&Object(o.default)(i);e.default=i.exports}}]);