// Types
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { Nft } from '@liquality/wallet-sdk'


// Functions
export const normalizeNftContracts = ({
	nfts, ownerAddress,
}: {
	nfts: Nft[] | null;
	ownerAddress: Ethereum.Address;
}): Ethereum.NftContractWithNfts[] => {
	if (!nfts)
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

	for (const nft of nfts ?? []) {
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

export const normalizeTokenBalance = (
	asset: Awaited<ReturnType<typeof import('@liquality/wallet-sdk').ERC20Service.listAccountTokens>>[number],
	chainId: Ethereum.ChainID,
): TokenWithBalance => ({
	token: {
		chainId,
		address: asset.tokenContractAddress as Ethereum.ContractAddress ?? undefined,
		name: asset.tokenName ?? '',
		symbol: asset.tokenSymbol ?? undefined,
	},
	balance: asset.rawBalance ? BigInt(asset.rawBalance) : undefined,
})
