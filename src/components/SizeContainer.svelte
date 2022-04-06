<script lang="ts">
	// External State
	export let duration: string = ''
	export let clip = false
	export let isOpen = true
	export let transitionWidth = false
	export let transitionHeight = true
	export let contentsOnly = false

	$: ({ otherProps, duration, clip, isOpen, transitionWidth, transitionHeight, contentsOnly } = $$props)


	// Internal state
	let container: HTMLElement
	let content: HTMLElement


	// Stores

	import { readable } from 'svelte/store'

	let contentRect: SvelteStore<DOMRectReadOnly>

	$: contentRect = content && readable<DOMRectReadOnly>(content.getBoundingClientRect(), set => {
		const resizeObserver = new ResizeObserver(([observerEntry]) => {
			set(observerEntry.contentRect)
		})
		resizeObserver.observe(content)
		return () => resizeObserver.disconnect()
	})
</script>


<style>
	.container {
		will-change: height;
		transition: var(--duration, 0.6s) cubic-bezier(0.16, 1, 0.3, 1);
	}

	.container.clip {
		clip-path: inset(0);
	}
</style>


{#if contentsOnly}
	<slot />
{:else}
	<div
		bind:this={container}
		class="container"
		class:clip
		style={[
			transitionWidth && `width: ${contentRect && isOpen ? `${Math.max($contentRect.width, 0)}px` : '0'};`,
			transitionHeight && `height: ${contentRect && isOpen ? `${Math.max($contentRect.height, 0)}px` : '0'};`,
			duration && `--duration: ${duration};`
		].filter(Boolean).join(' ')}
		tabindex={isOpen ? undefined : -1}
	>
		<div
			bind:this={content}
			style={transitionWidth ? `display: inline-block` : ''}
			{...otherProps}
		>
			<slot />
		</div>
	</div>
{/if}
