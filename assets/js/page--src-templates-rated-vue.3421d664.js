(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{171:function(t,e,s){},172:function(t,e,s){"use strict";var i=s(171);s.n(i).a},173:function(t,e,s){"use strict";var i={components:{Icons:s(174).a},props:["link","poster","title","subtitle","icons"]},n=s(19),a=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"w-full md:w-full max-w-4xl rounded overflow-hidden shadow-lg m-4 flex justify-between"},[s("div",{staticClass:"md:flex-shrink-0"},[t.poster?s("g-link",{attrs:{to:t.link}},[s("g-image",{staticClass:"md:w-56",attrs:{src:t.poster,alt:t.title+" poster"}})],1):t._e()],1),s("div",{staticClass:"flex flex-col flex-grow px-8 py-4 bg-gray-800"},[s("h3",{staticClass:"font-bold text-4xl md:text-2xl lg:text-2xl text-gray-200"},[s("g-link",{attrs:{to:t.link}},[t._v(t._s(t.title))])],1),s("span",{staticClass:"text-xl lg:mb-4"},[t._v(t._s(t.subtitle))]),s("div",{staticClass:"flex-grow"},[t._t("default")],2),s("Icons",{staticStyle:{color:"#ff0000"},attrs:{icons:t.icons}})],1)])}),[],!1,null,null,null);e.a=a.exports},174:function(t,e,s){"use strict";var i={props:["icons"]},n=(s(172),s(19)),a=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex mb-2"},t._l(t.icons,(function(e,i){return s("g-link",{key:e.title,attrs:{to:e.path}},[e.icon?s("img",{staticClass:"mx-2 icon",attrs:{src:e.icon,title:e.title}}):t._e()])})),1)}),[],!1,null,null,null);e.a=a.exports},175:function(t,e,s){"use strict";var i={title:"StarRating",props:["percent","stars","colour"],computed:{rating:function(){return this.percent*(this.stars+1)/100-.5}}},n=s(19),a=Object(n.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{style:{color:t.colour||"#4299E1"},attrs:{title:t.percent+"%"}},t._l(t.stars,(function(e){return s("button",{key:e,style:{color:e>t.rating&&"#EDF2F7"}},[s("svg",{staticClass:"w-8",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 260 245"}},[s("path",{attrs:{d:"M55 237L129 9l74 228L9 96h240"}})])])})),0)}),[],!1,null,"1b7ea2d4",null);e.a=a.exports},176:function(t,e,s){"use strict";var i={props:["to"]},n=s(19),a=Object(n.a)(i,(function(){var t=this.$createElement;return(this._self._c||t)("g-link",{staticClass:"m-2 px-1 border-4 rounded-lg font-serif font-bold uppercase",staticStyle:{"font-family":"Garamond, 'Times New Roman', serif"},attrs:{to:this.to}},[this._t("default")],2)}),[],!1,null,null,null);e.a=a.exports},177:function(t,e,s){"use strict";var i=s(173),n=s(175),a=s(176),l={components:{Card:i.a,Rating:n.a,Rated:a.a},props:{movie:Object}},r=s(19),o=Object(r.a)(l,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Card",{attrs:{link:t.movie.path,poster:t.movie.images&&t.movie.images.poster&&t.movie.images.poster.path,title:t.movie.title,subtitle:t.movie.year,icons:t.movie.genres||[].concat(t.movie.studios||[],t.movie.countries||[],t.movie.languages||[])}},[s("p",{staticClass:"text-xl text-base text-gray-100 leading-snug h-20 overflow-hidden"},[t._v(t._s(t.movie.plot))]),t.movie.rated?s("Rated",{staticClass:"float-right",attrs:{to:t.movie.rated.path}},[t._v(t._s(t.movie.rated.title))]):t._e(),s("Rating",{staticClass:"mt-2",attrs:{percent:t.movie.rating,stars:5}})],1)}),[],!1,null,null,null);e.a=o.exports},179:function(t,e){},188:function(t,e,s){"use strict";var i=s(179),n=s.n(i);e.default=n.a},197:function(t,e,s){"use strict";s.r(e);var i={components:{Movie:s(177).a},metaInfo:function(){return{title:this.title}},computed:{title:function(){return this.$page.rated.title+" Movies"}}},n=s(19),a=s(188),l=Object(n.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("Layout",{attrs:{title:this.title}},[e("h1",[this._v(this._s(this.$page.rated.title))]),this._l(this.$page.rated.belongsTo.edges,(function(t,s){return e("Movie",{key:s,attrs:{movie:t.node}})}))],2)}),[],!1,null,null,null);"function"==typeof a.default&&Object(a.default)(l);e.default=l.exports}}]);