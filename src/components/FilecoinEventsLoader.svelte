<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'
	import { networkBySlug } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let query: (
		| {
			tipsetNumber: Filecoin.TipsetNumber
		}
		| {
			tipsetCid: Filecoin.TipsetCid
		}
		| {
			transactionCid: Filecoin.TransactionCid
		}
		| {
			emitterActorAddress: Filecoin.Address
		}
		| {
			selector: string
		}
		| {
			type: 'native' | 'evm'
		}
	)
	export let filecoinTransactionProvider: FilecoinTransactionProvider

	// (Computed)
	$: filecoinTransactionProvider = $$props.filecoinTransactionProvider ?? $preferences.filecoinTransactionProvider


	// Outputs
	let result: {
		events?: Filecoin.Event[]
		eventsCount?: number
	} | undefined = undefined

	$: events = result?.events
	$: eventsCount = result?.eventsCount

	type SharedSlotProps = {
		events: typeof events
		eventsCount: typeof eventsCount
		pagination: Loader['$$slot_def']['default']['pagination']
	}

	type $$Slots = {
		header: SharedSlotProps
		default: SharedSlotProps
	}


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeEvent as normalizeEventBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeEvent as normalizeEventFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider]?.icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider]?.name ?? filecoinTransactionProvider}
	loadingMessage={`Loading events from ${filecoinTransactionProviders[filecoinTransactionProvider]?.name ?? filecoinTransactionProvider}...`}
	errorMessage={`Failed to load events from ${filecoinTransactionProviders[filecoinTransactionProvider]?.name ?? filecoinTransactionProvider}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromInfiniteQuery: (
				'tipsetNumber' in query ?
					createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							tipsetNumber: Number(query.tipsetNumber),
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								tipsetNumber: _tipsetNumber,
							}],
							pageParam: cursor,
						}) => {
							const tipsetNumber = BigInt(_tipsetNumber)

							const { baseUrls, getEventsByHeight } = await import('$/api/beryx/filecoin/index')

							return await getEventsByHeight(
								tipsetNumber,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => (
										result.events
										?? []
									))
									.map(event => (
										normalizeEventBeryx(event)
									))
							),
							eventsCount: result.pages[0]?.total_items ?? 0,
							nextCursor: result.pages[result.pages.length - 1]?.next_cursor,
						}),
						getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
					})

				: 'transactionCid' in query ?
					createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							transactionCid: query.transactionCid,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								transactionCid,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getEventsByTxCid } = await import('$/api/beryx/filecoin/index')

							return await getEventsByTxCid(
								transactionCid,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => (
										result.events
										?? []
									))
									.map(event => (
										normalizeEventBeryx(event)
									))
							),
							eventsCount: result.pages[0]?.total_items ?? 0,
							nextCursor: result.pages[result.pages.length - 1]?.next_cursor,
						}),
						getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
					})

				: 'emitterActorAddress' in query ?
					createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							emitterActorAddress: query.emitterActorAddress,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								emitterActorAddress,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getEventsByEmitter } = await import('$/api/beryx/filecoin/index')

							return await getEventsByEmitter(
								emitterActorAddress,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => (
										result.events
										?? []
									))
									.map(event => (
										normalizeEventBeryx(event)
									))
							),
							eventsCount: result.pages[0]?.total_items ?? 0,
							nextCursor: result.pages[result.pages.length - 1]?.next_cursor,
						}),
						getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
					})

				: 'selector' in query ?
					createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							selector: query.selector,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								selector,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getEventsBySelector } = await import('$/api/beryx/filecoin/index')

							return await getEventsBySelector(
								selector,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => (
										result.events
										?? []
									))
									.map(event => (
										normalizeEventBeryx(event)
									))
							),
							eventsCount: result.pages[0]?.total_items ?? 0,
							nextCursor: result.pages[result.pages.length - 1]?.next_cursor,
						}),
						getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
					})

				: 'type' in query ?
					createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							type: query.type,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								type,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getEventsByType } = await import('$/api/beryx/filecoin/index')

							return await getEventsByType(
								type,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => (
										result.events
										?? []
									))
									.map(event => (
										normalizeEventBeryx(event)
									))
							),
							eventsCount: result.pages[0]?.total_items ?? 0,
							nextCursor: result.pages[result.pages.length - 1]?.next_cursor,
						}),
						getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
					})

				:
					undefined
			)
		}),

		[FilecoinTransactionProvider.Filfox]: () => (
			'tipsetNumber' in query ?
				{
					fromInfiniteQuery: createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							tipsetNumber: Number(query.tipsetNumber),
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								tipsetNumber: _tipsetNumber,
							}],
							pageParam: cursor,
						}) => {
							const tipsetNumber = BigInt(_tipsetNumber)

							const { getTipsetEvents } = await import('$/api/filfox')

							return await getTipsetEvents({
								height: tipsetNumber,
								pageSize: 100,
								page: cursor,
							})
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => result.eventLogs)
									.map(eventLog => normalizeEventFilfox(eventLog))
							),
							eventsCount: result.pages[0]?.totalCount ?? 0,
						}),
						getNextPageParam: (lastPage, pages) => {
							const loadedItemsCount = (
								pages
									.flatMap(result => result.eventLogs)
									.length
							)

							if(loadedItemsCount < pages[0]?.totalCount)
								return loadedItemsCount
						},
					}),
				}

			: 'transactionCid' in query ?
				{
					fromQuery: createQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							transactionCid: query.transactionCid,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								transactionCid,
							}],
							pageParam: cursor,
						}) => {
							const { getMessageEvents } = await import('$/api/filfox')

							return await getMessageEvents(
								{
									cid: transactionCid,
									pageSize: 100,
									page: cursor,
								}
							)
						},
						select: result => ({
							events: (
								result
									.map(eventLog => normalizeEventFilfox(eventLog))
							),
							eventsCount: (
								result.length
							),
						}),
					}),
				}

			: 'emitterActorAddress' in query ?
				{
					fromInfiniteQuery: createInfiniteQuery({
						queryKey: ['FilecoinEvents', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							emitterActorAddress: query.emitterActorAddress
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								emitterActorAddress,
							}],
							pageParam: cursor,
						}) => {
							const { getAddressEvents } = await import('$/api/filfox')

							return await getAddressEvents({
								address: emitterActorAddress,
								pageSize: 100,
								page: cursor,
							})
						},
						select: result => ({
							events: (
								result.pages
									.flatMap(result => result.eventLogs)
									.map(eventLog => normalizeEventFilfox(eventLog))
							),
							eventsCount: result.pages[0]?.totalCount ?? 0,
						}),
						getNextPageParam: (lastPage, pages) => {
							const loadedItemsCount = (
								pages
									.flatMap(result => result.eventLogs)
									.length
							)

							if(loadedItemsCount < pages[0]?.totalCount)
								return loadedItemsCount
						},
					}),
				}

			:
				undefined
		),
	}[filecoinTransactionProvider]?.()}
	bind:result
	let:result
	let:pagination
>
	<svelte:fragment slot="header"
		let:result
		let:pagination
	>
		<slot name="header"
			events={result?.events}
			eventsCount={result?.eventsCount}
			{pagination}
		/>
	</svelte:fragment>

	<slot
		events={result?.events}
		eventsCount={result?.eventsCount}
		{pagination}
	/>
</Loader>
