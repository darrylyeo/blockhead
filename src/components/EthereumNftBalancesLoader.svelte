<script context="module">
	const queue = new ConcurrentPromiseQueue(1)
</script>


<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { NftProvider, nftProviderIcons } from '../data/nftProviders'
	
	import { type Covalent, getTokenAddressBalances } from '../api/covalent'

	import type { Nft } from '@liquality/wallet-sdk'

	import { NftportApi } from '../api/nftport'
	import type { AccountContractsResponse, AccountNftsResponse, AccountRequestSupportedChain } from '../api/nftport/api/Api'


	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	$: loadingMessage = `Retrieving ${network.name} NFTs from ${nftProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} NFTs from ${nftProvider}.`


	export let nftContractsWithBalances: Ethereum.NftContractWithBalance[] = []

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
	} | undefined

	$: summary = nftContractsWithBalances.length
		? {
			quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.quote ?? 0), 0),
			quoteCurrency,
			nftContractsCount: nftContractsWithBalances.length,
			nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts.length ?? 0), 0)
		}
		: undefined


	import { ConcurrentPromiseQueue } from '../utils/ConcurrentPromiseQueue'

	const normalizeAirstackNftsAndContracts = (data): Ethereum.NftWithBalance => (
		[
			...data.TokenBalances.TokenBalance
				?.groupToMap(tokenWithBalance => tokenWithBalance.tokenAddress)
				.entries()
			?? []
		]
			.map(([contractAddress, contractsWithBalances]) => ({
				chainId: Number(contractsWithBalances.chainId),
				address: contractAddress,
				name: contractsWithBalances[0].token.name,
				symbol: contractsWithBalances[0].token.symbol,
				decimals: contractsWithBalances[0].token.decimals,
				ercTokenStandards: [contractsWithBalances[0].token.type?.toLowerCase() as Ethereum.ERC20TokenStandard],
				metadata: {
					...contractsWithBalances[0].contractMetaData,
					description: contractsWithBalances[0].contractMetaData?.description,
					bannerImage: undefined,
					logoImage: contractsWithBalances[0].contractMetaData?.image,
				},
				totalSupply: contractsWithBalances[0].token.totalSupply,
				balance: contractsWithBalances.reduce((sum, item) => sum + Number(item.balance), 0),
				quote: undefined,
				quoteRate: undefined,
				nfts: contractsWithBalances
					.map(tokenWithBalance => tokenWithBalance.tokenNfts)
					.map(nft => ({
						owner: nft.address,
						tokenId: nft.tokenId,
						tokenUri: nft.tokenURI,
						metadata: {
							...nft.metaData && {
								name: nft.metaData.name,
								description: nft.metaData.description,
								image: nft.metaData.image,
								attributes: normalizeNFTAttributes(nft.metaData.attributes),
							}
						},
					})),
			}))
	)

	const normalizeCovalentContractWithBalance = (nftContractWithBalance: Covalent.NFTContractWithBalance): Ethereum.NftWithBalance => ({
		name: nftContractWithBalance.contract_name,
		address: nftContractWithBalance.contract_address,
		symbol: nftContractWithBalance.contract_ticker_symbol,
		ercTokenStandards: nftContractWithBalance.supports_erc?.filter(erc => erc !== 'erc20'),
	
		metadata: {
			description: undefined,
			bannerImage: undefined,
			logoImage: nftContractWithBalance.contract_logo_url || nftContractWithBalance.logo_url,
		},

		balance: nftContractWithBalance.balance,
		quote: nftContractWithBalance.quote,
		quoteRate: nftContractWithBalance.quote_rate,

		nfts: nftContractWithBalance.nft_data.map(nft => {
			const { attributes, ...metadata } = nft.external_data ?? {}

			return ({
				owner: nft.owner as Ethereum.Address,

				tokenId: nft.token_id,
				tokenUri: nft.token_url,
				
				metadata: {
					...metadata,
					attributes: normalizeNFTAttributes(attributes),
				},
			})
		}),
	})


	const normalizeLiqualityNftsAndContracts = (nfts: Nft[]): Ethereum.NftContractWithBalance[] => {
		if(!nfts)
			return []

		const contractsByAddress = Object.fromEntries(
			nfts.map(nft => [
				nft.contract.address,
				{
					address: nft.contract.address,
					name: nft.contract.name,
					symbol: nft.contract.symbol,
					ercTokenStandards: [nft.contract.type?.toLowerCase()] as Ethereum.ERCTokenStandard[],
					metadata: {
					// 	description: nft.contract.metadata?.description,
					// 	bannerImage: nft.contract.metadata?.banner_url || nft.contract.metadata?.cached_banner_url,
					// 	logoImage: nft.contract.metadata?.thumbnail_url || nft.contract.metadata?.cached_thumbnail_url,
					}
				} as Ethereum.NftContract
			])
		)

		const nftsByContractAddress: Record<Ethereum.Address, Ethereum.NftWithBalance[]> = {}

		for(const nft of nfts ?? []){
			const nftContract = contractsByAddress[nft.contract.address]
			const nfts = nftsByContractAddress[nft.contract.address as Ethereum.ContractAddress] ||= []

			nfts.push({
				contract: nftContract,
				owner: address,
				tokenId: nft.id,
				// tokenUri: nft.tokenUri,
				metadata: {
					...nft.metadata,
					name: nft.metadata ? String(nft.metadata.name) : undefined,
				},
				erc1155Balance: nft.balance,
			})
		}

		return Object.entries(nftsByContractAddress).map(([contractAddress, nfts]) => ({
			...{
				balance: nfts.length,
				...contractsByAddress[contractAddress],
			},
			nfts
		}))
	}


	const normalizeNftportNftsAndContracts = ({
		nftsResponse,
		nftContractsResponse
	}: {
		nftsResponse: AccountNftsResponse,
		nftContractsResponse: AccountContractsResponse
	}): Ethereum.NftWithBalance[] => {
		// const contractsByAddress: Map<string, NFTContract> = new Map<string, NFTContract>()
		const contractsByAddress = Object.fromEntries(
			nftContractsResponse.contracts.map(nftContract => [
				nftContract.address,
				{
					address: nftContract.address,
					name: nftContract.name,
					symbol: nftContract.symbol,
					ercTokenStandards: [nftContract.type?.toLowerCase()] as Ethereum.ERCTokenStandard[],
					metadata: {
						description: nftContract.metadata?.description,
						bannerImage: nftContract.metadata?.banner_url || nftContract.metadata?.cached_banner_url,
						logoImage: nftContract.metadata?.thumbnail_url || nftContract.metadata?.cached_thumbnail_url,
					}
				} as Ethereum.NftContract
			])
		)

		const nftsByContractAddress: Record<Ethereum.Address, NftWithBalance[]> = {}

		for(const nft of nftsResponse.nfts ?? []){
			const nftContract = contractsByAddress[nft.contract_address]
			const nfts = nftsByContractAddress[nft.contract_address as Ethereum.ContractAddress] ||= []

			nfts.push({
				contract: nftContract,
				owner: address,
				
				tokenId: Number(nft.token_id),
				tokenUri: nft.metadata_url,

				metadata: {
					...nft.metadata,
					name: nft.name,
					description: nft.metadata?.['description'],
					image: parseIpfs(nft.cached_file_url || nft.file_url || nft.metadata?.['image'] || nft.metadata?.['ipfs_image'] || nft.metadata?.['google_image']),
					attributes: normalizeNFTAttributes(nft.metadata?.['attributes']),
				},
			})

			// contractsByAddress[nft.contract_address] = {
			// 	contract_address: nft.contract_address,
			// 	contract_name: nft.contract?.name,
			// 	contract_ticker_symbol: nft.contract?.symbol,
			// 	ercTokenStandards: nft.contract?.type && [nft.contract.type.toLowerCase()], // as ERCTokenStandard[]
			// 	metadata: nft.contract?.metadata,
			// 	// {
			// 	// 	description: nft.contract?.metadata.description
			// 	// 	thumbnail_url
			// 	// 	cached_thumbnail_url
			// 	// 	banner_url
			// 	// 	cached_banner_url
			// 	// },
			// 	nft_data,
			// }
		}

		return Object.entries(nftsByContractAddress).map(([contractAddress, nfts]) => ({
			...{
				balance: nfts.length,
				...contractsByAddress[contractAddress],
			},
			nfts
		}))

		// return Object.entries(contractsByAddress).map(([contractAddress, contract]) => ({
		// 	...contract,
		// 	nfts: nftsByContractAddress[contractAddress]
		// }))
	}

	const normalizeNFTAttributes = (attributes: Covalent.NFTAttributes | undefined | null): Ethereum.NftAttribute[] => (
		!attributes ?
			[]
		: Array.isArray(attributes) ?
			attributes.map(({
				key,
				display_type,
				trait_type,
				value
			}) => ({
				key,
				displayType: display_type,
				traitType: trait_type,
				value
			}))
		:
			Object.entries(attributes).map(([trait_type, value]) => ({
				traitType: trait_type,
				value
			}))
	)

	const networkSlugToNftportChain: Record<Ethereum.NetworkName, AccountRequestSupportedChain> = {
		'ethereum': 'ethereum',
		'ethereum-rinkeby': 'rinkeby',
		// 'polygon': 'polygon',
	}

	const parseIpfs = (hashOrUri: string | undefined) =>
		hashOrUri?.replace(/^(Qm.+)$/, 'https://ipfs.io/ipfs/$1').replace(/^ipfs:\/\/(.+)$/, 'https://ipfs.io/ipfs/$1')


	import { createQuery } from '@tanstack/svelte-query'
	import { queryStore, gql } from '@urql/svelte';

	import { airstackNetworkNames, getClient } from '../api/airstack'


	import Loader from './Loader.svelte'
