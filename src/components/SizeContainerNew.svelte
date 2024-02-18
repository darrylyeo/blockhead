<script lang="ts">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'


	// Inputs
	export let layout: 'block' | 'inline' | 'both'
	export let duration = 300

	export let containerTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let containerProps: Record<string, any> | undefined

	export let contentTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let contentProps: Record<string, any> | undefined

	export let clip = false

	// (Computed)
	$: isBlock = layout === 'block' || layout === 'both'
	$: isInline = layout === 'inline' || layout === 'both'


	// Internal state
	let borderBoxSize: ResizeObserverSize[] = [{ inlineSize: 0, blockSize: 0 }]


	// Transitions
	import { type TransitionConfig } from 'svelte/transition'

	import { expoOut } from 'svelte/easing'

	const transitionContent = (node: Element): TransitionConfig => ({
		duration: duration / 2,
		css: t => `${isBlock ? `block-size: 0px;` : ''}${isInline ? `inline-size: 0px;` : ''}`,
		easing: expoOut,
	})
</script>


<svelte:element this={containerTag}
	data-container
	data-is-block={isBlock || undefined}
	data-is-inline={isInline || undefined}
	data-clip={clip || undefined}
	style:--inlineSize={isInline && borderBoxSize ? `${borderBoxSize[0].inlineSize}px` : undefined}
	style:--blockSize={isBlock && borderBoxSize ? `${borderBoxSize[0].blockSize}px` : undefined}
	style:--transitionDuration={`${duration}ms`}
	{...containerProps}
>
	<svelte:element this={contentTag}
		data-content
		bind:borderBoxSize
		class="content"
		{...contentProps}
		out:transitionContent
	>
		<slot />
	</svelte:element>
</svelte:element>


<style>
	[data-container] {
		transition: contain-intrinsic-size var(--transitionDuration) var(--ease-out-expo);
	}

	[data-container][data-is-inline] {
		display: inline-block;
		contain: inline-size;
		contain-intrinsic-inline-size: auto var(--inlineSize, 0px);
	}
	[data-container][data-is-inline][data-clip] {
		contain: inline-size paint;
	}

	[data-container][data-is-block] {
		display: block;
		contain: size;
		contain-intrinsic-block-size: auto var(--blockSize, 0px);
	}
	[data-container][data-is-block][data-clip] {
		contain: size paint;
	}

	[data-content] {
		display: inline-block;
		width: max-content;
	}
</style>
