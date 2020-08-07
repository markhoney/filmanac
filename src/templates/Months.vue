<template>
	<fixed :title="title">
		<ul>
			<li v-for="day in $page.month.daysofyear" :key="day.id">
				<h2 class="text-4xl border-b-2 border-black dark:border-white"><g-link :to="day.path" :title="'See all movies on ' + day.title">{{day.day.id}}{{day.day.ordinal}}</g-link></h2>
				<ul>
					<li v-for="event in day.events" :key="event.id">
						<movie-title :value="event.movie" class="text-2xl" />
						<h4>{{event.title.slice(0, 1).toUpperCase()}}{{event.title.slice(1)}}</h4>
					</li>
				</ul>
			</li>
		</ul>
	</fixed>
</template>

<page-query>
	query($id: ID) {
		month: months(id: $id) {
			title
			daysofyear {
				id
				title
				path
				day {
					id
					ordinal
				}
				events {
					id
					title
					movie {
						id
						path
						title
					}
				}
			}
		}
	}
</page-query>

<script>
	import MovieTitle from '@/components/movie/Title.vue';
	import EventLine from '@/components/event/Line.vue';
	export default {
		components: {MovieTitle, EventLine},
		metaInfo() {return {title: this.title}},
		computed: {
			title() {return 'Movies set in ' + this.$page.month.title},
		},
	};
</script>
