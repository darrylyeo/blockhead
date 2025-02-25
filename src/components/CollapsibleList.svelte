<script context="module" lang="ts">
	// Types/constants
	export { Layout } from './List.svelte'
</script>


<script lang="ts" generics="
	Item extends any
">
	// Inputs
	export let items: Item[] = []
	export let itemsCount: number | undefined
	export let getIndex: (item: Item, index: any) => any
	export let isOrdered = true

	// (View options)
	export let isOpen: boolean

	export let title: string
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3

	export let layout: ListLayout
	export let isScrollEnabled = true


	// Events
	import type Loader from './Loader.svelte'
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import Collapsible from './Collapsible.svelte'
	import List, { Layout as ListLayout } from './List.svelte'
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

	<svelte:fragment slot="toolbar-items">
		<slot name="toolbar-items" />
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

		{pagination}
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
