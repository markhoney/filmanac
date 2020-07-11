<template>
	<Fixed :title="$page.month.title">
		<ul>
			<li v-for="day in $page.month.daysofyear" :key="day.id">
				<h2 class="text-4xl border-b-2 border-white"><g-link :to="day.path">{{day.day.id}}{{day.day.ordinal}}</g-link></h2>
				<ul>
					<li v-for="event in day.events" :key="event.id">
						<h3 class="text-2xl"><g-link :to="event.movie.path">{{event.movie.title}}</g-link></h3>
						<h4>{{event.title.slice(0, 1).toUpperCase()}}{{event.title.slice(1)}}</h4>
					</li>
				</ul>
			</li>
		</ul>
	</Fixed>
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
						year {
							id
							path
						}
					}
				}
			}
		}
	}
</page-query>

<script>
	export default {
		metaInfo() {
			return {
				title: this.title,
			};
		},
		computed: {
			title() {return this.$page.month.title + ' Movies'},
		},
	};
</script>
