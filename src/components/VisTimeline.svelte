<script lang="ts">
	// Libraries
	import { Timeline } from 'vis-timeline/standalone'
	import 'vis-timeline/dist/vis-timeline-graph2d.min.css'


	// Inputs
	export let data: ConstructorParameters<typeof Timeline>[1]
	export let options: ConstructorParameters<typeof Timeline>[2]


	// Internal state
	let timeline: Timeline
	let container: HTMLElement | undefined


	// Actions
	$: if(container)
		timeline ??= new Timeline(
			container,
			data,
			options
		)

	$: timeline?.setData(data)

</script>


<div
	bind:this={container}
	class="container card"
></div>


<style>
	.container {
		:global(.vis-timeline) {
			border: none;
			border-color: rgba(255, 255, 255, 0.1);
		}

		:global(.vis-timeline *) {
			color: inherit;
			border-color: inherit;
		}

		:global(.vis-time-axis) {
			color: rgba(255, 255, 255, 0.75);
		}

		:global(.vis-item-content),
		:global(.vis-item-content > *) {
			display: contents;
		}
	}
</style>
