export enum InputPattern {
	Address = 'address',
	BlockNumber = 'blockNumber',
	EnsName = 'ensName',
	LensHandle = 'lensHandle',
	TransactionId = 'transactionId',
}

export const inputPatternsConfig = {
	[InputPattern.Address]: {
		label: 'Address',
		placeholder: '0xabcd...6789',
		pattern: /0x[0-9a-fA-F]{40}/,
		matchComplexity: 2,
	},
	[InputPattern.BlockNumber]: {
		label: 'Block Number',
		placeholder: '12345678',
		pattern: /0|[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.EnsName]: {
		label: 'ENS Name',
		placeholder: 'vitalik.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		matchComplexity: 2,
	},
	[InputPattern.LensHandle]: {
		label: 'Lens Handle',
		placeholder: 'stani.lens',
		pattern: /[^. ]+[.](?:lens|test)/,
		matchComplexity: 2,
	},
	[InputPattern.TransactionId]: {
		label: 'Transaction',
		placeholder: '0xabcdef...456789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 3,
	},
} as const satisfies Record<InputPattern, {
	label: string,
	placeholder: string,
	pattern: RegExp,
	matchComplexity: number,
}>
