import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Balance } from '$/entities/balance'
import { BalanceType, BalanceCategory } from '$/entities/balance'
import { TokenStandard } from '$/entities/token'
import { getChainNativeCurrency } from '$/data/networks'

// ERC20 ABI for token operations
const erc20Abi = [
	{
		constant: true,
		inputs: [{ name: 'owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [{ name: '', type: 'uint8' }],
		type: 'function',
	},
] as const

export const fetch = async (chainId: ChainId, owner: Address, tokenAddress?: Address) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		const blockNumber = await client.getBlockNumber()
		
		if (!tokenAddress) {
			const balance = await client.getBalance({ 
				address: owner as `0x${string}`,
				blockNumber,
			})
			
			return {
				balance: balance.toString(),
				blockNumber: Number(blockNumber),
				isNative: true,
				...getChainNativeCurrency(chainId),
			}
		} else {
			const [balance, name, symbol, decimals] = await Promise.allSettled([
				client.readContract({
					address: tokenAddress as `0x${string}`,
					abi: erc20Abi,
					functionName: 'balanceOf',
					args: [owner as `0x${string}`],
					blockNumber,
				}) as Promise<bigint>,
				client.readContract({
					address: tokenAddress as `0x${string}`,
					abi: erc20Abi,
					functionName: 'name',
					blockNumber,
				}) as Promise<string>,
				client.readContract({
					address: tokenAddress as `0x${string}`,
					abi: erc20Abi,
					functionName: 'symbol',
					blockNumber,
				}) as Promise<string>,
				client.readContract({
					address: tokenAddress as `0x${string}`,
					abi: erc20Abi,
					functionName: 'decimals',
					blockNumber,
				}) as Promise<number>,
			])
			
			if (balance.status === 'rejected') {
				throw new Error(`Failed to read token balance. Token ${tokenAddress} may not be a valid ERC20 contract`)
			}
			
			return {
				balance: balance.value.toString(),
				blockNumber: Number(blockNumber),
				isNative: false,
				tokenAddress,
				name: name.status === 'fulfilled' ? name.value : 'Unknown Token',
				symbol: symbol.status === 'fulfilled' ? symbol.value : 'UNKNOWN',
				decimals: decimals.status === 'fulfilled' ? decimals.value : 18,
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('Chain not supported')) {
				throw new Error(`Chain ${chainId} not supported by viem`)
			}
			if (error.message.includes('execution reverted')) {
				throw new Error(`Contract call reverted. Address ${tokenAddress || owner} may not be a valid contract`)
			}
		}
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, owner: Address, tokenAddress?: Address): Balance => ({
	id: `${chainId}-${owner.toLowerCase()}-${(tokenAddress || 'native').toLowerCase()}`,
	chainId,
	standard: data.isNative ? TokenStandard.Native : TokenStandard.Erc20,
	types: [BalanceType.Available],
	category: BalanceCategory.Wallet,
	balance: BigInt(data.balance || '0'),
	...data.blockNumber && { blockNumber: BigInt(data.blockNumber) },
	timestamp: Math.floor(Date.now() / 1000),
	isActive: data.balance !== '0',
	...data.isNative && {
		nativeData: {
			symbol: data.symbol,
			decimals: data.decimals,
			networkName: data.networkName,
			availableForGas: BigInt(data.balance || '0'),
		}
	},
	...!data.isNative && {
		erc20Data: {
			name: data.name,
			symbol: data.symbol,
			decimals: data.decimals,
			liquidityAvailable: true,
		}
	},
}) 