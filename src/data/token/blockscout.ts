import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Token } from '$/entities/token'
import { TokenStandard, TokenType } from '$/entities/token'

export const fetch = async ({
	chainId,
	address
}: {
	chainId: ChainId
	address: Address
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	try {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetToken($contractAddressHash: AddressHash!) {
							token(contractAddressHash: $contractAddressHash) {
								contractAddressHash
								name
								symbol
								decimals
								totalSupply
								type
								holderCount
								iconUrl
								circulatingMarketCap
								volume24h
							}
						}
					`),
					{
						contractAddressHash: address
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.token) {
						throw new Error('Token not found')
					}

					return data.token
				})
		)
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Token ${address} not found on chain ${chainId}`)
			}
		}
		throw new Error(`Blockscout API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, { chainId, address }: { chainId: ChainId, address: Address }): Token => {
	const tokenType = data.type?.toUpperCase()
	
	return {
		address,
		chainId,
		standard: (
			tokenType?.includes('ERC-721') || tokenType?.includes('ERC721') ? TokenStandard.Erc721 :
			tokenType?.includes('ERC-1155') || tokenType?.includes('ERC1155') ? TokenStandard.Erc1155 :
			tokenType?.includes('ERC-4626') || tokenType?.includes('ERC4626') ? TokenStandard.Erc4626 :
			TokenStandard.Erc20
		),
		types: [
			tokenType?.includes('721') || tokenType?.includes('1155') ? TokenType.Collectible :
			tokenType?.includes('4626') ? TokenType.Yield :
			data.name?.toLowerCase().includes('stablecoin') || data.symbol?.toLowerCase().includes('usd') ? TokenType.Stablecoin :
			data.name?.toLowerCase().includes('governance') || data.symbol?.toLowerCase().includes('gov') ? TokenType.Governance :
			data.name?.toLowerCase().includes('lp') || data.name?.toLowerCase().includes('liquidity') ? TokenType.Lp :
			TokenType.Utility
		],
		...data.decimals !== undefined && { decimals: data.decimals },
		metadata: {
			address,
			chainId,
			name: data.name || 'Unknown Token',
			symbol: data.symbol || 'UNKNOWN',
			...data.decimals !== undefined && { decimals: data.decimals },
			...data.iconUrl && { logoUri: data.iconUrl },
			tags: [
				...(data.type ? [data.type] : []),
				...(data.holderCount > 1000 ? ['popular'] : []),
				...(data.totalSupply && BigInt(data.totalSupply) > 0 ? ['active'] : []),
			].filter(Boolean),
		},
		...data.totalSupply && { totalSupply: data.totalSupply },
		...data.holderCount && { holderCount: data.holderCount },
		...data.circulatingMarketCap && { marketCap: data.circulatingMarketCap },
		...data.volume24h && { volume24h: data.volume24h },
		verification: {
			isVerified: true,
			verificationSource: 'blockscout',
			riskLevel: 'low',
			riskFactors: [],
		},
		...(!tokenType?.includes('721') && !tokenType?.includes('1155')) && {
			erc20Data: {
				name: data.name || 'Unknown Token',
				symbol: data.symbol || 'UNKNOWN',
				...data.decimals !== undefined && { decimals: data.decimals },
			}
		},
		...tokenType?.includes('721') && {
			nftData: {
				name: data.name || 'Unknown Collection',
				symbol: data.symbol || 'UNKNOWN',
				...data.holderCount && { ownerCount: data.holderCount },
			}
		},
		...tokenType?.includes('1155') && {
			multiTokenData: {
				uri: '',
				tokenTypes: {
					fungible: 0,
					nonFungible: data.holderCount || 0,
					semiFungible: 0,
				},
			}
		},
	}
}
