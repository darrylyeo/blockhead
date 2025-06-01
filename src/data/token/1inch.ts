import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Token } from '$/entities/token'
import { TokenStandard, TokenType } from '$/entities/token'
import { parseUsdPrice } from '../index'

export const fetch = async (chainId: ChainId, tokenAddress: Address) => {
	const { SUPPORTED_CHAINS } = await import('$/api/1inch/index')
	
	if (!SUPPORTED_CHAINS.includes(chainId as any)) {
		throw new Error(`Chain ${chainId} not supported by 1inch token API`)
	}
	
	const { swap } = await import('$/api/1inch/index')
	const tokenEndpoint = swap[chainId as keyof typeof swap]?.tokens
	
	if (!tokenEndpoint) {
		throw new Error(`No token endpoint available for chain ${chainId}`)
	}
	
	try {
		const response = await (tokenEndpoint as any)()
		
		if (!response.tokens || !response.tokens[tokenAddress]) {
			throw new Error(`Token ${tokenAddress} not found in 1inch token list`)
		}
		
		return {
			...response.tokens[tokenAddress],
			chainId,
			address: tokenAddress,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('429')) {
				throw new Error('1inch API rate limit exceeded. Please try again later')
			}
		}
		throw new Error(`1inch API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, tokenAddress: Address): Token => ({
	address: tokenAddress,
	chainId,
	standard: TokenStandard.Erc20,
	types: [
		data.name?.toLowerCase().includes('stable') || data.symbol?.toLowerCase().includes('usd') ? TokenType.Stablecoin :
		data.name?.toLowerCase().includes('governance') || data.symbol?.toLowerCase().includes('gov') ? TokenType.Governance :
		data.name?.toLowerCase().includes('lp') || data.name?.toLowerCase().includes('liquidity') ? TokenType.Lp :
		TokenType.Utility
	],
	...data.decimals && { decimals: data.decimals },
	metadata: {
		address: tokenAddress,
		chainId,
		name: data.name || 'Unknown Token',
		symbol: data.symbol || 'UNKNOWN',
		...data.decimals && { decimals: data.decimals },
		...data.logoURI && { logoUri: data.logoURI },
		tags: [
			...(data.tags || []),
			'1inch-verified',
		],
	},
	verification: {
		isVerified: true,
		verificationSource: '1inch',
		riskLevel: 'low',
		riskFactors: [],
	},
	erc20Data: {
		name: data.name || 'Unknown Token',
		symbol: data.symbol || 'UNKNOWN',
		...data.decimals && { decimals: data.decimals },
	},
}) 