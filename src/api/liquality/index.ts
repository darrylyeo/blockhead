import { setup } from '@liquality/wallet-sdk'
import { env } from '../../env'

setup({
	alchemyApiKey: env.ALCHEMY_API_KEY_1,
	etherscanApiKey: env.ETHERSCAN_API_KEY_1,
	infuraProjectId: env.INFURA_API_KEY,
	pocketNetworkApplicationID: env.POCKET_NETWORK_PORTAL_ID,
	quorum: 1,
	slowGasPriceMultiplier: 1,
	averageGasPriceMultiplier: 1.5,
	fastGasPriceMultiplier: 2,
	gasLimitMargin: 2000,
})


import type { Ethereum } from '../../data/networks/types'

export const liqualitySupportedNetworks = [
	1,
	137,
	10,
	42161,
] as const satisfies Ethereum.ChainID[]


import type { Nft } from '@liquality/wallet-sdk'

export const normalizeNftContracts = ({
	nfts,
	ownerAddress,
}: {
	nfts: Nft[],
	ownerAddress: Ethereum.Address,
}): Ethereum.NftContractWithNfts[] => {
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
			} as Ethereum.NftContract
		])
	) as Record<Ethereum.ContractAddress, Ethereum.NftContract>

	const nftsByContractAddress: Record<Ethereum.Address, Ethereum.NftWithBalance[]> = {}

	for(const nft of nfts ?? []){
		const nftContract = contractsByAddress[nft.contract.address as Ethereum.ContractAddress]
		const nfts = nftsByContractAddress[nft.contract.address as Ethereum.ContractAddress] ||= []

		nfts.push({
			contract: nftContract,
			owner: ownerAddress,
			tokenId: BigInt(nft.id),
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
			...contractsByAddress[contractAddress as Ethereum.ContractAddress],
		},
		nfts
	}))
}