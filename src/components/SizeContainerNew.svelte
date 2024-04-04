<script lang="ts">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'


	// Inputs
	export let layout: 'block' | 'inline' | 'both'

	export let clip = false
	export let alignBlock: 'start' | 'center' | 'end' = 'start'
	export let alignInline: 'start' | 'center' | 'end' = 'start'

	export let duration = 600
	export let delay = 0

	export let containerTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let containerProps: Record<string, any> | undefined

	export let contentKey: any | undefined
	export let contentTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let contentProps: Record<string, any> | undefined


	// Internal state
	let borderBoxSize: ResizeObserverSize[] = [{ inlineSize: 0, blockSize: 0 }]

	// (Computed)
	$: isBlock = layout === 'block' || layout === 'both'
	$: isInline = layout === 'inline' || layout === 'both'


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
	data-align-block={alignBlock}
	data-align-inline={alignInline}
	data-clip={clip || undefined}
	style:--inlineSize={isInline && borderBoxSize ? `${borderBoxSize[0].inlineSize}px` : undefined}
	style:--blockSize={isBlock && borderBoxSize ? `${borderBoxSize[0].blockSize}px` : undefined}
	style:--transitionDuration={`${duration}ms`}
	style:--transitionDelay={delay ? `${delay}ms` : undefined}
	{...containerProps}
>
	{#key contentKey}
		<svelte:element this={contentTag}
			data-content
			bind:borderBoxSize
			class="content"
			{...contentProps}
			out:transitionContent
		>
			<slot />
		</svelte:element>
	{/key}
</svelte:element>


<style>
	@layer SizeContainer {
		[data-container] {
			transition: contain-intrinsic-size var(--transitionDuration) var(--transitionDelay, 0ms) var(--ease-out-expo);

			&[data-is-inline] {
				display: inline-grid;
				contain: inline-size;
				contain-intrinsic-inline-size: auto var(--inlineSize, 0px);

				&[data-clip] {
					contain: inline-size paint;
				}

				&[data-align-inline="start"] {
					justify-content: start;
				}

				&[data-align-inline="center"] {
					justify-content: center;
				}

				&[data-align-inline="end"] {
					justify-content: end;
				}

				& > [data-content] {
					display: inline-block;
					width: max-content;
				}
			}

			&[data-is-block] {
				display: grid;
				contain: size;
				contain-intrinsic-block-size: auto var(--blockSize, 0px);

				&[data-clip] {
					contain: size paint;
				}

				&[data-align-block="start"] {
					align-content: start;
				}

				&[data-align-block="center"] {
					align-content: center;
				}

				&[data-align-block="end"] {
					align-content: end;
				}
			}
		}
	}
</style>
