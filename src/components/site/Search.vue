<template>
	<div class="text-gray-700 w-48">
		<div class="h-10 pl-3 pr-2 bg-white border rounded flex justify-between items-center relative">
			<input
				type="search"
				placeholder="Search..."
				class="appearance-none w-full outline-none focus:outline-none active:outline-none"
				v-model="searchTerm"
				@focus="focus = true"
				@blur="hide"
			/>
			<button type="submit" class="ml-1 outline-none focus:outline-none active:outline-none">
				<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
			</button>
		</div>
		<transition name="fade">
			<ul
				v-if="focus && searchTerm.length >= 3"
				class="absolute w-auto max-w-sm right-0 bg-white p-0 rounded mr-6 overflow-y-auto z-50"
				style="min-width: 192px; max-height: 90vh;"
			>
				<li v-for="result in searchResults" :key="result.id">
					<g-link :to="result.path"><span v-html="boldNew(result.title)" /></g-link>
				</li>
				<li v-if="!searchResults.length">
					<em>Sorry, no results found</em>
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
	function findInString(haystack, needle) {
		return [...haystack.matchAll(new RegExp(needle, 'gi'))].map((match) => match.index);
	}

	function findPartsInString(haystack, needles) {
		return needles.split(' ').map((needle) => findInString(haystack, needle).map((index) => [index, index + needle.length])).flat();
	}

	function numbersToRanges(positions, leeway = 1) {
		return [...new Set(positions)].sort((a, b) => a - b).reduce((p, c) => {
			if (!p.length) return [[c, c]];
			if (p[p.length - 1][1] !== c - leeway) return [...p, [c, c]];
			p[p.length -1 ][1] = c;
			return p;
		}, []);
	}

	function rangeToNumbers(start, end) {
		return [...Array(end).keys()].slice(start);
	}

	function rangesToNumbers(ranges) {
		return [...new Set(ranges.map((range) => rangeToNumbers(...range)).flat())].sort((a, b) => a - b);
	}

	function uniqueArray(list) {
		return [...new Set(list)];
	}

	function deduplicateRanges(ranges) {
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
				return tag(result, deduplicateRanges(findPartsInString(result, this.searchTerm)));
			},
			bold(result) {
				const pos = result.toLowerCase().indexOf(this.searchTerm.toLowerCase());
				return pos === -1 ? result : `${result.substr(0, pos)}<b>${result.substr(pos, this.searchTerm.length)}</b>${result.substr(pos + this.searchTerm.length)}`;
			},
		},
	};
</script>

<style scoped lang="postcss">
	li {
		@apply m-2;
	}
</style>
