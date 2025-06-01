import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Balance } from '$/entities/balance'
import { BalanceType, BalanceCategory } from '$/entities/balance'
import { TokenStandard } from '$/entities/token'
import { getChainNativeCurrency } from '$/data/networks'
import { parseUsdPrice, calculateUsdValue } from '../index'

// 1inch supported chains mapping
const SUPPORTED_CHAINS = new Set([1, 137, 42161, 501])

// Chain-specific configuration for 1inch
const getChainConfig = (chainId: ChainId) => {
	switch (chainId) {
		case 1: return { name: 'Ethereum', nativeSymbol: 'ETH', nativeDecimals: 18 }
		case 137: return { name: 'Polygon', nativeSymbol: 'MATIC', nativeDecimals: 18 }
		case 42161: return { name: 'Arbitrum', nativeSymbol: 'ETH', nativeDecimals: 18 }
		case 501: return { name: 'Solana', nativeSymbol: 'SOL', nativeDecimals: 9 }
		default: return { name: 'Unknown', nativeSymbol: 'UNKNOWN', nativeDecimals: 18 }
	}
}

export const fetch = async (chainId: ChainId, owner: Address) => {
	const { SUPPORTED_CHAINS } = await import('$/api/1inch/index')
	
	if (!SUPPORTED_CHAINS.includes(chainId as any)) {
		throw new Error(`No 1inch endpoint available for chain ${chainId}`)
	}
	
	const { balances } = await import('$/api/1inch/index')
	
	try {
		return await (balances[chainId as keyof typeof balances] as any)({
			walletAddress: owner,
		})
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Address ${owner} not found on chain ${chainId}`)
			}
			if (error.message.includes('429')) {
				throw new Error('1inch API rate limit exceeded. Please try again later')
			}
		}
		throw new Error(`1inch API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, owner: Address): Balance[] => 
	Object.keys(data).length === 0 ? [] :
		Object.entries(data as Record<string, any>)
			.map(([tokenAddress, balanceInfo]: [string, any]) => {
				const isValidBalance = balanceInfo?.balance && balanceInfo.balance !== '0' && /^\d+$/.test(balanceInfo.balance)
				if (!isValidBalance) return null
				
				const chainConfig = getChainNativeCurrency(chainId)
				const isNative = tokenAddress.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
				const decimals = Number(balanceInfo.decimals) ?? (isNative ? chainConfig.decimals : 18)
				const symbol = balanceInfo.symbol ?? (isNative ? chainConfig.symbol : 'UNKNOWN')
				const name = balanceInfo.name ?? (isNative ? chainConfig.name : 'Unknown Token')
				const balanceUsd = calculateUsdValue(balanceInfo.balance, decimals, parseUsdPrice(balanceInfo.price))
				const currentPrice = parseUsdPrice(balanceInfo.price)
				
				return {
					id: `${chainId}-${owner.toLowerCase()}-${tokenAddress.toLowerCase()}`,
					chainId,
					standard: isNative ? TokenStandard.Native : TokenStandard.Erc20,
					types: [BalanceType.Available],
					category: BalanceCategory.Wallet,
					balance: BigInt(balanceInfo.balance),
					...balanceUsd && { balanceUsd },
					timestamp: Math.floor(Date.now() / 1000),
					isActive: true,
					...isNative && {
						nativeData: {
							symbol,
							decimals,
							networkName: chainConfig.networkName,
							availableForGas: BigInt(balanceInfo.balance),
						}
					},
					...!isNative && {
						erc20Data: {
							name,
							symbol,
							decimals,
							liquidityAvailable: true,
							...currentPrice && { currentPrice },
							contractAddress: tokenAddress,
						}
					},
				}
			})
			.filter(Boolean)
			.sort((a: any, b: any) => (
				a?.balanceUsd && b?.balanceUsd ? Number(b.balanceUsd - a.balanceUsd) :
				a?.balanceUsd && !b?.balanceUsd ? -1 :
				!a?.balanceUsd && b?.balanceUsd ? 1 :
				Number(b.balance - a.balance)
			)) as Balance[]
} 