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
	export let itemsCount: number | undefined
	export let getIndex: (item: Item, index: number) => number
	export let isOrdered = true

	// (View options)
	export let isOpen: boolean

	export let title: string
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3

	export let isScrollEnabled = true
	export let layout: Layout


	// Events
	import type Loader from './Loader.svelte'
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import Collapsible from './Collapsible.svelte'
	import List from './List.svelte'
	import PaginationCount from './PaginationCount.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	canToggle={items.length > 0}
>
	<svelte:fragment slot="title">
		<span class="row inline wrap">
			<slot name="title">
				<svelte:element this={`h${headingLevel}`}>
					{title}
				</svelte:element>
			</slot>

			<small>
				<PaginationCount
					itemsCount={itemsCount}
					currentRange={[0, items.length]}
					hasMoreItems={pagination?.hasNextPage}
					isShowingRange={isOpen}
				/>
			</small>
		</span>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<slot name="header-right" />
	</svelte:fragment>
	
	<List
		{items}
		{getIndex}
		{isOrdered}

		{layout}
		{isScrollEnabled}
	>
		<svelte:fragment
			let:item
			let:index
		>
			<slot
				{item}
				{index}
			/>
		</svelte:fragment>
	</List>
</Collapsible>


<style>
	small {
		opacity: 0.66;
	}
</style>
