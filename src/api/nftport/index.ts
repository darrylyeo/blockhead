import { env } from '../../env'
import { HttpClient, Api } from './api/Api'

export const NftportApi = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'Authorization': env.NFTPORT_API_KEY
		}
	}
}))


import type { Ethereum } from '../../data/networks/types'
import type { AccountRequestSupportedChain, AccountNftsResponse, AccountContractsResponse } from './api/Api'

import { normalizeNftAttributes } from '../../utils/normalizeNftAttributes'


export const networkSlugToNftportChain: Record<Ethereum.NetworkName, AccountRequestSupportedChain> = {
	'ethereum': 'ethereum',
	'ethereum-rinkeby': 'rinkeby',
	// 'polygon': 'polygon',
}

export const normalizeNftContracts = ({
	nftsResponse,
	nftContractsResponse,
	ownerAddress,
}: {
	nftsResponse: AccountNftsResponse,
	nftContractsResponse: AccountContractsResponse,
	ownerAddress: Ethereum.Address,
}): Ethereum.NftContractWithNfts[] => {
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

	const nftsByContractAddress: Record<Ethereum.Address, Ethereum.NftWithBalance[]> = {}

	for(const nft of nftsResponse.nfts ?? []){
		const nftContract = contractsByAddress[nft.contract_address]
		const nfts = nftsByContractAddress[nft.contract_address as Ethereum.ContractAddress] ||= []

		nfts.push({
			contract: nftContract,
			owner: ownerAddress,
			
			tokenId: BigInt(nft.token_id),
			tokenUri: nft.metadata_url,

			metadata: {
				...nft.metadata,
				name: nft.name,
				description: nft.metadata?.['description'],
				image: parseIpfs(nft.cached_file_url || nft.file_url || nft.metadata?.['image'] || nft.metadata?.['ipfs_image'] || nft.metadata?.['google_image']),
				attributes: nft.metadata && 'attributes' in nft.metadata ? normalizeNftAttributes(nft.metadata['attributes']) : undefined,
			},
		})

		// contractsByAddress[nft.contract_address] = {
		// 	contract_address: nft.contract_address,
		// 	contract_name: nft.contract?.name,
		// 	contract_ticker_symbol: nft.contract?.symbol,
		// 	ercTokenStandards: nft.contract?.type && [nft.contract.type.toLowerCase()], // as Ethereum.ERCTokenStandard[]
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

	return Object.entries(nftsByContractAddress).map(([contractAddress, nfts]): Ethereum.NftContractWithNfts => ({
		...contractsByAddress[contractAddress],

		nftsCount: nfts.length,
		nfts
	}))

	// return Object.entries(contractsByAddress).map(([contractAddress, contract]): Ethereum.NftContractWithNfts => ({
	// 	...contract,
	// 	nfts: nftsByContractAddress[contractAddress as Ethereum.ContractAddress]
	// }))
}

const parseIpfs = (hashOrUri: string | undefined) =>
	hashOrUri?.replace(/^(Qm.+)$/, 'https://ipfs.io/ipfs/$1').replace(/^ipfs:\/\/(.+)$/, 'https://ipfs.io/ipfs/$1')
