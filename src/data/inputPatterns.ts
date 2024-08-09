import { filecoinAddressPattern } from '$/utils/isFilecoinAddress'


export enum InputPattern {
	Address = 'address',
	BlockNumber = 'blockNumber',
	EasAttestationId = 'easAttestationId',
	EasSchemaId = 'easSchemaId',
	EnsName = 'ensName',
	FarcasterCastId = 'farcasterCastId',
	FarcasterUserId = 'farcasterUserId',
	FarcasterUserName = 'farcasterUserName',
	FarcasterUserNameEns = 'farcasterUserNameEns',
	FilecoinAccountId = 'filecoinAccountId',
	FilecoinBlockId = 'filecoinBlockId',
	FilecoinTipsetNumber = 'filecoinTipsetNumber',
	FilecoinTransactionId = 'filecoinTransactionId',
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
	[InputPattern.EasAttestationId]: {
		label: 'EAS Attestation ID',
		placeholder: '0xabcd...6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 2,
	},
	[InputPattern.EasSchemaId]: {
		label: 'EAS Schema ID',
		placeholder: '0xabcd...6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 2,
	},
	[InputPattern.EnsName]: {
		label: 'ENS Name',
		placeholder: 'vitalik.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		matchComplexity: 2,
	},
	[InputPattern.FarcasterCastId]: {
		label: 'Cast ID',
		placeholder: '0xabcd...6789',
		pattern: /0x[0-9a-fA-F]{40}/,
		matchComplexity: 2,
	},
	[InputPattern.FarcasterUserId]: {
		label: 'Farcaster ID',
		placeholder: '123',
		pattern: /[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.FarcasterUserName]: {
		label: 'Farcaster Name',
		placeholder: 'v',
		pattern: /[a-z0-9_]+/,
		matchComplexity: 1,
	},
	[InputPattern.FarcasterUserNameEns]: {
		label: 'Farcaster Name (ENS)',
		placeholder: 'dwr.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		matchComplexity: 2,
	},
	[InputPattern.FilecoinAccountId]: {
		label: 'Address',
		placeholder: 'f05, f1',
		pattern: filecoinAddressPattern,
		matchComplexity: 2,
	},
	[InputPattern.FilecoinTipsetNumber]: {
		label: 'Tipset Number',
		placeholder: '12345678',
		pattern: /0|[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.FilecoinBlockId]: {
		label: 'Block ID',
		placeholder: 'bafy...wxyz',
		pattern: /bafy.+/,
		matchComplexity: 2,
	},
	[InputPattern.FilecoinTransactionId]: {
		label: 'Transaction ID',
		placeholder: 'bafy...wxyz',
		pattern: /bafy.+/,
		matchComplexity: 3,
	},
	[InputPattern.LensHandle]: {
		label: 'Lens Handle',
		placeholder: 'stani.lens',
		pattern: /[^. ]+[.](?:lens|test)/,
		matchComplexity: 2,
	},
	[InputPattern.TransactionId]: {
		label: 'Transaction ID',
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
