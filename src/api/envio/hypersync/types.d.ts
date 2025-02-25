export type Query = {
	/** The block to start the query from */
	from_block: number

	/**
	 * The block to end the query at. If not specified, the query will go until the
	 *  end of data. Exclusive, the returned range will be [from_block..to_block).
	 *
	 * The query will return before it reaches this target block if it hits the time limit
	 *  configured on the server. The user should continue their query by putting the
	 *  next_block field in the response into from_block field of their next query. This implements
	 *  pagination.
	 */
	to_block?: number

	/**
	 * List of log selections, these have an or relationship between them, so the query will return logs
	 * that match any of these selections.
	 */
	logs?: LogsSelector[]

	/**
	 * List of transaction selections, the query will return transactions that match any of these selections and
	 *  it will return transactions that are related to the returned logs.
	 */
	transactions?: TransactionsSelector[]

	/**
	 * List of trace selections, the query will return traces that match any of these selections and
	 *  it will re turn traces that are related to the returned logs.
	 */
	traces?: TracesSelector[]

	/** List of block selections, the query will return blocks that match any of these selections */
	blocks?: BlocksSelector[]

	/**
	 * Weather to include all blocks regardless of if they are related to a returned transaction or log. Normally
	 *  the server will return only the blocks that are related to the transaction or logs in the response. But if this
	 *  is set to true, the server will return data for all blocks in the requested range [from_block, to_block).
	 */
	include_all_blocks?: boolean

	/**
	 * Field selection. The user can select which fields they are interested in, requesting less fields will improve
	 *  query execution time and reduce the payload size so the user should always use a minimal number of fields.
	 */
	field_selection: {
		block?: (keyof Block)[]
		transaction?: (keyof Transaction)[]
		log?: (keyof Log)[]
		trace?: (keyof Trace)[]
	}

	/**
	 * Maximum number of blocks that should be returned, the server might return more blocks than this number but
	 *  it won't overshoot by too much.
	 */
	max_num_blocks?: number

	/**
	 * Maximum number of transactions that should be returned, the server might return more transactions than this number but
	 *  it won't overshoot by too much.
	 */
	max_num_transactions?: number

	/**
	 * Maximum number of logs that should be returned, the server might return more logs than this number but
	 *  it won't overshoot by too much.
	 */
	max_num_logs?: number

	/**
	 * Maximum number of traces that should be returned, the server might return more traces than this number but
	 *  it won't overshoot by too much.
	 */
	max_num_traces?: number

	/**
	 * Selects join mode for the query,
	 * Default: join in this order logs -> transactions -> traces -> blocks
	 * JoinAll: join everything to everything. For example if logSelection matches log0, we get the
	 * associated transaction of log0 and then we get associated logs of that transaction as well. Applites similarly
	 * to blocks, traces.
	 * JoinNothing: join nothing.
	 */
	join_mode?: 'default' | 'join_all' | 'join_nothing'
}

export type LogsSelector = {
	/**
	 * Address of the contract, any logs that has any of these addresses will be returned.
	 * Empty means match all.
	 */
	address?: Array<string>
	/**
	 * Topics to match, each member of the top level array is another array, if the nth topic matches any
	 *  topic specified in topics[n] the log will be returned. Empty means match all.
	 */
	topics?: Array<Array<string>>
}

export type TransactionsSelector = {
	/**
	 * Address the transaction should originate from. If transaction.from matches any of these, the transaction
	 *  will be returned. Keep in mind that this has an and relationship with to filter, so each transaction should
	 *  match both of them. Empty means match all.
	 */
	from?: Array<string>
	/**
	 * Address the transaction should go to. If transaction.to matches any of these, the transaction will
	 *  be returned. Keep in mind that this has an and relationship with from filter, so each transaction should
	 *  match both of them. Empty means match all.
	 */
	to?: Array<string>
	/** If first 4 bytes of transaction input matches any of these, transaction will be returned. Empty means match all. */
	sighash?: Array<string>
	/** If tx.status matches this it will be returned. */
	status?: number
	/** If transaction.type matches any of these values, the transaction will be returned */
	kind?: Array<number>
	contractAddress?: Array<string>
}

export type TracesSelector = {
	address?: string[]
	topics?: string[][]
}

export type BlocksSelector = {
	number?: number[]
	/**
	 * Hash of a block, any blocks that have one of these hashes will be returned.
	 * Empty means match all.
	 */
	hash?: Array<string>
	/**
	 * Miner address of a block, any blocks that have one of these miners will be returned.
	 * Empty means match all.
	 */
	miner?: Array<string>
}

export type Result<T> = {
	status: string
	result: T
	archive_height: number
	next_block: number
	total_execution_time: number
	rollback_guard: RollbackGuard
}

export type Block = {
	number: number
	hash: `0x${string}`
	parent_hash: `0x${string}`
	nonce: `0x${string}`
	sha3_uncles: `0x${string}`
	logs_bloom: `0x${string}`
	transactions_root: `0x${string}`
	state_root: `0x${string}`
	receipts_root: `0x${string}`
	miner: `0x${string}`
	difficulty: `${bigint}`
	total_difficulty: `${bigint}`
	extra_data: string
	size: `${bigint}`
	gas_limit: `${bigint}`
	gas_used: `${bigint}`
	timestamp: `0x${string}`
	uncles: `0x${string}`
	base_fee_per_gas: `${bigint}`
	blob_gas_used: `${bigint}`
	excess_blob_gas: `${bigint}`
	parent_beacon_block_root: `0x${string}`
	withdrawals_root: `0x${string}`
	withdrawals: string
	l1_block_number: number | null
	send_count: string | null
	send_root: string | null
	mix_hash: `0x${string}`
}

export type Transaction = {
	block_hash: string
	block_number: number
	from: string
	gas: `${bigint}`
	gas_price: `${bigint}`
	hash: string
	input: string
	nonce: `${bigint}`
	to: string
	transaction_index: number
	value: `${bigint}`
	v: string
	r: string
	s: string
	y_parity: string
	max_priority_fee_per_gas: `${bigint}`
	max_fee_per_gas: `${bigint}`
	chain_id: number
	access_list: AccessList[]
	max_fee_per_blob_gas: `${bigint}`
	blob_versioned_hashes: string[]
	cumulative_gas_used: `${bigint}`
	effective_gas_price: `${bigint}`
	gas_used: `${bigint}`
	contract_address: string
	logs_bloom: string
	kind: number
	root: string
	status: number
	l1_fee: `${bigint}`
	l1_gas_price: `${bigint}`
	l1_gas_used: `${bigint}`
	l1_fee_scalar: number
	gas_used_for_l1: `${bigint}`
}

export type Log = {
	removed: boolean
	log_index: number
	transaction_index: number
	transaction_hash: string
	block_hash: string
	block_number: number
	address: string
	data: string
	topics: string[]
}

export type Trace = {
	from: string
	to: string
	call_type: string
	gas: `${bigint}`
	input: string
	init: string
	value: `${bigint}`
	author: string
	reward_type: string
	block_hash: string
	block_number: number
	address: string
	code: string
	gas_used: `${bigint}`
	output: string
	subtraces: number
	trace_address: number[]
	transaction_hash: string
	transaction_position: number
	type: string
	error: string
}

export type Withdrawal = {
	index: string
	validator_index: string
	address: string
	amount: string
}

export type AccessList = {
	address: string
	storage_keys: string[]
}

export type RollbackGuard = {
	block_number: number
	timestamp: number
	hash: string
	first_block_number: number
	first_parent_hash: string
}
