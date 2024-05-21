<script lang="ts">
	// External State
	export let isOpen = true
	export let renderOnlyWhenOpen = true

	export let transitionWidth = false
	export let transitionHeight = true

	export let duration = 600
	export let delay = 0
	export let easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

	export let clip = false

	export let inline = false
	export let contentsOnly = false
	export let contentElementOnly = !transitionWidth && !transitionHeight
	export let containerClass = 'align-top'
	export let containerStyle = ''

	export let contentClass = $$props.class


	// Internal state
	let container: HTMLElement
	let content: HTMLElement


	// Stores

	import { readable } from 'svelte/store'

	let contentRect: SvelteStore<DOMRectReadOnly>

	// $: contentRect = content && readable<DOMRectReadOnly>(content.getBoundingClientRect(), set => {
	$: contentRect = content && readable<DOMRectReadOnly>({}, set => {
		const resizeObserver = new ResizeObserver(([observerEntry]) => {
			set(observerEntry.contentRect)
		})
		resizeObserver.observe(content)
		// return () => resizeObserver.disconnect()
	})
</script>


<style>
	.container {
		display: grid;
		will-change: height;
		transition-duration: var(--duration, 600ms);
		transition-delay: var(--delay, 0ms);
		transition-timing-function: var(--easing, cubic-bezier(0.16, 1, 0.3, 1));
		transition-property:
			width,
			height
		;
	}

	.container:not(.isOpen) {
		animation: Absolute forwards 0s calc(var(--duration, 600ms) + var(--delay, 0ms));
	}
	@keyframes Absolute {
		to {
			position: absolute;
		}
	}
	:global(.column-block) > .container:not(.isOpen) {
		margin-top: 0;
	}

	.container.clip {
		/* clip-path: inset(0); */
		overflow: hidden;
	}

	.container.inline {
		display: inline-grid;
	}
	.content.inline {
		display: inline-grid;
		width: max-content;
		grid-auto-flow: column;
		gap: 0;
		align-items: baseline;
	}
</style>


{#if contentsOnly}
	<slot />
{:else if contentElementOnly}
	<div
		class="content{contentClass ? ` ${contentClass}` : ''}"
		class:inline
		style={containerStyle}
	>
		<slot />
	</div>
{:else}
	<div
		bind:this={container}
		class="container{containerClass ? ` ${containerClass}` : ''}"
		class:isOpen
		class:clip
		class:inline
		style={[
			duration && `--duration: ${duration}ms;`,
			delay && `--delay: ${delay}ms;`,
			easing && `--easing: ${easing};`,
			transitionWidth && contentRect && `width: ${isOpen ? `${Math.max($contentRect.width, 0)}px` : '0'};`,
			transitionHeight && contentRect && `height: ${isOpen ? `${Math.max($contentRect.height, 0)}px` : '0'};`,
			containerStyle,
		].filter(Boolean).join(' ')}
		aria-expanded={isOpen}
		tabindex={isOpen ? undefined : -1}
	>
		<div
			{...$$restProps}
			class="content{contentClass ? ` ${contentClass}` : ''}"
			class:inline
			bind:this={content}
		>
			{#if renderOnlyWhenOpen ? isOpen : true}
				<slot />
			{/if}
		</div>
	</div>
{/if}
