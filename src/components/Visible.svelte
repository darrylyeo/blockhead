<script lang="ts">
	// Inputs
	export let margin = 500
	export let interectionOptions: IntersectionObserverInit | undefined = {
		rootMargin: `${margin}px`,
	}


	// Events
	export let onVisible: () => void | undefined


	// Outputs
	export let isVisible = false


	// Actions
	import { onMount } from 'svelte'

	let element: HTMLElement

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting

				if(isVisible)
					onVisible?.()
			},
			{
				root: element.parentElement,
				...interectionOptions,
			},
		)

		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	})
</script>


<div bind:this={element}>
	<slot
		{isVisible}
	/>
</div>