</script>


{#if nftProvider === NftProvider.Airstack}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={nftProviderIcons[nftProvider]}
		loadingIconName={nftProvider}
		{loadingMessage}
		{errorMessage}
		fromStore={() => {
			if(!(network.chainId in airstackNetworkNames))
				throw new Error(`Airstack doesn't yet support ${network.name}.`)

			return queryStore({
				client: getClient(),
				query: gql`
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
				variables: {
					address,
					blockchain: airstackNetworkNames[network.chainId],
					limit: 50,
					cursor: '',
				},
			})
		}}
		then={normalizeAirstackNftsAndContracts}
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

{:else if nftProvider === NftProvider.Covalent}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={nftProviderIcons[nftProvider]}
		loadingIconName={nftProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
				queryKey: ['NFTs', {
					nftProvider,
					address,
					chainID: network.chainId,
					quoteCurrency: quoteCurrency
				}],
				queryFn: async () => (
					await getTokenAddressBalances({
						address,
						nft: true,
						chainID: network.chainId,
						quoteCurrency: quoteCurrency
					})
				)
			})
		)}
		then={result => (
			result.items
				.filter(balance => balance.type === 'nft')
				.map(normalizeCovalentContractWithBalance)
		)}
		bind:result={nftContractsWithBalances}
		{isOpen}
		{containerClass}
		{contentClass}
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

{:else if nftProvider === NftProvider.Liquality}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={nftProviderIcons[nftProvider]}
		loadingIconName={nftProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
				queryKey: ['NFTs', {
					nftProvider,
					address,
					chainID: network.chainId,
					quoteCurrency: quoteCurrency
				}],
				queryFn: async () => {
					const { NftService } = await import('@liquality/wallet-sdk')

					const { liqualitySupportedNetworks } = await import('../api/liquality')

					if(!liqualitySupportedNetworks.includes(network.chainId))
						throw new Error(`Liquality doesn't yet support ${network.name}.`)

					return await NftService.getNfts(
						address,
						network.chainId
					)
				}
			})
		)}
		then={normalizeLiqualityNftsAndContracts}
		bind:result={nftContractsWithBalances}
		{isOpen}
		{containerClass}
		{contentClass}
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

{:else if nftProvider === NftProvider.NftPort}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={nftProviderIcons[nftProvider]}
		loadingIconName={nftProvider}
		{loadingMessage}
		{errorMessage}
		fromQuery={address && network && (
			createQuery({
				queryKey: ['NFTs', {
					nftProvider,
					address,
					chainID: network.chainId,
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
							chain
						})
					])
					//
				}
			})
		)}
		then={([nftsResponse, nftContractsResponse]) => (
			normalizeNftportNftsAndContracts({nftsResponse, nftContractsResponse})
		)}
		bind:result={nftContractsWithBalances}
		{isOpen}
		{containerClass}
		{contentClass}
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
{/if}
