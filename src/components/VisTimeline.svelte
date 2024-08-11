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
	$: if(container){
		timeline = new Timeline(
			container,
			data,
			options
		)
	}
</script>


<div
	bind:this={container}
	class="container"
></div>
