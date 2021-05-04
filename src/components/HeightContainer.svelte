<script lang="ts">
	import { spring } from 'svelte/motion'
	import { readable } from 'svelte/store'

	let container: HTMLElement
	let content: HTMLElement

	export let isOpen = true

	let contentRect
	$: if(content)
		contentRect = readable<DOMRectReadOnly>(content.getBoundingClientRect(), set => {
			const resizeObserver = new ResizeObserver(([observerEntry]) => {
				const {contentRect} = observerEntry
				set(contentRect)
			})
			resizeObserver.observe(content)
			return () => resizeObserver.disconnect()
		})

	const height = spring()

	// $: if(contentRect)
	// 	$height = isOpen ? $contentRect.height : 0

	let previousHeight
	$: if(contentRect){
		const newHeight = isOpen ? $contentRect.height : 0

		if(newHeight > 0){
			height.stiffness = 0.08
			height.damping = 0.5
		}else{
			height.stiffness = 0.15
			height.damping = 0.9
		}

		$height = newHeight
		previousHeight = newHeight
	}

	$: if($height !== undefined && container)
		requestAnimationFrame(() => {
			Object.assign(container.style, {
				height: `${Math.max($height, 0)}px`,
				marginTop: $height < 0 ? `${$height}px` : null,
				position: $height === 0 ? 'absolute' : null,

				marginBottom: isOpen ? null : `0px`,
			})
		})
</script>

<style>
	.container {
		will-change: height margin-top;
		contain: size;
		transition: margin-bottom 150ms;
	}
	@supports ( clip-path: polygon(0 0) ){
		.container {
			clip-path: polygon(-10% -100%, 110% -100%, 110% 100%, -10% 100%);
		}
	}
	@supports not (clip-path: polygon(0 0) ){
		.container {
			overflow: hidden;
		}
	}
</style>

<div class="container" bind:this={container}>
	<div bind:this={content} {...$$props}>
		<slot />
	</div>
</div>