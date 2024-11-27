<script context="module">
	const queue = new ConcurrentPromiseQueue(1)
</script>


<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import { NftProvider, nftProviderIcons } from '$/data/nftProviders'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any>['viewOptions']> | undefined


	// Internal state
	let pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination']

	// (Computed)
	$: loadingMessage = `Retrieving ${network.name} NFTs from ${nftProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} NFTs from ${nftProvider}.`


	// Outputs
	export let nftContractsWithBalances: Ethereum.NftContractWithNfts[] | undefined

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
		hasMore: boolean
	} | undefined

	$: summary = nftContractsWithBalances
		? {
			quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.conversion?.value ?? 0) * (item.nftsCount ?? item.nfts?.length ?? 0), 0),
			quoteCurrency,
			nftContractsCount: nftContractsWithBalances.length,
			nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts?.length ?? 0), 0),
			hasMore: pagination ? pagination.hasNextPage : false,
		}
		: undefined

	type SharedSlotProps = {
		nftContractsWithBalances: typeof nftContractsWithBalances,
		status: Loader<any, any, any, any>['$$slot_def']['default']['status'],
		pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			summary: typeof summary,
			loadingMessage: Loader<any, any, any, any>['$$slot_def']['header']['loadingMessage'],
			errorMessage: Loader<any, any, any, any>['$$slot_def']['header']['errorMessage'],
		},
	}


	// Functions
	import { createInfiniteQuery, createQuery, useQueryClient } from '@tanstack/svelte-query'

	const queryClient = useQueryClient()

	import { normalizeNftContracts as normalizeNftContractsAirstack } from '$/api/airstack/normalize'

	import { normalizeNftContract as normalizeNftContractBlockscout } from '$/api/blockscout/rest/normalize'

	import { normalizeNftContracts as normalizeNftContractsChainbase } from '$/api/chainbase/normalize'

	import { normalizeNftContract as normalizeNftContractCovalent } from '$/api/covalent/normalize'

	import { normalizeNftContracts as normalizeNftContractsDecommas } from '$/api/decommas/normalize'

	import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'
	import { normalizeNftContracts as normalizeNftContractsLiquality } from '$/api/liquality/normalize'

	import { networkSlugToNftportChain } from '$/api/nftport/index'
	import { normalizeNftContracts as normalizeNftContractsNftport } from '$/api/nftport/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
		...loaderViewOptions,
	}}
	loadingIcon={nftProviderIcons[nftProvider]}
	loadingIconName={nftProvider}
	{loadingMessage}
	{errorMessage}
	{...{
		[NftProvider.Airstack]: () => ({
			fromInfiniteQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						const { getNftsByAddress } = await import('$/api/airstack/index')

						return await getNftsByAddress({
							network,
							address,
							cursor,
						})
					},
					getPreviousPageParam: (firstPage) => firstPage.TokenBalances.pageInfo.prevCursor || undefined,
					getNextPageParam: (lastPage) => lastPage.TokenBalances.pageInfo.nextCursor || undefined,
					select: data => (
						normalizeNftContractsAirstack(
							data.pages
								.flatMap(page => (
									page?.TokenBalances?.TokenBalance ?? []
								))
						)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[NftProvider.Blockscout]: () => ({
			fromInfiniteQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency,
					}],
					initialPageParam: {},
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
						pageParam: next_page_params,
					}) => {
						const { getAddressNftCollections } = await import('$/api/blockscout/rest')
						const { getBlockscoutRestEndpoint } = await import('$/api/blockscout/index')

						return await getAddressNftCollections(
							address,
							{
								$type: 'ERC-721',
							},
							{
								baseUrl: getBlockscoutRestEndpoint(chainId),
								fetch: (url, ...args) => (
									fetch(new URL(`?${new URLSearchParams(next_page_params)}`, url), ...args)
								),
							}
						)
					},
					getNextPageParam: lastPage => lastPage.next_page_params,
					select: result => (
						result
							.pages
							.flatMap(page => page.items)
							.map(item => normalizeNftContractBlockscout(item, network))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[NftProvider.Chainbase]: () => ({
			fromQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					queryFn: async ({ pageParam: nextPage = 0 }) => {
						const { getNftsByAddress } = await import('$/api/chainbase')

						return await getNftsByAddress({
							chainId: network.chainId,
							address,
							page: nextPage,
						})
					},
					getNextPageParam: lastPage => lastPage.next_page,
					select: result => (
						normalizeNftContractsChainbase(
							result.pages?.flatMap(page => page.data)
						)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[NftProvider.Covalent]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					queryFn: async () => {
						const { getNftsForAddress } = await import('$/api/covalent/index')

						return await getNftsForAddress({
							chainName: network.chainId,
							walletAddress: address,
							quoteCurrency: 'EUR',
							noSpam: true,
						})
					},
					select: result => (
						result.items
							.filter(tokenContract => tokenContract.type === 'nft')
							.map(tokenContract => normalizeNftContractCovalent(tokenContract, quoteCurrency, address))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[NftProvider.Decommas]: () => ({
			fromInfiniteQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					initialPageParam: 0,
					queryFn: async ({ pageParam: offset }) => {
						const { decommas, chainNameByChainId } = await import('$/api/decommas')

						const chains = [chainNameByChainId[network.chainId]]

						const nftsResponse = await decommas.address.getNfts({
							chains,
							address,
							limit: 10,
							offset,
						})

						// return nftsResponse

						return {
							...nftsResponse,
							result: await Promise.all(
								nftsResponse.result.map(async nft => ({
									nft,
									metadata: await queryClient.fetchQuery({
										queryKey: ['NftMetadata', {
											nftProvider,
											contractAddress: nft.contractAddress,
											tokenId: nft.tokenId,
											chainId: network.chainId,
											quoteCurrency: quoteCurrency
										}],
										queryFn: async () => (
											await queue.enqueue(() => decommas.metadata.getNft({
												chainName: chains[0],
												contractAddress: nft.contractAddress,
												tokenId: nft.tokenId,
											}))
										),
									}).catch(() => undefined)
								}))
							)
						}
					},
					getNextPageParam: (lastPage, allPages) => allPages.flatMap(page => page.result).length < lastPage.count ? allPages.flatMap(page => page.result).length : undefined,
					select: ({ pages }) => (
						normalizeNftContractsDecommas(
							pages.flatMap(page => page.result),
							address,
						)
					),
				})
			),
		}),

		[NftProvider.Liquality]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					queryFn: async () => {
						const { NftService } = await import('@liquality/wallet-sdk')
						const { liqualitySupportedNetworks } = await import('$/api/liquality/index')

						if(!liqualitySupportedNetworks.includes(network.chainId))
							throw new Error(`Liquality doesn't yet support ${network.name}.`)

						return await NftService.getNfts(
							address,
							network.chainId
						)
					},
					select: nfts => (
						normalizeNftContractsLiquality({
							nfts,
							ownerAddress: address,
						})
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[NftProvider.NftPort]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['NFTs', {
						nftProvider,
						address,
						chainId: network.chainId,
						quoteCurrency: quoteCurrency
					}],
					queryFn: async () => {
						const { NftportApi } = await import('$/api/nftport/index')

						const chain = networkSlugToNftportChain[network.slug]
						if(!chain)
							throw new Error(`NFTPort does not support the ${network.name} network.`)

						return await Promise.all([
							NftportApi.v0.accountNftsV0AccountsAccountAddressGet({
								accountAddress: address,
								include: ['default', 'metadata', 'contract_information'],
								chain
							}),
							NftportApi.v0.accountContractsV0AccountsContractsAccountAddressGet({
								accountAddress: address,
								type: 'owns_contract_nfts',
								include: ['default', 'metadata', 'contract_information'],
								chain,
							})
						])
						//
					},
					select: ([nftsResponse, nftContractsResponse]) => (
						normalizeNftContractsNftport({
							nftsResponse,
							nftContractsResponse,
							ownerAddress: address,
						})
					),
					staleTime: 10 * 1000,
				})
			),
		})
	}[nftProvider]?.()}
	bind:result={nftContractsWithBalances}
	let:result={nftContractsWithBalances}
	let:status
	bind:pagination
	let:pagination
>
	<svelte:fragment slot="header"
		let:result={nftContractsWithBalances}
		let:status
		let:pagination
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header"
			{nftContractsWithBalances}
			{summary}
			{status} {pagination}
			{loadingMessage} {errorMessage}
		/>
	</svelte:fragment>

	<slot
		{nftContractsWithBalances}
		{status} {pagination}
	/>
</Loader>
