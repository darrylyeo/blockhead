<script lang="ts">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'


	// Inputs
	export let layout: 'block' | 'inline' | 'both'
	export let isOpen = true

	export let clip = false
	export let alignBlock: 'start' | 'center' | 'end' | undefined
	export let alignInline: 'start' | 'center' | 'end' | undefined

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
	data-contain={borderBoxSize ? layout : undefined}
	style:--blockSize={borderBoxSize && containBlock ? `${borderBoxSize[0].blockSize}px` : undefined}
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
			&[data-layout="block"] {
				display: grid;

				& > [data-content] {
					display: block;
					height: max-content;
				}
			}

			&[data-layout="inline"] {
				display: inline-grid;

				& > [data-content] {
					display: inline-block;
					width: max-content;
				}
			}

			&[data-contain] {
				will-change: contain-intrinsic-size, height;
				transition-property: display, contain-intrinsic-size, height;
				transition-duration: var(--transitionDuration);
				transition-delay: var(--transitionDelay, 0ms);
				transition-timing-function: var(--ease-out-expo);

				&[hidden] {
					--blockSize: 0px !important;
					--inlineSize: 0px !important;
					display: none !important;
					transition-behavior: allow-discrete;
				}

				&[data-contain="inline"] {
					contain: inline-size;
					contain-intrinsic-inline-size: auto var(--inlineSize, 0px);

					&[data-clip] {
						contain: inline-size paint;
					}
				}

				/* &[data-contain="block"] {
					contain: size;
					contain-intrinsic-block-size: auto var(--blockSize, 0px);

					&[data-clip] {
						contain: size paint;
					}
				} */
				&[data-contain="block"] {
					height: var(--blockSize, 0px);

					&[data-clip] {
						contain: paint;
					}
				}
				/* &[data-contain="block"] {
					contain: block-size;
					contain-intrinsic-block-size: auto var(--blockSize, 0px);

					&[data-clip] {
						contain: block-size paint;
					}
				} */

				&[data-contain="both"] {
					contain: size; 
					/* contain-intrinsic-block-size: auto var(--blockSize, 0px); */
					height: var(--blockSize, 0px);
					contain-intrinsic-inline-size: auto var(--inlineSize, 0px);

					&[data-clip] {
						contain: size paint;
					}
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
