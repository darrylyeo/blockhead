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
	import Collapsible from './Collapsible.svelte'
	import FilecoinEvent, { Layout as FilecoinEventLayout, DetailLevel as FilecoinEventDetailLevel } from './FilecoinEvent.svelte'
	import PaginationCount from './PaginationCount.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	canToggle={events.length > 0}
>
	<svelte:fragment slot="title">
		<slot name="title">
			<span class="row inline wrap">
				<svelte:element this={`h${headingLevel}`}>
					{title}
				</svelte:element>
				<small>
					<PaginationCount
						itemsCount={eventsCount}
						currentRange={[0, events.length]}
						hasMoreItems={pagination?.hasNextPage}
						isShowingRange={isOpen}
					/>
				</small>
			</span>
		</slot>
	</svelte:fragment>

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
	
	<ScrollContainer
		{pagination}
		isScrollEnabled={
			events.length > (
				{
					[FilecoinEventDetailLevel.Summary]: 16,
					[FilecoinEventDetailLevel.SummaryLocation]: 4,
					[FilecoinEventDetailLevel.SummaryDetailsLocation]: 2,
				}[detailLevel]
			)
		}
	>
		<ol
			class="column"
			class:card={detailLevel === FilecoinEventDetailLevel.Summary && layout === Layout.ListSequential}
		>
			{#each (
				layout === Layout.ListSequential ?
					events
						.sort((a, b) => a.indexInTransaction - b.indexInTransaction)
				:
					events
			) as event, i (layout === Layout.ListSequential ? event.indexInTransaction : i)}
				<li
					class:card={!(detailLevel === FilecoinEventDetailLevel.Summary && layout === Layout.ListSequential)}
				>
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
				</li>
			{/each}
		</ol>
	</ScrollContainer>
</Collapsible>


<style>
	small {
		opacity: 0.66;
	}
</style>
