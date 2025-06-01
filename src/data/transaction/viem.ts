import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transaction } from '$/entities/transaction'
import { TransactionFormat, TransactionStatus, TransactionCategory } from '$/entities/transaction'

// Common ERC20 function selectors
const FUNCTION_SELECTORS = {
	TRANSFER: '0xa9059cbb',
	TRANSFER_FROM: '0x23b872dd',
	APPROVE: '0x095ea7b3',
	SWAP_EXACT_ETH_FOR_TOKENS: '0x7ff36ab5',
	SWAP_EXACT_TOKENS_FOR_ETH: '0x18cbafe5',
	MULTICALL: '0xac9650d8',
	MINT: '0x40c10f19',
	BURN: '0x42966c68',
} as const

// Get chain-specific gas settings
const getChainGasConfig = (chainId: ChainId) => {
	switch (chainId) {
		case 1: return { avgBlockTime: 12, gasToken: 'ETH' }
		case 137: return { avgBlockTime: 2, gasToken: 'MATIC' }
		case 42161: return { avgBlockTime: 0.25, gasToken: 'ETH' }
		case 10: return { avgBlockTime: 2, gasToken: 'ETH' }
		case 56: return { avgBlockTime: 3, gasToken: 'BNB' }
		case 250: return { avgBlockTime: 1, gasToken: 'FTM' }
		case 43114: return { avgBlockTime: 2, gasToken: 'AVAX' }
		case 100: return { avgBlockTime: 5, gasToken: 'xDAI' }
		case 8453: return { avgBlockTime: 2, gasToken: 'ETH' }
		case 59144: return { avgBlockTime: 2, gasToken: 'ETH' }
		default: return { avgBlockTime: 12, gasToken: 'ETH' }
	}
}

export const fetch = async (chainId: ChainId, transactionHash: Hash) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		const [transaction, receipt] = await Promise.allSettled([
			client.getTransaction({ hash: transactionHash as `0x${string}` }),
			client.getTransactionReceipt({ hash: transactionHash as `0x${string}` }),
		])
		
		if (transaction.status === 'rejected') {
			throw new Error(`Transaction not found: ${transactionHash}`)
		}
		
		const tx = transaction.value
		const txReceipt = receipt.status === 'fulfilled' ? receipt.value : null
		
		const [currentBlockNumber, blockData] = await Promise.allSettled([
			client.getBlockNumber(),
			tx.blockNumber ? client.getBlock({ blockNumber: tx.blockNumber }) : Promise.resolve(null),
		])
		
		return {
			transaction: tx,
			receipt: txReceipt,
			currentBlockNumber: currentBlockNumber.status === 'fulfilled' ? currentBlockNumber.value : undefined,
			blockData: blockData.status === 'fulfilled' ? blockData.value : null,
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('not found')) {
				throw new Error(`Transaction ${transactionHash} not found on chain ${chainId}`)
			}
			if (error.message.includes('Chain not supported')) {
				throw new Error(`Chain ${chainId} not supported by viem`)
			}
		}
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, transactionHash: Hash): Transaction => {
	const { transaction: tx, receipt, currentBlockNumber, blockData } = data
	
	if (!tx) {
		throw new Error(`Transaction ${transactionHash} not found on chain ${chainId}`)
	}
	
	const categorizeTransaction = (): TransactionCategory => {
		if (!tx.to) return TransactionCategory.ContractCreation
		
		if (tx.input && tx.input !== '0x' && tx.input.length >= 10) {
			const selector = tx.input.slice(0, 10).toLowerCase()
			
			return (
				[FUNCTION_SELECTORS.TRANSFER, FUNCTION_SELECTORS.TRANSFER_FROM, FUNCTION_SELECTORS.MINT, FUNCTION_SELECTORS.BURN, FUNCTION_SELECTORS.APPROVE].includes(selector as any) ? TransactionCategory.TokenTransfer :
				[FUNCTION_SELECTORS.SWAP_EXACT_ETH_FOR_TOKENS, FUNCTION_SELECTORS.SWAP_EXACT_TOKENS_FOR_ETH].includes(selector as any) ? TransactionCategory.Defi :
				selector === FUNCTION_SELECTORS.MULTICALL ? TransactionCategory.ContractCall :
				TransactionCategory.ContractCall
			)
		}
		
		return TransactionCategory.Transfer
	}
	
	const getFormat = (): TransactionFormat => (
		tx.type === 'eip4844' ? TransactionFormat.Type3Blob :
		tx.type === 'eip1559' ? TransactionFormat.Type2DynamicFee :
		tx.type === 'eip2930' ? TransactionFormat.Type1AccessList :
		TransactionFormat.Type0Legacy
	)
	
	const status: TransactionStatus = (
		receipt?.status === 'success' ? TransactionStatus.Confirmed :
		receipt?.status === 'reverted' ? TransactionStatus.Failed :
		tx.blockNumber ? TransactionStatus.Included :
		TransactionStatus.Pending
	)
	
	return {
		id: tx.hash,
		chainId,
		format: getFormat(),
		status,
		categories: [categorizeTransaction()],
		from: tx.from,
		...tx.to && { to: tx.to },
		value: tx.value.toString(),
		nonce: tx.nonce,
		gasLimit: (tx.gas || 0n).toString(),
		isSuccess: status === TransactionStatus.Confirmed,
		...tx.blockNumber && { 
			blockNumber: Number(tx.blockNumber),
			transactionIndex: tx.transactionIndex || 0,
			blockHash: tx.blockHash,
		},
		...currentBlockNumber && tx.blockNumber && { 
			confirmations: Number(currentBlockNumber - tx.blockNumber),
			isFinalized: Number(currentBlockNumber - tx.blockNumber) >= 12,
		},
		...blockData && { timestamp: Number(blockData.timestamp) },
		...receipt?.gasUsed && {
			gasUsed: receipt.gasUsed.toString(),
			gasFee: (receipt.gasUsed * (receipt.effectiveGasPrice || tx.gasPrice || 0n)).toString(),
			networkFee: (receipt.gasUsed * (receipt.effectiveGasPrice || tx.gasPrice || 0n)).toString(),
			...tx.gas && { gasEfficiency: Number((receipt.gasUsed * 100n) / tx.gas) },
		},
		...tx.gasPrice && { gasPrice: tx.gasPrice.toString() },
		...tx.input && tx.input !== '0x' && {
			input: tx.input,
			size: Math.ceil(tx.input.length / 2),
		},
		...receipt?.status === 'reverted' && { error: 'Transaction reverted' },
	}
} 