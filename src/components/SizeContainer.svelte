<script lang="ts">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'

	import type { TransitionConfig } from 'svelte/transition'

	type TransitionAndParams<
		Fn extends (node: Element, _?: any) => TransitionConfig = any
	> = (
		Fn extends (node: Element, _?: infer Params) => TransitionConfig
			? [Fn, Params | undefined]
			: never
	)


	// Inputs
	export let layout: 'block' | 'inline' | 'both' = 'block'
	export let isOpen = true
	export let renderOnlyWhenOpen = true

	export let clip = false
	export let alignBlock: 'start' | 'center' | 'end' | undefined
	export let alignInline: 'start' | 'center' | 'end' | undefined

	export let duration = 600
	export let delay = 0

	export let containerTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let containerProps: Record<string, any> | undefined

	export let contentKey: any | undefined
	export let contentTransition: TransitionAndParams | { in?: TransitionAndParams, out?: TransitionAndParams } | undefined
	export let contentTag: keyof SvelteHTMLElements = { 'block': 'div', 'inline': 'span', 'both': 'div' }[layout]
	export let contentProps: Record<string, any> | undefined


	// Internal state
	let borderBoxSize: ResizeObserverSize[] | undefined

	// (Computed)
	$: containBlock = layout === 'block' || layout === 'both'
	$: containInline = layout === 'inline' || layout === 'both'

	$: isRendered = renderOnlyWhenOpen ? isOpen : true
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
	{#if contentTransition}
		{#if 'in' in contentTransition && contentTransition.in && 'out' in contentTransition && contentTransition.out}
			{@const { in: [inTransition, inParams], out: [outTransition, outParams] } = contentTransition}

			{#if isRendered}
				{#key contentKey}
					<svelte:element this={contentTag}
						data-content
						bind:borderBoxSize
						{...contentProps}
						in:inTransition={inParams}
						out:outTransition={outParams}
					>
						<slot />
					</svelte:element>
				{/key}
			{/if}

		{:else if 'in' in contentTransition && contentTransition.in}
			{@const { in: [inTransition, inParams] } = contentTransition}

			{#if isRendered}
				{#key contentKey}
					<svelte:element this={contentTag}
						data-content
						bind:borderBoxSize
						{...contentProps}
						in:inTransition={inParams}
					>
						<slot />
					</svelte:element>
				{/key}
			{/if}

		{:else if 'out' in contentTransition && contentTransition.out}
			{@const { out: [outTransition, outParams] } = contentTransition}

			{#if isRendered}
				{#key contentKey}
					<svelte:element this={contentTag}
						data-content
						bind:borderBoxSize
						{...contentProps}
						out:outTransition={outParams}
					>
						<slot />
					</svelte:element>
				{/key}
			{/if}

		{:else if Array.isArray(contentTransition)}
			{@const [transition, transitionParams] = contentTransition}

			{#if isRendered}
				{#key contentKey}
					<svelte:element this={contentTag}
						data-content
						bind:borderBoxSize
						{...contentProps}
						transition:transition={transitionParams}
					>
						<slot />
					</svelte:element>
				{/key}
			{/if}
		{/if}

	{:else}
		{#if isRendered}
			{#key contentKey}
				<svelte:element this={contentTag}
					data-content
					bind:borderBoxSize
					{...contentProps}
				>
					<slot />
				</svelte:element>
			{/key}
		{/if}
	{/if}
</svelte:element>


<style>
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
			transition-property: display;
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

				&[data-clip] {
					contain: inline-size paint;
				}

				@supports (contain-intrinsic-inline-size: 0) {
					transition-property: display, contain-intrinsic-inline-size;
					will-change: contain-intrinsic-inline-size;
					contain-intrinsic-inline-size: auto var(--inlineSize);
				}

				@supports not (contain-intrinsic-inline-size: 0) {
					transition-property: display, inline-size;
					will-change: inline-size;
					inline-size: var(--inlineSize);
				}
			}

			&[data-contain="block"] {
				@supports (contain: block-size) {
					contain: block-size;

					&[data-clip] {
						contain: block-size paint;
					}
					
					transition-property: display, contain-intrinsic-block-size;
					will-change: contain-intrinsic-block-size;
					contain-intrinsic-block-size: auto var(--blockSize);
				}

				/* @supports not (contain: block-size) {
					contain: size;

					&[data-clip] {
						contain: size paint;
					}

					transition-property: display, contain-intrinsic-block-size;
					will-change: contain-intrinsic-block-size;
					contain-intrinsic-block-size: auto var(--blockSize);
				} */

				@supports not (contain: block-size) {
					&[data-clip] {
						contain: paint;
					}

					transition-property: display, block-size;
					will-change: block-size;
					block-size: var(--blockSize);
				}
			}

			&[data-contain="both"] {
				contain: size; 

				&[data-clip] {
					contain: size paint;
				}

				@supports (contain-intrinsic-size: 0) {
					transition-property: display, contain-intrinsic-size;
					will-change: contain-intrinsic-size;
					contain-intrinsic-size: auto var(--blockSize) var(--inlineSize);
				}

				@supports not (contain-intrinsic-size: 0) {
					transition-property: display, block-size, inline-size;
					will-change: block-size, inline-size;
					block-size: var(--blockSize);
					inline-size: var(--inlineSize);
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
</style>
