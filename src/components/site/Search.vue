<template>
	<div class="text-gray-700">
		<input class="form-control w-48 rounded p-1" type="text" v-model="searchTerm" @focus="focus = true" @blur="hide" placeholder="Search..." />
		<!--<svg xmlns="http://www.w3.org/2000/svg" class="text-gray-600 h-4 w-4 fill-current" viewBox="0 0 57 57">
			<path d="M55.1 51.9L41.6 37.8A23 23 0 0024 0a23 23 0 1013.2 41.8L50.8 56a3 3 0 004.3.1 3 3 0 000-4.2zM24 6a17 17 0 110 34 17 17 0 010-34z"/>
		</svg>-->
		<ul v-if="focus && searchResults">
			<li v-for="result in searchResults" :key="result.id">
				<g-link :to="result.path"><span v-html="boldNew(result.title)" /></g-link>
			</li>
		</ul>
	</div>
</template>

<script>
	function findInString(haystack, needle) {
		return [...haystack.matchAll(new RegExp(needle, 'gi'))].map((match) => match.index);
	}

	function findPartsInString(haystack, needles) {
		return needles.split(' ').map((needle) => findInString(haystack, needle).map((index) => [index, index + needle.length])).flat();
	}

	function rangeToNumbers(start, end) {
		return [...Array(end).keys()].slice(start);
	}

	function uniqueArray(list) {
		return [...new Set(list)];
	}

	function numbersToRanges(positions, leeway = 1) {
		return [...new Set(positions)].sort((a, b) => a - b).reduce((p, c) => {
			if (!p.length) return [[c, c]];
			if (p[p.length - 1][1] !== c - leeway) return [...p, [c, c]];
			p[p.length -1 ][1] = c;
			return p;
		}, []);
	}

	function rangesToNumbers(ranges) {
		return [...new Set(ranges.map((range) => rangeToNumbers(...range)).flat())].sort((a, b) => a - b);
	}

	function rationaliseRanges(ranges) {
		return numbersToRanges(rangesToNumbers(ranges));
	}

	function positions(haystack, needle) {
		return findPartsInString(haystack, needle);
	}

	function tag(string, ranges, tag = 'b') {
		return ranges.reverse().reduce((p, c) => insertTag(p, tag, c[0], c[1] + 1), string);
	}

	function insertString(string, insert, position) {
		return position > string.length ? string : [string.slice(0, position), insert, string.slice(position)].join('');
	}

	function insertTag(string, tag, start, end) {
		return insertString(insertString(string, `</${tag}>`, end), `<${tag}>`, start);
	}

	export default {
		data() {
			return {
				searchTerm: '',
				items: [],
				focus: false,
			};
		},
		computed: {
			searchResults() {
				if (this.searchTerm.length < 3) return [];
				return this.$search.search({query: this.searchTerm, limit: 999});
			}
		},
		methods: {
			hide() {
				setTimeout(() => {this.focus = false}, 100);
			},
			boldNew(result) {
				return tag(result, rationaliseRanges(findPartsInString(result, this.searchTerm)));
			},
			bold(result) {
				const pos = result.toLowerCase().indexOf(this.searchTerm.toLowerCase());
				return pos === -1 ? result : `${result.substr(0, pos)}<b>${result.substr(pos, this.searchTerm.length)}</b>${result.substr(pos + this.searchTerm.length)}`;
			},
		},
	};
</script>

<style scoped lang="postcss">
	ul {
		@apply absolute w-auto max-h-screen bg-white p-0 rounded right-0 mr-4 overflow-y-auto;
	}
	li {
		@apply m-2;
	}
</style>
