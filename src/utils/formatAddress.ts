export const formatAddress = (address = '', format: 'full' | 'middle-truncated' = 'full') =>
	format === 'middle-truncated' ?
		address?.replace(/^((?:0x).{4})(.+)(.{4})$/, `$1⸱⸱⸱$3`) // ⋯
	:
		address
