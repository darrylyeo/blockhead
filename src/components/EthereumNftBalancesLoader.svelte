<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import { NftProvider, nftProviderIcons } from '../data/nftProviders'
	
	import { type Covalent, getTokenAddressBalances } from '../api/covalent'

	import { NftportApi } from '../api/nftport'
	import type { AccountContractsResponse, AccountNftsResponse, AccountRequestSupportedChain } from '../api/nftport/api/Api'


	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	export let nftContractsWithBalances: Ethereum.NftContractWithBalance[] = []

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		nftContractsCount: number,
		nftsCount: number,
	}
	$: summary = nftContractsWithBalances.length
		? {
			quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.quote ?? 0), 0),
			quoteCurrency,
			nftContractsCount: nftContractsWithBalances.length,
			nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts.length ?? 0), 0)
		}
		: undefined


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


	import { useQuery } from '@sveltestack/svelte-query'
	import Loader from './Loader.svelte'
</script>


{#if nftProvider === NftProvider.Covalent}
	<Loader
		layout="collapsible"
		collapsibleType="label"
		loadingIcon={nftProviderIcons[nftProvider]}
		loadingIconName={nftProvider}
		loadingMessage="Retrieving {network.name} NFTs from {nftProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {nftProvider}"
		fromUseQuery={
			useQuery({
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
		}
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
		<svelte:fragment slot="header" let:status let:loadingMessage let:errorMessage>
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
		loadingMessage="Retrieving {network.name} NFTs from {nftProvider}..."
		errorMessage="Error retrieving {network.name} NFTs from {nftProvider}"
		fromUseQuery={
			useQuery({
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
		}
		then={([nftsResponse, nftContractsResponse]) => (
			normalizeNftportNftsAndContracts({nftsResponse, nftContractsResponse})
		)}
		bind:result={nftContractsWithBalances}
		{isOpen}
		{containerClass}
		{contentClass}
	>
		<svelte:fragment slot="header" let:status let:loadingMessage let:errorMessage>
			<slot name="header" {nftContractsWithBalances} {summary} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<slot {nftContractsWithBalances} />
	</Loader>
{/if}
