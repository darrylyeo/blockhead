<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieOrder } from '$/api/moxie/auction/normalize'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'
	import type { MoxieAuctionId, MoxieUserId } from '$/api/moxie'


	// External state
	export let network: Ethereum.Network
	export let moxieProvider: MoxieProvider
	export let query: (
		// Unordered / chronological
		| undefined

		// Orders by auction
		| {
			auctionId: MoxieAuctionId,
		}

		// Orders by user
		| {
			userId: MoxieUserId,
		}
	)


	// Outputs
	export let orders: MoxieOrder[] | undefined

	type SharedSlotProps = {
		orders: typeof orders,
		status: Loader<any, any, any, any>['$$slot_def']['default']['status'],
		pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
			toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
		},
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { normalizeOrder } from '$/api/moxie/auction/normalize'


	// Components
	import Loader from '$/components/Loader.svelte'
</script>


<Loader
	{...$$restProps}
	loadingIcon={moxieProviderIcons[moxieProvider]}
	loadingIconName={moxieProvider}
	loadingMessage={`Loading orders from ${moxieProvider}...`}
	errorMessage={`Couldn't load orders from ${moxieProvider}.`}
	fromInfiniteQuery={createInfiniteQuery({
		queryKey: ['MoxieOrders', {
			moxieProvider,
			chainId: network.chainId,
			...query,
		}],
		initialPageParam: 0,
		queryFn: async ({
			queryKey: [_, {
				chainId,
				auctionId,
				userId,
			}],
			pageParam: skip,
		}) => {
			const { getOrders } = await import('$/api/moxie/auction')

			return await getOrders({
				chainId,
				filter: {
					auctionId,
					userId,
				},
				skip,
				first: 20,
				orderBy: 'timestamp',
				orderDirection: 'desc',
				orderDirection: 'asc',
			})
		},
		getNextPageParam: (lastPage, allPages) => (
			allPages.length * 20
		),
		select: result => {
			const ids = new Set()

			return result
				.pages
				.flatMap(page => page?.orders ?? [])
				.map(order => normalizeOrder(order, network.chainId))
				.filter(order => {
					if(ids.has(order.id))
						return false

					ids.add(order.id)
					return true
				})
		},
		staleTime: 1 * 1000,
	})}
	bind:result={orders}
	let:result={orders}
	let:status let:pagination
>
	<svelte:fragment slot="header"
		let:result={orders}
		let:status let:pagination
		let:isOpen let:toggle
	>
		<slot name="header"
			{orders}
			{status} {pagination}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{orders}
		{status} {pagination}
	/>
</Loader>
