import type { Hash, Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Storage } from '$/entities/storage'
import { StorageOperation, StorageContext, StorageGranularity } from '$/entities/storage'

export const fetch = async (chainId: ChainId, contractAddress: Address, storageSlot: Hash) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Get current storage value
		const storageValue = await client.getStorageAt({
			address: contractAddress as `0x${string}`,
			slot: storageSlot as `0x${string}`,
		})
		
		// Get current block number for context
		const blockNumber = await client.getBlockNumber()
		
		return {
			contractAddress,
			storageSlot,
			value: storageValue || '0x0000000000000000000000000000000000000000000000000000000000000000',
			blockNumber: Number(blockNumber),
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		throw new Error(`Viem storage error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, contractAddress: Address, storageSlot: Hash) => {
	const { value, blockNumber, fetchedAt } = data
	
	// Determine if value is default (all zeros)
	const isDefault = value === '0x0000000000000000000000000000000000000000000000000000000000000000'
	
	// Basic slot type detection
	let slotType: 'mapping' | 'array' | 'struct' | 'simple' | 'proxy' | 'admin' = 'simple'
	
	// Detect common patterns
	if (storageSlot === '0x0000000000000000000000000000000000000000000000000000000000000000') {
		slotType = 'simple' // Slot 0 is often a simple variable
	} else if (storageSlot.endsWith('360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc')) {
		slotType = 'proxy' // EIP-1967 implementation slot
	} else if (storageSlot.endsWith('b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103')) {
		slotType = 'admin' // EIP-1967 admin slot
	}
	
	const storageData = {
		id: `${chainId}-${contractAddress}-${storageSlot}`,
		chainId,
		operation: StorageOperation.Read,
		context: StorageContext.StateAccess,
		granularity: StorageGranularity.Slot,
		storageSlot,
		blockNumber,
		timestamp: fetchedAt,
		value,
		isWarmAccess: false, // Can't determine from single read
		accessCount: 1,
		lastAccessedAt: fetchedAt,
		slotType,
		dataType: isDefault ? 'uninitialized' : 'unknown',
		encoding: 'direct',
		isAdmin: slotType === 'admin',
		isProxy: slotType === 'proxy',
		isCritical: slotType === 'admin' || slotType === 'proxy',
		riskLevel: slotType === 'admin' ? 'critical' : slotType === 'proxy' ? 'high' : 'low',
		readData: {
			readValue: value,
			previousReads: 0,
			cacheHit: false,
			isDefault,
			valueType: isDefault ? 'zero' : 'data',
		},
		source: 'viem',
		fetchedAt,
	}
	
	return storageData as any // Type assertion to avoid deep instantiation issues
}

// Fetch multiple storage slots at once
export const fetchMultiple = async (
	chainId: ChainId, 
	contractAddress: Address, 
	storageSlots: Hash[]
) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Fetch all storage slots in parallel
		const [storageValues, blockNumber] = await Promise.all([
			Promise.allSettled(
				storageSlots.map(slot =>
					client.getStorageAt({
						address: contractAddress as `0x${string}`,
						slot: slot as `0x${string}`,
					})
				)
			),
			client.getBlockNumber(),
		])
		
		return {
			contractAddress,
			storageSlots,
			values: storageValues.map(result => 
				result.status === 'fulfilled' 
					? result.value || '0x0000000000000000000000000000000000000000000000000000000000000000'
					: '0x0000000000000000000000000000000000000000000000000000000000000000'
			),
			blockNumber: Number(blockNumber),
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		throw new Error(`Viem storage error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalizeMultiple = (
	data: any, 
	chainId: ChainId, 
	contractAddress: Address, 
	storageSlots: Hash[]
) => {
	const { values, blockNumber, fetchedAt } = data
	
	return storageSlots.map((slot, index) => {
		const value = values[index] || '0x0000000000000000000000000000000000000000000000000000000000000000'
		
		return normalize(
			{ value, blockNumber, fetchedAt },
			chainId,
			contractAddress,
			slot
		)
	})
}
