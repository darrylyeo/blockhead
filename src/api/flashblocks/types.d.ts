export type Payload = {
	payload_id: `0x${string}`
	index: number
	base?: {
		parent_beacon_block_root: `0x${string}`
		parent_hash: `0x${string}`
		fee_recipient: `0x${string}`
		prev_randao: `0x${string}`
		block_number: `0x${string}`
		gas_limit: `0x${string}`
		timestamp: `0x${string}`
		extra_data: `0x${string}`
		base_fee_per_gas: `0x${string}`
	}
	diff: {
		state_root: `0x${string}`
		receipts_root: `0x${string}`
		logs_bloom: `0x${string}`
		gas_used: `0x${string}`
		block_hash: `0x${string}`
		transactions: `0x${string}`[]
		withdrawals: unknown[]
	}
	metadata: {
		block_number: number
		new_account_balances: Record<`0x${string}`, `0x${string}`>
		receipts: Record<`0x${string}`, Receipt>
	}
}

export type FlashBlock = {
	number: `0x${string}`
	hash: `0x${string}`
	parentHash: `0x${string}`
	timestamp: `0x${string}`
	transactions?: Transaction[]
}

export type Block = {
	number: `0x${string}`
	hash: `0x${string}`
	parentHash: `0x${string}`
	timestamp: `0x${string}`
	gasLimit?: `0x${string}`
	gasUsed?: `0x${string}`
	baseFeePerGas?: `0x${string}`
	transactionsRoot: `0x${string}`
	receiptsRoot: `0x${string}`
	extraData?: `0x${string}`
	transactions?: Transaction[]
}

type Receipt = Eip1559Receipt | DepositReceipt

type Eip1559Receipt = {
	Eip1559: {
		cumulativeGasUsed: `0x${string}`
		logs: Log[]
		status: `0x${string}`
	}
}

type DepositReceipt = {
	Deposit: {
		cumulativeGasUsed: `0x${string}`
		depositNonce: `0x${string}`
		depositReceiptVersion: `0x${string}`
		logs: Log[]
		status: `0x${string}`
	}
}

export type Transaction = {
	hash: `0x${string}`
	from: `0x${string}`
	to?: `0x${string}`
	value?: `0x${string}`
	input: `0x${string}`
	nonce?: `0x${string}`
	gas?: `0x${string}`
	gasPrice?: `0x${string}`
	maxFeePerGas?: `0x${string}`
	maxPriorityFeePerGas?: `0x${string}`
	accessList?: unknown[]
}

type Log = {
	address: `0x${string}`
	data: `0x${string}`
	topics: `0x${string}`[]
}
