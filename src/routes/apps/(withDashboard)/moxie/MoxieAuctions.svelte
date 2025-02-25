<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'
	import type { MoxieAuction as _MoxieAuction } from '$/api/moxie/auction/normalize'


	// Inputs
	export let moxieProvider: MoxieProvider
	export let network: Ethereum.Network
	export let auctions: _MoxieAuction[]

	// (View options)
	export let title = 'Auctions'
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3
	export let showFormattedNames = true
	export let showFormattedTokenSymbols = true


	// Events
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import AnchorLink from '$/components/AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import Loader from '$/components/Loader.svelte'
	import Loading from '$/components/Loading.svelte'
	import MoxieAuction from './MoxieAuction.svelte'
</script>


<CollapsibleList
	items={auctions}
	getIndex={auction => auction.id}
	isOrdered={true}

	class="column"
	{...$$restProps}

	{title}
	headingLevel={headingLevel + 1}

	isScrollEnabled={true}
	layout={CollapsibleListLayout.Plain}

	{pagination}
>
	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{moxieProvider}
		</span>
	</svelte:fragment>

	<svelte:fragment let:item={auction}>
		<AnchorLink
			base={`/apps/moxie/network/${network.slug}`}
			link={`/auction/${auction.id}`}
		>
			<MoxieAuction
				{network}
				{auction}
				{showFormattedNames}
				{showFormattedTokenSymbols}
			/>
		</AnchorLink>
	</svelte:fragment>

	<svelte:fragment slot="after">
		{#if pagination?.isFetchingNextPage}
			<Loading
				icon={{
					src: moxieProviderIcons[moxieProvider],
					name: moxieProvider,
				}}
				iconAnimation="hover"
			>
				Loading more auctions via {moxieProvider}...
			</Loading>
		{/if}
	</svelte:fragment>
</CollapsibleList>
