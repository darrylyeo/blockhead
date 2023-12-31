<script context="module">
	const queue = new ConcurrentPromiseQueue(1)
</script>


<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { NftProvider, nftProviderIcons } from '../data/nftProviders'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	// Internal state
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
	} | undefined

	$: summary = nftContractsWithBalances?.length
		? {
			quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.conversion?.value ?? 0), 0),
			quoteCurrency,
			nftContractsCount: nftContractsWithBalances.length,
			nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts?.length ?? 0), 0)
		}
		: undefined

	type SharedSlotProps = {
		nftContractsWithBalances: typeof nftContractsWithBalances,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			summary: typeof summary,
			loadingMessage: typeof loadingMessage,
			errorMessage: typeof errorMessage,
		},
	}


	// Functions
	import { createInfiniteQuery, createQuery, useQueryClient } from '@tanstack/svelte-query'

	const queryClient = useQueryClient()

	import { gql } from '@urql/svelte'
	import { airstackNetworkNames, getClient } from '../api/airstack/index'
	import { normalizeNftContracts as normalizeNftContractsAirstack } from '../api/airstack/normalize'

	import { normalizeNftContracts as normalizeNftContractsChainbase } from '../api/chainbase/normalize'

	import { getNftsForAddress as getNftsForAddressCovalent } from '../api/covalent/index'
	import { normalizeNftContract as normalizeNftContractCovalent } from '../api/covalent/normalize'

	import { normalizeNftContracts as normalizeNftContractsDecommas } from '../api/decommas/normalize'

	import { ConcurrentPromiseQueue } from '../utils/ConcurrentPromiseQueue'
	import { normalizeNftContracts as normalizeNftContractsLiquality } from '../api/liquality/index'

	import { NftportApi, networkSlugToNftportChain, normalizeNftContracts as normalizeNftContractsNftport } from '../api/nftport'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	layout="collapsible"
	collapsibleType="label"
	loadingIcon={nftProviderIcons[nftProvider]}
	loadingIconName={nftProvider}
	{loadingMessage}
	{errorMessage}
	{...$$restProps}
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
						if(!(network.chainId in airstackNetworkNames))
							throw new Error(`Airstack doesn't yet support ${network.name}.`)

						return await getClient().query(gql`
							query NftBalances(
								$address: Identity!, 
								$blockchain: TokenBlockchain!, 
								$limit: Int!, 
								$cursor: String!
							) {
								TokenBalances(
									input: {
										filter: {
											owner: {_in: [$address]},
											tokenType: { _in: [ERC721, ERC1155] }
										},
										blockchain: $blockchain,
										limit: $limit,
										cursor: $cursor
									}
								) {
									TokenBalance {
										tokenAddress
										tokenNfts {
											id
											address
											tokenId
											type
											rawMetaData
											chainId
											contentType
											blockchain
											# contentValue {
											# 	audio
											# 	animation_url {
											# 		original
											# 	}
											# 	image {
											# 		extraSmall
											# 		large
											# 		medium
											# 		original
											# 		small
											# 	}
											# 	video
											# }
											lastTransferBlock
											lastTransferHash
											lastTransferTimestamp
											metaData {
												animationUrl
												attributes {
													displayType
													maxValue
													trait_type
													value
												}
												backgroundColor
												description
												externalUrl
												image
												imageData
												name
												youtubeUrl
											}
											tokenURI
											totalSupply
										}
										owner {
											addresses
											identity
										}
										tokenId
										amount
										blockchain
										chainId
										formattedAmount
										id
										lastUpdatedTimestamp
										lastUpdatedBlock
										tokenType
										token {
											address
											blockchain
											baseURI
											chainId
											contractMetaData {
												description
												externalLink
												feeRecipient
												image
												name
												sellerFeeBasisPoints
											}
											type
											totalSupply
											tokenTraits
											symbol
											rawContractMetaData
											projectDetails {
												collectionName
												description
												discordUrl
												externalUrl
												twitterUrl
											}
											name
											logo {
												external
												large
												medium
												original
												small
											}
											lastTransferTimestamp
											lastTransferHash
											lastTransferBlock
											id
											decimals
											contractMetaDataURI
										}
									}
									pageInfo {
										nextCursor
										prevCursor
									}
								}
							}
						`,
						{
							address,
							blockchain: airstackNetworkNames[network.chainId],
							limit: 50,
							cursor,
						})
							.toPromise()
							.then(result => {
								if(result.error)
									throw result.error

								return result.data
							})
					},
					getPreviousPageParam: (firstPage) => firstPage.TokenBalances.pageInfo.prevCursor || undefined,
					getNextPageParam: (lastPage) => lastPage.TokenBalances.pageInfo.nextCursor || undefined,
					select: data => (
						normalizeNftContractsAirstack(data.pages.flatMap(page => page.TokenBalances.TokenBalance))
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
						const { getNftsByAddress } = await import('../api/chainbase')

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
					queryFn: async () => (
						await getNftsForAddressCovalent({
							chainName: network.chainId,
							walletAddress: address,
							quoteCurrency: 'EUR',
							noSpam: true,
						})
					),
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
						const { decommas, chainNameByChainId } = await import('../api/decommas')

						const chains = [chainNameByChainId[network.chainId]]

						const nftsResponse = await decommas.address.getNfts({
							chains,
							address,
							limit: 10,
							offset,
						})

						// return nftsResponse

						const queue = new ConcurrentPromiseQueue(1)

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

						const { liqualitySupportedNetworks } = await import('../api/liquality/index')

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
	debug
	{isOpen}
	{containerClass}
	{contentClass}
	bind:result={nftContractsWithBalances}
	let:result={nftContractsWithBalances}
>
	<svelte:fragment slot="header"
		let:result={nftContractsWithBalances}
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header" {nftContractsWithBalances} {summary} {status} {loadingMessage} {errorMessage} />
	</svelte:fragment>

	<slot {nftContractsWithBalances} />
</Loader>
