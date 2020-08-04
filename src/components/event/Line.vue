<template>
	<h3>
		<template v-if="value.dayofyear.month && value.dayofyear.day && value.dayofyear.path">
			<g-link class="inline-block" :to="value.dayofyear.path" :title="'See all events on ' + [value.dayofyear.month.title, value.dayofyear.day.id + value.dayofyear.day.ordinal].join(' ')">
				{{[value.dayofyear.month.title, value.dayofyear.day.id + value.dayofyear.day.ordinal].join(' ')}}
			</g-link>{{value.year && ','}}
		</template>
		<template v-else-if="value.dayofyear.month && value.dayofyear.day && value.dayofyear.month.path">
			<g-link class="inline-block" :to="value.dayofyear.month.path" :title="'See all events in ' + value.dayofyear.month.title">
				{{value.dayofyear.month.title}}
			</g-link>&nbsp;{{value.dayofyear.day.id}}{{value.dayofyear.day.ordinal}}{{value.year && ','}}
		</template>
		<template v-else-if="value.dayofyear.month && value.dayofyear.day">
			{{[value.dayofyear.month.title, value.dayofyear.day.id + value.dayofyear.day.ordinal].join(' ')}}{{value.year && ','}}
		</template>
		<template v-else-if="value.dayofyear.month" :to="value.dayofyear.month.path">
			<g-link class="inline-block" :title="'See all events in ' + value.dayofyear.month.title">
				{{this.value.dayofyear.month.title}}
			</g-link>{{value.year && ','}}
		</template>
		<template v-else-if="value.dayofyear.day">
			<g-link class="inline-block" :to="value.dayofyear.day.path" :title="'See all events on the ' + value.dayofyear.day.id + value.dayofyear.day.ordinal">
				{{value.dayofyear.day.id}}{{value.dayofyear.day.ordinal}}
			</g-link>{{value.year && ','}}
		</template>
		<template v-if="value.year">
			<g-link :to="value.year.path" :title="'See all events in ' + value.year.id">{{value.year.id}}</g-link>
		</template>
		{{separator}}
		{{value.title}}
	</h3>
</template>

<script>
	export default {
		props: ['value', 'separator'],
		computed: {
			date() {return this.value.dayofyear.month.title + ' ' + this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal},
		},
	}
</script>
