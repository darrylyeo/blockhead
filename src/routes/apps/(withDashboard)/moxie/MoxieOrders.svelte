<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'
	import type { MoxieOrder as _MoxieOrder } from '$/api/moxie/auction/normalize'


	// Inputs
	export let moxieProvider: MoxieProvider
	export let network: Ethereum.Network
	export let orders: _MoxieOrder[]

	// (View options)
	export let title = 'Orders'
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
	import MoxieOrder from './MoxieOrder.svelte'
</script>


<CollapsibleList
	items={orders}
	getIndex={order => order.id}
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

	<svelte:fragment let:item={order}>
		<AnchorLink
			base={`/apps/moxie/network/${network.slug}`}
			link={`/order/${order.id}`}
		>
			<MoxieOrder
				{network}
				{order}
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
				Loading more orders via {moxieProvider}...
			</Loading>
		{/if}
	</svelte:fragment>
</CollapsibleList>
