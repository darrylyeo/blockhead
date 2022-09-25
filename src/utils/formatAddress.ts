export const formatAddress = (address = '', format: 'full' | 'middle-truncated' = 'full') =>
	format === 'middle-truncated' ?
		address?.slice(0, 2 + 4) + '⸱⸱⸱' + address?.slice(-4)
		// address?.slice(0, 2 + 4) + '⋯' + address?.slice(-4)
		// address?.slice(0, 2 + 4) + '…' + address?.slice(-4)
	:
		address