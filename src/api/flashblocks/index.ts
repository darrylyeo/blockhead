// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { Payload, Block, FlashBlock, Transaction } from './types'

export const endpointsByChainId = {
	84532: 'wss://sepolia.flashblocks.base.org/ws',
} as const satisfies Record<Ethereum.ChainId, string>


// Caches
const payloadCache = new Map<string, Map<bigint, Map<number, Payload>>>()
const blockCache = new Map<string, Map<bigint, Block>>()
const flashBlockCache = new Map<string, Map<bigint, Map<number, FlashBlock>>>()
const cacheUpdateSignals = new Map<string, AbortController>()


// Functions
export class FlashBlocksClient {
	#ws: WebSocket | null = null
	#endpoint: string

	constructor(endpoint: string) {
		this.#endpoint = endpoint
	}

	connect() {
		return new Promise<void>((resolve, reject) => {
			if (this.#ws && this.#ws.readyState === WebSocket.OPEN) {
				resolve()
				return
			}

			this.#ws = new WebSocket(this.#endpoint)

			this.#ws.onopen = () => {
				resolve()
			}

			this.#ws.onerror = (error) => {
				reject(error)
			}

			this.#ws.onmessage = (event) => {
				try {
					// Validate if the event is trusted
					if (!event.isTrusted) {
						console.warn('Received untrusted WebSocket event, ignoring')
						return
					}
					
					if(event.data instanceof Blob) {
						const reader = new FileReader()
						reader.readAsText(event.data)
						reader.onload = () => {
							const data = JSON.parse(reader.result as string) as Payload
							this.#cacheAndProcessPayload(data)
						}
					} else {
						const data = JSON.parse(event.data) as Payload
						this.#cacheAndProcessPayload(data)
					}
				} catch (error) {
					console.error('Error processing WebSocket message:', error)
				}
			}
		})
	}

	disconnect() {
		if (this.#ws) {
			this.#ws.close()
			this.#ws = null
		}
		
		// Abort all pending cache wait operations
		for (const controller of cacheUpdateSignals.values()) {
			controller.abort()
		}
		cacheUpdateSignals.clear()
	}

	#cacheAndProcessPayload(payload: Payload) {
		console.log('cacheAndProcessPayload', payload)
		const blockNumber = BigInt(payload.metadata.block_number)
		
		// Cache the raw payload
		if (!payloadCache.has(this.#endpoint))
			payloadCache.set(this.#endpoint, new Map())
		
		const payloadEndpointCache = payloadCache.get(this.#endpoint)!
		
		if (!payloadEndpointCache.has(blockNumber))
			payloadEndpointCache.set(blockNumber, new Map())

		const blockPayloadCache = payloadEndpointCache.get(blockNumber)!
		blockPayloadCache.set(payload.index, payload)
		
		// Process and cache the flash block
		if (!flashBlockCache.has(this.#endpoint))
			flashBlockCache.set(this.#endpoint, new Map())

		const flashEndpointCache = flashBlockCache.get(this.#endpoint)!
		
		if (!flashEndpointCache.has(blockNumber))
			flashEndpointCache.set(blockNumber, new Map())
		
		const blockFlashCache = flashEndpointCache.get(blockNumber)!
		
		// Convert payload to FlashBlock format
		const flashBlock: FlashBlock = {
			number: payload.base?.block_number || `0x0`,
			hash: payload.diff.block_hash,
			parentHash: payload.base?.parent_hash || `0x0`,
			timestamp: payload.base?.timestamp || `0x0`,
			transactions: this.#processTransactions(payload.diff.transactions)
		}
		
		blockFlashCache.set(payload.index, flashBlock)
		
		// If this is the initial block (index 0), also cache it as a regular block
		if (payload.index === 0 && payload.base) {
			if (!blockCache.has(this.#endpoint))
				blockCache.set(this.#endpoint, new Map())
			
			const block: Block = {
				number: payload.base.block_number,
				hash: payload.diff.block_hash,
				parentHash: payload.base.parent_hash,
				timestamp: payload.base.timestamp,
				gasLimit: payload.base.gas_limit,
				gasUsed: payload.diff.gas_used,
				baseFeePerGas: payload.base.base_fee_per_gas,
				transactionsRoot: `0x0`,  // Not provided in the payload
				receiptsRoot: payload.diff.receipts_root,
				extraData: payload.base.extra_data,
				transactions: this.#processTransactions(payload.diff.transactions)
			}
			
			blockCache.get(this.#endpoint)!.set(blockNumber, block)
		}

		// Signal any waiting promises that cache has been updated
		const signalKeys = [
			`payload-${blockNumber}-${payload.index}`,
			`payloads-${blockNumber}`,
			`block-${blockNumber}`,
			`blocks`,
			`flashblock-${blockNumber}-${payload.index}`,
			`flashblocks-${blockNumber}`,
			`flashblocks`
		]
		
		for (const key of signalKeys) {
			const controller = cacheUpdateSignals.get(key)
			if (controller) {
				controller.abort() // Signal that cache has been updated
				cacheUpdateSignals.delete(key)
			}
		}
	}
	
	#processTransactions(txHexes: `0x${string}`[]): Transaction[] {
		return txHexes.map(txHex => this.#parseTransaction(txHex))
	}
	
	#parseTransaction(txHex: `0x${string}`): Transaction {
		// This is a placeholder - actual implementation would depend on how transactions are encoded
		// In a real implementation, you would decode the hex string into a transaction object
		return {
			hash: txHex.substring(0, 66) as `0x${string}`,
			from: ('0x' + txHex.substring(66, 106)) as `0x${string}`,
			to: ('0x' + txHex.substring(106, 146)) as `0x${string}`,
			input: txHex,
			value: `0x0`
		}
	}

	// Helper method to wait for cache updates
	async #waitForCacheUpdate<T>(
		key: string, 
		checkFn: () => T | undefined, 
		timeoutMs = 10000
	): Promise<T> {
		// Check if data is already in cache
		const existingData = checkFn()

		if (existingData !== undefined) return existingData as T

		throw new Error('Data not found.')
		
		// Create a new abort controller for this wait operation
		const controller = new AbortController()
		cacheUpdateSignals.set(key, controller)
		
		try {
			// Wait for the abort signal (which will be triggered when cache is updated)
			await new Promise<void>((resolve, reject) => {
				if (controller.signal.aborted) {
					return resolve()
				}
				
				const abortHandler = () => {
					clearTimeout(timeoutId)
					resolve()
				}
				
				const timeoutId = setTimeout(() => {
					controller.signal.removeEventListener('abort', abortHandler)
					const error = new Error('Timeout waiting for cache update')
					error.name = 'TimeoutError'
					reject(error)
				}, timeoutMs)
				
				controller.signal.addEventListener('abort', abortHandler, { once: true })
			})
			
			// Check again after the wait
			const data = checkFn()
			if (data !== undefined) return data as T
			
			throw new Error(`Data for key ${key} not found after waiting`)
		} finally {
			cacheUpdateSignals.delete(key)
		}
	}

	// Raw payload access methods
	async getPayload(blockNumber: bigint, index: number) {
		console.log('getPayload', {blockNumber, index})
		return await this.#waitForCacheUpdate(
			`payload-${blockNumber}-${index}`,
			() => payloadCache.get(this.#endpoint)?.get(blockNumber)?.get(index)
		)
	}
	
	async getAllPayloadsForBlock(blockNumber: bigint) {
		return await this.#waitForCacheUpdate(`payloads-${blockNumber}`, () => {
			const blockPayloads = payloadCache.get(this.#endpoint)?.get(blockNumber)
			if (blockPayloads && blockPayloads.size > 0) {
				return Array.from(blockPayloads.entries())
					.sort(([indexA], [indexB]) => indexA - indexB)
					.map(([, payload]) => payload)
			}
			return undefined
		})
	}
	
	// Processed block access methods
	async getBlock(blockNumber: bigint) {
		console.log(
			'getBlock',
			blockCache,
			blockCache.get(this.#endpoint),
			blockCache.get(this.#endpoint)?.get(blockNumber)
		)
		return await this.#waitForCacheUpdate(
			`block-${blockNumber}`,
			() => blockCache.get(this.#endpoint)?.get(blockNumber)
		)
	}
	
	async getBlocks() {
		console.log('getBlocks')
		return await this.#waitForCacheUpdate(`blocks`, () => {
			const endpointCache = blockCache.get(this.#endpoint)
			if (!endpointCache || endpointCache.size === 0) return undefined
			
			return Array.from(endpointCache.entries())
				.sort(([numA], [numB]) => Number(numA) - Number(numB))
				.map(([, block]) => block)
		})
	}
	
	// Flash block access methods
	async getFlashBlock(blockNumber: bigint, index: number) {
		console.log('getFlashBlock', {blockNumber, index})
		return await this.#waitForCacheUpdate(
			`flashblock-${blockNumber}-${index}`,
			() => flashBlockCache.get(this.#endpoint)?.get(blockNumber)?.get(index)
		)
	}

	async getAllFlashBlocksForBlock(blockNumber: bigint) {
		console.log('getAllFlashBlocksForBlock', {blockNumber})
		return await this.#waitForCacheUpdate(
			`flashblocks-${blockNumber}`,
			() => {
				const blockFlashBlocks = flashBlockCache.get(this.#endpoint)?.get(blockNumber)
				if (blockFlashBlocks && blockFlashBlocks.size > 0) {
					return Array.from(blockFlashBlocks.entries())
						.sort(([indexA], [indexB]) => indexA - indexB)
						.map(([, flashBlock]) => flashBlock)
				}
				return undefined
			}
		)
	}

	async getFlashBlocks(blockNumber?: bigint) {
		console.log('getFlashBlocks', {blockNumber})
		if (blockNumber !== undefined) {
			return this.getAllFlashBlocksForBlock(blockNumber)
		}
		
		return await this.#waitForCacheUpdate(`flashblocks`, () => {
			const endpointCache = flashBlockCache.get(this.#endpoint)
			if (!endpointCache || Object.keys(endpointCache).length === 0) return undefined
			
			const allFlashBlocks: FlashBlock[] = []
			
			for (const [, flashBlocksMap] of endpointCache.entries()) {
				const blockFlashBlocks = Array.from(flashBlocksMap.entries())
					.sort(([indexA], [indexB]) => indexA - indexB)
					.map(([, flashBlock]) => flashBlock)
				
				allFlashBlocks.push(...blockFlashBlocks)
			}
			
			return allFlashBlocks.length > 0 ? allFlashBlocks : undefined
		})
	}
}

const clients = new Map<string, FlashBlocksClient>()

export const getClient = (endpoint: string) => (
	!clients.has(endpoint)
		? clients.set(endpoint, new FlashBlocksClient(endpoint))
		: clients.get(endpoint)
)
