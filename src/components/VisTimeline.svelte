<script lang="ts">
	// Libraries
	import { Timeline } from 'vis-timeline/standalone'
	import 'vis-timeline/dist/vis-timeline-graph2d.min.css'


	// Inputs
	export let data: Parameters<Timeline['setData']>[0]
	export let options: ConstructorParameters<typeof Timeline>[2]


	// Internal state
	let timeline: Timeline
	let container: HTMLElement | undefined

	// (Derived)
	$: if(container)
		timeline ??= new Timeline(
			container,
			data.items ?? [],
			options
		)


	// Actions
	$: timeline?.setData(data)

	$: timeline?.setOptions(options ?? {})
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
