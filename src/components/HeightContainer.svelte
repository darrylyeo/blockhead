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
	export let springAnimate = false // true

	// $: if(contentRect)
	// 	$height = isOpen ? $contentRect.height : 0

	let previousHeight
	$: if(contentRect){
		const newHeight = isOpen ? $contentRect.height : 0

		// if(newHeight > 0){
		// 	height.stiffness = 0.08
		// 	height.damping = 0.5
		// }else{
		// 	height.stiffness = 0.15
		// 	height.damping = 0.9
		// }

		height.stiffness = 0.05
		height.damping = 0.35

		// height.stiffness = 0.1
		// height.damping = 0.7

		// $height = newHeight
		height.set(newHeight, springAnimate ? undefined : {hard: true})
		previousHeight = newHeight
	}

	$: if($height !== undefined && container)
		// requestAnimationFrame(() => {
			Object.assign(container.style, {
				height: `${Math.max($height, 0)}px`,
				marginBottom: $height < 0 ? `${$height}px` : null,
				position: $height === 0 ? 'absolute' : null,

				marginTop: isOpen ? null : `0px`,
				transform: isOpen ? null : `translateY(var(--padding-inner))`,
			})
		// })
	

	export let containerClass = ''
</script>


<style>
	.container {
		will-change: height margin-bottom;
		contain: size layout;
		transition: margin-top transform 150ms;
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

	.container.regular-animate {
		transition: margin-top 150ms, transform 150ms, height 1000ms cubic-bezier(0, 1, 0, 1);
		transition: 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>


<div class="container {containerClass}" bind:this={container} class:regular-animate={!springAnimate} tabindex={isOpen ? undefined : -1}>
	<section bind:this={content} {...$$restProps}>
		<slot />
	</section>
</div>