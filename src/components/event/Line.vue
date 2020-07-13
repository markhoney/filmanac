<template>
	<h3>
		<b>
			<g-link v-if="value.dayofyear.month && value.dayofyear.day && value.dayofyear.path" :to="value.dayofyear.path" :title="'See all events on ' + [this.value.dayofyear.month.title, this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal].join(' ')">
				{{[this.value.dayofyear.month.title, this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal].join(' ')}}{{value.year && ','}}
			</g-link>
			<template v-else-if="value.dayofyear.month && value.dayofyear.day">
				{{[this.value.dayofyear.month.title, this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal].join(' ')}}{{value.year && ','}}
			</template>
			<g-link v-else-if="value.dayofyear.month" :to="value.dayofyear.month.path" :title="'See all events in ' + this.value.dayofyear.month.title">
				{{this.value.dayofyear.month.title}}{{value.year && ','}}
			</g-link>
			<g-link v-else-if="value.dayofyear.day" :to="value.dayofyear.day.path" :title="'See all events on the ' + this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal">
				{{this.value.dayofyear.day.id + this.value.dayofyear.day.ordinal}}{{value.year && ','}}
			</g-link>
			<template v-if="value.year">
				<g-link :to="value.year.path" :title="'See all events in ' + value.year.id">{{value.year.id}}</g-link>
			</template>
		</b>
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
