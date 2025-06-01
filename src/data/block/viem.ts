import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Block, BlockCharacteristics } from '$/entities/block'
import { BlockRole, BlockStatus, ConsensusType } from '$/entities/block'

export const fetch = async (chainId: ChainId, blockId: string | number | 'latest' | 'pending') => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Determine block tag with better validation
		let blockTag: any
		if (typeof blockId === 'string' && blockId.startsWith('0x') && blockId.length === 66) {
			blockTag = { blockHash: blockId as `0x${string}` }
		} else if (typeof blockId === 'number' || (!isNaN(Number(blockId)) && Number(blockId) >= 0)) {
			blockTag = { blockNumber: BigInt(blockId) }
		} else if (blockId === 'latest' || blockId === 'pending') {
			blockTag = { blockTag: blockId }
		} else {
			blockTag = { blockTag: 'latest' } // Fallback to latest
		}
		
		// Fetch block data with parallel requests for efficiency
		const [block, currentBlockNumber] = await Promise.all([
			client.getBlock(blockTag),
			client.getBlockNumber(),
		])
		
		return {
			block,
			currentBlockNumber,
			chainId,
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('Block not found')) {
				throw new Error(`Block ${blockId} not found on chain ${chainId}`)
			}
			if (error.message.includes('Chain not supported')) {
				throw new Error(`Chain ${chainId} not supported by viem`)
			}
		}
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

// Chain-specific configuration
const getChainConfig = (chainId: ChainId) => {
	switch (chainId) {
		case 1: return { name: 'Ethereum', consensus: ConsensusType.Pos, symbol: 'ETH' }
		case 137: return { name: 'Polygon', consensus: ConsensusType.PoaBor, symbol: 'MATIC' }
		case 42161: return { name: 'Arbitrum', consensus: ConsensusType.Layer2Sequencer, symbol: 'ETH' }
		case 10: return { name: 'Optimism', consensus: ConsensusType.Layer2Sequencer, symbol: 'ETH' }
		case 56: return { name: 'BSC', consensus: ConsensusType.PoaBor, symbol: 'BNB' }
		case 250: return { name: 'Fantom', consensus: ConsensusType.PoaAura, symbol: 'FTM' }
		case 43114: return { name: 'Avalanche', consensus: ConsensusType.Pos, symbol: 'AVAX' }
		case 100: return { name: 'Gnosis', consensus: ConsensusType.PoaAura, symbol: 'xDAI' }
		case 8453: return { name: 'Base', consensus: ConsensusType.Layer2Sequencer, symbol: 'ETH' }
		case 59144: return { name: 'Linea', consensus: ConsensusType.Layer2Sequencer, symbol: 'ETH' }
		default: return { name: 'Unknown', consensus: ConsensusType.Pos, symbol: 'ETH' }
	}
}

