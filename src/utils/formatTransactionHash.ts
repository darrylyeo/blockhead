export const formatTransactionHash = (transactionHash = '', format: 'full' | 'middle-truncated' = 'full') =>
	format === 'middle-truncated' ?
		transactionHash?.slice(0, 2 + 6) + '⸱⸱⸱' + transactionHash?.slice(-6)
		// transactionHash?.slice(0, 2 + 6) + '⋯' + transactionHash?.slice(-6)
		// transactionHash?.slice(0, 2 + 6) + '…' + transactionHash?.slice(-6)
	:
		transactionHash