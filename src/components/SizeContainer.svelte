<script lang="ts">
	// External State
	export let isOpen = true

	export let transitionWidth = false
	export let transitionHeight = true

	export let duration = 600
	export let easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

	export let clip = false

	export let contentsOnly = false
	export let containerClass = ''

	export let contentClass = $$props.class

	let otherProps
	$: {
		const {
			duration, clip, isOpen, transitionWidth, transitionHeight, contentsOnly, containerClass, contentClass, class: _,
			..._otherProps
		} = $$props

		otherProps = _otherProps
	}


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
		display: grid;
		align-content: start;
		will-change: height;
		transition: var(--duration, 600ms) var(--easing, cubic-bezier(0.16, 1, 0.3, 1));
	}

	.container:not(.isOpen) {
		animation: Absolute forwards 0s var(--duration, 0.6s);
	}
	@keyframes Absolute {
		to {
			position: absolute;
		}
	}

	.container.clip {
		/* clip-path: inset(0); */
		overflow: hidden;
	}

	.container.inline {
		display: inline-grid;
		align-items: baseline;
	}
	.container.inline .content {
		display: inline-grid;
		width: max-content;
	}
</style>


{#if contentsOnly}
	<slot />
{:else}
	<div
		bind:this={container}
		class="container{containerClass ? ` ${containerClass}` : ''}"
		class:isOpen
		class:clip
		class:inline={transitionWidth}
		style={[
			duration && `--duration: ${duration}ms;`,
			easing && `--easing: ${easing};`,
			transitionWidth && contentRect && `width: ${isOpen ? `${Math.max($contentRect.width, 0)}px` : '0'};`,
			transitionHeight && contentRect && `height: ${isOpen ? `${Math.max($contentRect.height, 0)}px` : '0'};`,
		].filter(Boolean).join(' ')}
		aria-expanded={isOpen}
		tabindex={isOpen ? undefined : -1}
	>
		<div
			class="content{contentClass ? ` ${contentClass}` : ''}"
			bind:this={content}
			{...otherProps}
		>
			<slot />
		</div>
	</div>
{/if}
