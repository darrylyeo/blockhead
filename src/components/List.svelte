<script context="module" lang="ts">
	export enum Layout {
		Plain = 'Plain',
		Card = 'Card',
		Cards = 'Cards',
	}
</script>


<script lang="ts" generics="
	Item extends any
">
	// Inputs
	export let items: Item[] | undefined = []
	export let getIndex: (item: Item, index: number) => number
	export let isOrdered = true

	// (View options)
	export let layout: Layout
	export let isScrollEnabled = true
	export let margin: ScrollContainer['$$prop_def']['margin']
	export let defaultHeight: ScrollContainer['$$prop_def']['defaultHeight']
	export let animateFlip = false


	// Events
	import type Loader from './Loader.svelte'
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import ScrollContainer from './ScrollContainer.svelte'


	// Transitions/animations
	import { flip, type AnimationConfig } from 'svelte/animate'

	$: animate = animateFlip ? flip : () => ({} as AnimationConfig)
</script>


<ScrollContainer
	{isScrollEnabled}
	{pagination}
	{margin}
	{defaultHeight}
>
	<svelte:fragment slot="before">
		<slot name="before" />
	</svelte:fragment>

	<svelte:element this={isOrdered ? 'ol' : 'ul'}
		class="column"
		class:card={layout === Layout.Card}
	>
		{#each items ?? [] as item, i (getIndex?.(item, i) ?? i)}
			<li
				class:card={layout === Layout.Cards}
				animate:animate={{ duration: 300 }}
			>
				<slot
					{item}
					index={getIndex?.(item, i) ?? i}
				/>
			</li>

		{:else}
			<slot name="empty" />
		{/each}
	</svelte:element>

	<svelte:fragment slot="after">
		<slot name="after" />
	</svelte:fragment>
</ScrollContainer>
