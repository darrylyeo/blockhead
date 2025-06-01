import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Actor } from '$/entities/actor'
import { ActorType } from '$/entities/actor'
import { parseUsdPrice } from '../index'

export const fetch = async (chainId: ChainId, address: Address) => {
	const { SUPPORTED_CHAINS } = await import('$/api/1inch/index')
	
	if (!SUPPORTED_CHAINS.includes(chainId as any)) {
		throw new Error(`Chain ${chainId} not supported by 1inch balances API`)
	}
	
	const { balances } = await import('$/api/1inch/index')
	
	try {
		return await (balances[chainId as keyof typeof balances] as any)({
			walletAddress: address
		})
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Address ${address} not found on chain ${chainId}`)
			}
			if (error.message.includes('429')) {
				throw new Error('1inch API rate limit exceeded. Please try again later')
			}
		}
		throw new Error(`1inch API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, address: Address): Actor => {
	const tokens = Object.entries(data as Record<string, any>)
	const nativeToken = tokens.find(([addr]) => addr.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')?.[1]
	const totalBalanceUsd = tokens.reduce((total, [, info]: [string, any]) => (
		total + (
			info?.price?.usd && info?.balance ?
				(Number(info.balance) / Math.pow(10, info.decimals ?? 18)) * parseFloat(info.price.usd)
			: 0
		)
	), 0)
	const hasHighValueTokens = tokens.some(([, info]: [string, any]) => 
		parseUsdPrice(info?.price) && parseUsdPrice(info?.price)! > 1000
	)

	return {
		type: ActorType.Eoa,
		address,
		chainId,
		balance: BigInt((nativeToken as any)?.balance ?? '0'),
		...totalBalanceUsd > 0 && { balanceUsd: BigInt(Math.floor(totalBalanceUsd * 1000000)) },
		...tokens.length > 1 && {
			tags: [
				'multi-token-holder',
				...(tokens.length > 10 ? ['active-trader'] : []),
				...(hasHighValueTokens ? ['high-value-tokens'] : []),
			]
		},
		...tokens.length > 0 && {
			portfolioMetrics: {
				tokenCount: tokens.length,
				totalValueUsd: totalBalanceUsd,
				diversificationIndex: Math.min(tokens.length / 20, 1),
			}
		},
	}
}
