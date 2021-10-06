export const formatTransactionHash = (transactionHash = '', format: 'full' | 'middle-truncated' = 'full') =>
	format === 'middle-truncated' ?
		transactionHash?.slice(0, 2 + 8) + '⸱⸱⸱' + transactionHash?.slice(-8)
		// transactionHash?.slice(0, 2 + 8) + '⋯' + transactionHash?.slice(-8)
		// transactionHash?.slice(0, 2 + 8) + '…' + transactionHash?.slice(-8)
	:
		transactionHash