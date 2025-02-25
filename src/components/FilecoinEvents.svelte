<script context="module" lang="ts">
	export enum Layout {
		ListSequential = 'ListSequential',
		ListDiscrete = 'ListDiscrete',
	}
</script>


<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let events: Filecoin.Event[] = []
	export let eventsCount: number | undefined

	// (View options)
	export let title = 'Events'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean
	export let layout: Layout
	export let detailLevel: FilecoinEventDetailLevel = {
		[Layout.ListSequential]: FilecoinEventDetailLevel.Summary,
		[Layout.ListDiscrete]: FilecoinEventDetailLevel.SummaryLocation,
	}[layout]
	export let showFormattedNames = true

	// Events
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import type Loader from './Loader.svelte'
	import AnchorLink from './AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from './CollapsibleList.svelte'
	import FilecoinEvent, { Layout as FilecoinEventLayout, DetailLevel as FilecoinEventDetailLevel } from './FilecoinEvent.svelte'
</script>


<CollapsibleList
	items={
		layout === Layout.ListSequential ?
			events
				.sort((a, b) => a.indexInTransaction - b.indexInTransaction)
		:
			events
	}
	itemsCount={eventsCount}
	getIndex={(event, i) => layout === Layout.ListSequential ? event.indexInTransaction : i}
	isOrdered={true}

	bind:isOpen

	{title}
	{headingLevel}

	isScrollEnabled={
		events.length > (
			{
				[FilecoinEventDetailLevel.Summary]: 16,
				[FilecoinEventDetailLevel.SummaryLocation]: 4,
				[FilecoinEventDetailLevel.SummaryDetailsLocation]: 2,
			}[detailLevel]
		)
	}
	layout={
		detailLevel === FilecoinEventDetailLevel.Summary && layout === Layout.ListSequential ?
			CollapsibleListLayout.Card
		:
			CollapsibleListLayout.Cards
	}

	{pagination}
>
	<svelte:fragment slot="header-right">
		{#if isOpen}
			<menu class="row wrap">
				<label>
					<input type="checkbox" bind:checked={showFormattedNames} />
					<span>Format Names</span>
				</label>

				<label>
					Show
					<select bind:value={detailLevel}>
						{#each Object.entries({
							[FilecoinEventDetailLevel.Summary]: 'Summary',
							[FilecoinEventDetailLevel.SummaryLocation]: 'Summary / Location',
							[FilecoinEventDetailLevel.SummaryDetailsLocation]: 'Summary / Details / Location',
						}) as [value, label]}
							<option {value}>{label}</option>
						{/each}
					</select>
				</label>
			</menu>
		{/if}
	</svelte:fragment>

	<svelte:fragment let:item={event}>
		<AnchorLink
			base={`/explorer/${network.slug}/tx/${event.transaction?.cid}`}
			link={`/event/${event.indexInTransaction}`}
			class=""
		>
			<FilecoinEvent
				{network}
				{event}
				headingLevel={headingLevel + 1}
				layout={{
					[Layout.ListSequential]: FilecoinEventLayout.ListItemSequential,
					[Layout.ListDiscrete]: FilecoinEventLayout.ListItemDiscrete,
				}[layout]}
				{detailLevel}
				{showFormattedNames}
			/>
		</AnchorLink>
	</svelte:fragment>
</CollapsibleList>
