<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieAuction } from '$/api/moxie/auction/normalize'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'


	// External state
	export let network: Ethereum.Network
	export let moxieProvider: MoxieProvider


	// Outputs
	export let auctions: MoxieAuction[] | undefined

	type SharedSlotProps = {
		auctions: typeof auctions,
		status: Loader<any, any, any, any>['$$slot_def']['default']['status'],
		pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination'],
		isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
		toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			loadingMessage: Loader<any, any, any, any>['$$slot_def']['header']['loadingMessage'],
			errorMessage: Loader<any, any, any, any>['$$slot_def']['header']['errorMessage'],
		},
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { isTruthy } from '$/utils/isTruthy'
	import { normalizeAuction } from '$/api/moxie/auction/normalize'


	// Components
	import Loader from '$/components/Loader.svelte'
</script>


<Loader
	{...$$restProps}
	loadingIcon={moxieProviderIcons[moxieProvider]}
	loadingIconName={moxieProvider}
	loadingMessage={`Loading auctions from ${moxieProvider}...`}
	errorMessage={`Couldn't load auctions from ${moxieProvider}.`}
	fromInfiniteQuery={createInfiniteQuery({
		queryKey: ['MoxieAuctions', {
			moxieProvider,
			chainId: network.chainId,
		}],
		initialPageParam: 0,
		queryFn: async ({
			queryKey: [_, {
				chainId,
			}],
			pageParam: skip,
		}) => {
			const { getAuctions } = await import('$/api/moxie/auction')

			return await getAuctions({
				chainId,
				skip,
				first: 20,
				orderBy: 'auctionEndDate',
				orderDirection: 'desc',
				orderDirection: 'asc',
			})
		},
		getNextPageParam: (lastPage, allPages) => (
			allPages.length * 20
		),
		select: result => (
			result
				.pages
				.filter(isTruthy)
				.flatMap((page) => page.auctionDetails)
				.filter(isTruthy)
				.map(auction => normalizeAuction(auction, network.chainId))
		),
		staleTime: 10 * 1000,
	})}
	bind:result={auctions}
	let:result={auctions}
	let:status let:pagination
	let:isOpen let:toggle
>
	<svelte:fragment slot="header"
		let:result={auctions}
		let:status
		let:pagination
		let:isOpen let:toggle
	>
		<slot name="header"
			{auctions}
			{status} {pagination}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{auctions}
		{status} {pagination}
		{isOpen} {toggle}
	/>
</Loader>
