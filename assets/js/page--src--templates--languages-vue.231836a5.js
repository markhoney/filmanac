(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"1b5j":function(t,e,s){},"9Pk/":function(t,e,s){"use strict";var a={props:["value","invert"]},i=(s("sR4R"),s("KHd+")),l=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"inline-flex flex-row"},[t._l(["genres","studios","countries","languages"],(function(e){return t._l(t.value[e],(function(a){return s("li",{key:a.title},[s("g-link",{attrs:{to:a.path}},[a.image?s("g-image",{staticClass:"icon hover:scale-150 transform transition-transform ease-in-out duration-500",class:{invert:["genres","countries"].includes(e)&&!t.$store.state.dark},attrs:{src:a.image,title:a.title}}):t._e()],1)],1)}))}))],2)}),[],!1,null,"b5d058e8",null);e.a=l.exports},QDhY:function(t,e,s){"use strict";s.r(e);var a={components:{MovieCard:s("kslo").a},metaInfo:function(){return{title:this.title}},computed:{title:function(){return this.$page.language.title+" Language Movies"}}},i=s("KHd+"),l=null,n=Object(i.a)(a,(function(){var t=this.$createElement,e=this._self._c||t;return e("Fixed",{attrs:{title:this.title}},this._l(this.$page.language.movies,(function(t){return e("movie-card",{key:t.id,attrs:{value:t}})})),1)}),[],!1,null,null,null);"function"==typeof l&&l(n);e.default=n.exports},"U+9f":function(t,e,s){"use strict";var a={components:{MovieIcons:s("9Pk/").a},props:["link","poster","title","subtitle","icons"]},i=s("KHd+"),l=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"rounded shadow-lg m-4 flex bg-grey-darkest"},[s("div",{staticClass:"flex-none"},[t.poster?s("g-link",{attrs:{to:t.link}},[s("g-image",{staticClass:"h-32 w-24 md:h-64 md:w-48",attrs:{src:t.poster,alt:t.title+" poster"}})],1):t._e()],1),s("div",{staticClass:"flex-auto px-4"},[s("h3",{staticClass:"font-bold text-2xl md:text-4xl text-grey-lighter leading-tight"},[s("g-link",{attrs:{to:t.link}},[t._v(t._s(t.title))])],1),s("h4",{staticClass:"text-base md:text-xl leading-tight"},[t._v(t._s(t.subtitle))]),s("div",{staticClass:"hidden md:block mt-4"},[t._t("default")],2),s("movie-icons",{staticClass:"hidden md:flex mt-6",attrs:{value:{genres:t.icons}}})],1)])}),[],!1,null,null,null);e.a=l.exports},e2bQ:function(t,e,s){"use strict";s("qePV");var a={title:"StarRating",props:{percent:Number,stars:Number,colour:String,numeric:Boolean},computed:{rating:function(){return Math.min(Math.max(this.percent/10-3,0),5)}}},i=s("KHd+"),l=Object(i.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{style:{color:t.colour||"#4299E1"},attrs:{title:t.percent+"%"}},[t._l(t.stars,(function(e){return s("button",{key:e,class:{"text-grey-lighter":e>t.rating}},[s("svg",{staticClass:"w-8",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 260 245"}},[s("path",{attrs:{d:"M55 237L129 9l74 228L9 96h240"}})])])})),t.numeric?s("span",{staticClass:"ml-5 text-3xl text-grey-lighter"},[t._v(t._s(t.percent)+"%")]):t._e()],2)}),[],!1,null,"5a7fa020",null);e.a=l.exports},"iTj/":function(t,e,s){"use strict";var a={props:["value"]},i=s("KHd+"),l=Object(i.a)(a,(function(){var t=this.$createElement;return(this._self._c||t)("g-link",{staticClass:"px-4 border-4 rounded-lg font-serif font-bold uppercase whitespace-no-wrap hover:no-underline",staticStyle:{"font-family":"Garamond, 'Times New Roman', serif"},attrs:{to:this.value.path,title:"See all movies classified "+this.value.title}},[this._v("\n\t"+this._s(this.value.title)+"\n")])}),[],!1,null,null,null);e.a=l.exports},kslo:function(t,e,s){"use strict";var a=s("U+9f"),i=s("e2bQ"),l=s("iTj/"),n={components:{Card:a.a,Score:i.a,Classification:l.a},props:["value"]},r=s("KHd+"),o=Object(r.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("Card",{attrs:{link:t.value.path,image:t.value.images&&t.value.images.poster,title:t.value.title,subtitle:t.value.year&&t.value.year.id,icons:t.value.genres||[].concat(t.value.studios||[],t.value.countries||[],t.value.languages||[])}},[s("p",{staticClass:"text-xl text-grey-lightest leading-snug h-20 overflow-hidden"},[t._v(t._s(t.value.plot))]),t.value.classification?s("classification",{staticClass:"float-right",attrs:{value:t.value.classification}}):t._e(),t.value.score?s("score",{staticClass:"mt-2",attrs:{percent:t.value.score.id,stars:5}}):t._e()],1)}),[],!1,null,null,null);e.a=o.exports},sR4R:function(t,e,s){"use strict";var a=s("1b5j");s.n(a).a}}]);