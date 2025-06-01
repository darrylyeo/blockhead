import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transfer } from '$/entities/transfer'
import { TransferStandard, TransferCategory } from '$/entities/transfer'

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const TRANSFER_SINGLE_TOPIC = '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
const TRANSFER_BATCH_TOPIC = '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'

export const fetch = async (chainId: ChainId, transactionHash: Hash, logIndex: number) => {
	const { getViemClient } = await import('$/api/viem/index')
	const client = getViemClient(chainId)
	
	try {
		const receipt = await client.getTransactionReceipt({ hash: transactionHash as `0x${string}` })
		const log = receipt.logs.find(l => l.logIndex === logIndex)
		
		if (!log) throw new Error(`Log index ${logIndex} not found in transaction ${transactionHash}`)
		
		const block = await client.getBlock({ blockNumber: receipt.blockNumber })
		
		return { receipt, log, block }
	} catch (error) {
		throw new Error(`Viem error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, transactionHash: Hash, logIndex: number) => {
	const { receipt, log, block } = data
	const topic0 = log.topics[0]
	const transferId = `${transactionHash}-${logIndex}`
	
	const standard = topic0 === TRANSFER_TOPIC && log.topics.length === 4 ? TransferStandard.Erc721 :
		topic0 === TRANSFER_TOPIC && log.topics.length === 3 ? TransferStandard.Erc20 :
		topic0 === TRANSFER_SINGLE_TOPIC || topic0 === TRANSFER_BATCH_TOPIC ? TransferStandard.Erc1155 :
		TransferStandard.Native
	
	const from = log.topics[1] ? `0x${log.topics[1].slice(26)}` : receipt.from
	const to = log.topics[2] ? `0x${log.topics[2].slice(26)}` : receipt.to || '0x0000000000000000000000000000000000000000'
	
	const category = from === '0x0000000000000000000000000000000000000000' ? TransferCategory.Mint :
		to === '0x0000000000000000000000000000000000000000' ? TransferCategory.Burn :
		TransferCategory.Transfer
	
	const baseTransfer = {
		id: transferId,
		chainId,
		standard,
		category,
		from: { address: from },
		to: { address: to },
		timestamp: Number(block.timestamp),
		block: {
			number: Number(receipt.blockNumber),
			hash: receipt.blockHash,
			timestamp: Number(block.timestamp),
		},
		indexInBlock: log.logIndex,
		transaction: {
			transactionId: receipt.transactionHash,
		},
		indexInTransaction: log.logIndex,
	}
	
	if (standard === TransferStandard.Erc20) {
		return {
			...baseTransfer,
			tokenData: {
				tokenAddress: log.address,
				amount: log.data !== '0x' ? BigInt(log.data).toString() : '0',
				amountFormatted: '0',
				symbol: 'UNKNOWN',
				name: 'Unknown',
				decimals: 18,
				amountUsd: undefined,
			}
		}
	} else if (standard === TransferStandard.Erc721) {
		return {
			...baseTransfer,
			nftData: {
				tokenAddress: log.address,
				tokenId: log.topics[3] ? BigInt(log.topics[3]).toString() : '0',
				collectionName: 'Unknown',
				collectionSymbol: 'UNKNOWN',
			}
		}
	} else {
		const isBatch = topic0 === TRANSFER_BATCH_TOPIC
		return {
			...baseTransfer,
			multiTokenData: {
				tokenAddress: log.address,
				tokenIds: isBatch ? [] : [log.topics[3] ? BigInt(log.topics[3]).toString() : '0'],
				amounts: isBatch ? [] : ['0'],
				collectionName: 'Unknown',
				collectionSymbol: 'UNKNOWN',
				isBatchTransfer: isBatch,
				totalTokenTypes: isBatch ? 0 : 1,
				totalAmount: '0',
				tokens: [],
			}
		}
	}
}
