<script context="module" lang="ts">
	// Types/constants
	export { Layout } from './List.svelte'
</script>


<script lang="ts" generics="
	Item extends any,
	_ListLayout extends ListLayout
">
	// Inputs
	export let items: Item[] | undefined = []

	export let itemsCount: number | undefined
	$: itemsCount ??= items?.length ?? 0

	export let currentRange: [number, number]
	$: currentRange ??= [0, itemsCount ?? items?.length ?? 0]

	export let getIndex: (item: Item, index: any) => any

	export let isOrdered = true

	// (View options)
	export let isOpen: boolean
	export let containerClass: string
	export let showContentsOnly = false

	export let title: string
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3

	export let layout: _ListLayout = ListLayout.Plain
	export let isScrollEnabled = true
	export let margin: List<_ListLayout>['$$prop_def']['margin']
	export let defaultHeight: List<_ListLayout>['$$prop_def']['defaultHeight']
	export let animateFlip = false
	export let rangeFormat: RangeFormat | undefined
	export let isShowingRangePrefix: boolean | undefined
	export let rangePrefix: string | undefined


	// Events
	import type Loader from './Loader.svelte'
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import Collapsible from './Collapsible.svelte'
	import List, { Layout as ListLayout } from './List.svelte'
	import PaginationCount, { RangeFormat } from './PaginationCount.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	{containerClass}
	canToggle={(items?.length ?? 0) > 0}
	{showContentsOnly}
>
	<svelte:fragment slot="title">
		<span class="row inline wrap">
			<slot name="title">
				<svelte:element this={`h${headingLevel}`}>
					{title}
				</svelte:element>
			</slot>

			{#if items !== undefined}
				<small>
					<PaginationCount
						{itemsCount}
						{currentRange}
						hasMoreItems={pagination?.hasNextPage ?? itemsCount === undefined}
						isShowingRange={isOpen}
						{rangeFormat}
						{isShowingRangePrefix}
						{rangePrefix}
					/>
				</small>
			{/if}
		</span>
	</svelte:fragment>

	<svelte:fragment slot="toolbar-items"
		let:isOpen
	>
		<slot name="toolbar-items"
			{isOpen}
		/>
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
		{defaultHeight}

		{pagination}
		{animateFlip}
	>
		<svelte:fragment slot="before">
			<slot name="before" />
		</svelte:fragment>

		<svelte:fragment
			let:item
			let:index
		>
			<slot
				{item}
				{index}
			/>
		</svelte:fragment>

		<svelte:fragment slot="empty">
			<slot name="empty" />
		</svelte:fragment>

		<svelte:fragment slot="after">
			<slot name="after" />
		</svelte:fragment>
	</List>
</Collapsible>


<style>
	small {
		opacity: 0.66;
	}
</style>
