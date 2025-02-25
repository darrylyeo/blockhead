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
	export let items: Item[] = []
	export let getIndex: (item: Item, index: number) => number
	export let isOrdered = true

	// (View options)
	export let layout: Layout
	export let isScrollEnabled = true


	// Events
	import type Loader from './Loader.svelte'
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import ScrollContainer from './ScrollContainer.svelte'
</script>


<ScrollContainer
	{isScrollEnabled}
	{pagination}
>
	<svelte:element this={isOrdered ? 'ol' : 'ul'}
		class="column"
		class:card={layout === Layout.Card}
	>
		{#each items as item, i (getIndex?.(item, i) ?? i)}
			<li
				class:card={layout === Layout.Cards}
			>
				<slot
					{item}
					index={getIndex?.(item, i) ?? i}
				/>
			</li>
		{/each}
	</svelte:element>
</ScrollContainer>
