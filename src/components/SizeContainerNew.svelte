<script lang="ts">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'


	// Inputs
	export let layout: 'block' | 'inline' | 'both'
	export let isOpen = true

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
	let borderBoxSize: ResizeObserverSize[]

	// (Computed)
	$: containBlock = layout === 'block' || layout === 'both'
	$: containInline = layout === 'inline' || layout === 'both'
</script>


<svelte:element this={containerTag}
	data-container
	data-layout={layout}
	data-contain-block={borderBoxSize && containBlock ? '' : undefined}
	style:--blockSize={borderBoxSize && containBlock ? `${borderBoxSize[0].blockSize}px` : undefined}
	data-contain-inline={borderBoxSize && containInline ? '' : undefined}
	style:--inlineSize={borderBoxSize && containInline ? `${borderBoxSize[0].inlineSize}px` : undefined}
	data-align-block={alignBlock}
	data-align-inline={alignInline}
	data-clip={clip ? '' : undefined}
	hidden={!isOpen ? '' : undefined}
	style:--transitionDuration={`${duration}ms`}
	style:--transitionDelay={delay ? `${delay}ms` : undefined}
	{...containerProps}
>
	{#key contentKey}
		<svelte:element this={contentTag}
			data-content
			bind:borderBoxSize
			{...contentProps}
		>
			<slot />
		</svelte:element>
	{/key}
</svelte:element>


<style>
	@layer SizeContainer {
		[data-container] {
			will-change: contain-intrinsic-size;
			transition-property: contain-intrinsic-size, display;
			transition-duration: var(--transitionDuration);
			transition-delay: var(--transitionDelay, 0ms);
			transition-timing-function: var(--ease-out-expo);
			transition-behavior: allow-discrete;

			&[data-layout="block"] {
				display: grid;
			}

			&[data-layout="inline"] {
				display: inline-grid;

				& > [data-content] {
					display: inline-block;
					width: max-content;
				}
			}

			&[data-contain-inline] {
				&[hidden] {
					--inlineSize: 0px !important;
				}

				contain: inline-size;
				contain-intrinsic-inline-size: auto var(--inlineSize, 0px);

				&[data-clip] {
					contain: inline-size paint;
				}
			}

			&[data-contain-block] {
				&[hidden] {
					--blockSize: 0px !important;
				}

				contain: size;
				contain: block-size;
				contain-intrinsic-block-size: auto var(--blockSize, 0px);

				&[data-clip] {
					contain: size paint;
					contain: block-size paint;
				}
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
</style>