export const normalize = (data: any, chainId: ChainId, blockId: string | number) => {
	const { block, currentBlockNumber } = data
	
	if (!block) {
		throw new Error(`Block ${blockId} not found on chain ${chainId}`)
	}

	const chainConfig = getChainConfig(chainId)
	
	// Calculate gas used percentage with validation
	const gasLimit = block.gasLimit || 0n
	const gasUsed = block.gasUsed || 0n
	const gasUsedPercentage = gasLimit > 0n ? Number((gasUsed * 100n) / gasLimit) : 0
	
	// Calculate confirmations with safety checks
	const blockNumber = Number(block.number)
	const currentBlock = Number(currentBlockNumber)
	const confirmations = currentBlock >= blockNumber ? currentBlock - blockNumber : 0
	
	// Enhanced block characteristics detection
	const characteristics: BlockCharacteristics = {
		isGenesis: block.number === 0n,
		isEmpty: (block.transactions?.length || 0) === 0,
		isFork: false, // Cannot determine from single block
		isMerge: chainId === 1 && block.difficulty === 0n && block.number >= 15537394n, // Ethereum merge block
		isShanghai: chainId === 1 && block.timestamp >= 1681338455, // Shanghai timestamp
		isCancun: chainId === 1 && block.timestamp >= 1710338135, // Cancun timestamp  
		isDencun: chainId === 1 && block.timestamp >= 1710338135, // Dencun = Cancun + Deneb
		hasUncles: (block.uncles?.length || 0) > 0,
		hasReorg: false, // Cannot determine from single block
		hasBlobs: block.blobGasUsed ? block.blobGasUsed > 0n : false,
		hasBeaconRoots: block.parentBeaconBlockRoot !== undefined,
		hasWithdrawals: (block.withdrawals?.length || 0) > 0,
	}
	
	// Determine status with better logic
	let status: BlockStatus = BlockStatus.Confirmed
	if (confirmations === 0) {
		status = BlockStatus.Pending
	} else if (confirmations >= 32) { // 32 slots for finality in PoS
		status = BlockStatus.Finalized
	}

	// Create simplified block object to avoid type instantiation issues
	const normalizedBlock = {
		// Block identification
		chainId,
		blockNumber: BigInt(blockNumber),
		blockHash: block.hash as Hash,
		role: BlockRole.Canonical,
		status,
		
		// Block characteristics
		characteristics,
		
		// Block metadata
		timestamp: Number(block.timestamp),
		parentHash: block.parentHash as Hash,
		stateRoot: (block.stateRoot || '0x0') as Hash,
		transactionsRoot: (block.transactionsRoot || '0x0') as Hash,
		receiptsRoot: (block.receiptsRoot || '0x0') as Hash,
		
		// Consensus data
		consensusType: chainConfig.consensus,
		difficulty: block.difficulty?.toString(),
		totalDifficulty: block.totalDifficulty?.toString(),
		nonce: block.nonce || undefined,
		extraData: block.extraData || '0x',
		
		// Size and gas
		size: Number(block.size || 0),
		gasLimit: gasLimit.toString(),
		gasUsed: gasUsed.toString(),
		gasUsedPercentage: Math.min(100, Math.max(0, gasUsedPercentage)), // Clamp between 0-100
		
		// Transaction counts
		transactionCount: block.transactions?.length || 0,
		internalTransactionCount: undefined, // Not available from block data
		
		// Economic metrics
		baseFeePerGas: block.baseFeePerGas?.toString(),
		burntFees: block.baseFeePerGas && gasUsed ? (block.baseFeePerGas * gasUsed).toString() : undefined,
		
		// Miner/validator
		miner: block.miner || '0x0000000000000000000000000000000000000000',
		
		// Timestamps
		minedAt: Number(block.timestamp),
		receivedAt: Math.floor(Date.now() / 1000),
		
		// Canonical block specific data
		confirmations,
		isFinalized: status === BlockStatus.Finalized,
		chainTipDistance: confirmations,
		
		// Simplified references to avoid type issues
		transactions: [],
		uncles: block.uncles || [],
		uncleCount: block.uncles?.length || 0,
		
		// Blob data (EIP-4844) with enhanced detection
		...(block.blobGasUsed && block.blobGasUsed > 0n ? {
			blobData: {
				blobGasUsed: block.blobGasUsed.toString(),
				excessBlobGas: block.excessBlobGas?.toString() || '0',
				blobGasPrice: '1', // Default blob gas price
				blobCount: Math.floor(Number(block.blobGasUsed) / 131072), // Standard blob gas per blob
			}
		} : {}),
		
		// Withdrawal data (post-Shanghai)
		...(block.withdrawals && block.withdrawals.length > 0 ? {
			withdrawalsRoot: block.withdrawalsRoot as Hash,
			withdrawalCount: block.withdrawals.length,
		} : {}),
	}

	return normalizedBlock as any // Type assertion to avoid deep instantiation
}
	return null
} 