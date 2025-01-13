import { filecoinAddressPattern } from '$/utils/isFilecoinAddress'


export enum InputPattern {
	Address = 'address',
	BlockNumber = 'blockNumber',
	EasAttestationId = 'easAttestationId',
	EasSchemaId = 'easSchemaId',
	EnsName = 'ensName',
	FarcasterCastId = 'farcasterCastId',
	FarcasterChannelId = 'farcasterChannelId',
	FarcasterUserId = 'farcasterUserId',
	FarcasterUserName = 'farcasterUserName',
	FarcasterUserNameEns = 'farcasterUserNameEns',
	FilecoinAccountId = 'filecoinAccountId',
	FilecoinBlockCid = 'filecoinBlockCid',
	FilecoinTipsetCid = 'filecoinTipsetCid',
	FilecoinTipsetNumber = 'filecoinTipsetNumber',
	FilecoinTransactionId = 'filecoinTransactionId',
	LensHandle = 'lensHandle',
	MoxieAuctionId = 'moxieAuctionId',
	MoxieOrderId = 'moxieOrderId',
	MoxieSubjectId = 'moxieSubjectId',
	TransactionId = 'transactionId',
}

export const inputPatternsConfig = {
	[InputPattern.Address]: {
		label: 'Address',
		placeholder: '0xabcd…6789',
		placeholderLong: '0x0000000000000000000000000000000000000000',
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
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 2,
	},
	[InputPattern.EasSchemaId]: {
		label: 'EAS Schema ID',
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 2,
	},
	[InputPattern.EnsName]: {
		label: 'ENS Name',
		placeholder: 'ens.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		matchComplexity: 2,
	},
	[InputPattern.FarcasterCastId]: {
		label: 'Cast ID',
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{40}/,
		matchComplexity: 2,
	},
	[InputPattern.FarcasterChannelId]: {
		label: 'Farcaster Channel ID',
		placeholder: 'my-channel-name',
		pattern: /[a-z0-9]+(?:-[a-z0-9]+)*/, 
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
		placeholder: 'f05 / f1… / f2… / f3… / f4…',
		placeholderLong: 'f05 / f1…xyz / f2…xyz / f3…xyz / f4123f…xyz',
		pattern: filecoinAddressPattern,
		matchComplexity: 2,
	},
	[InputPattern.FilecoinBlockCid]: {
		label: 'Block CID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+/,
		matchComplexity: 2,
	},
	[InputPattern.FilecoinTipsetCid]: {
		label: 'Tipset CID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+/,
		matchComplexity: 3,
	},
	[InputPattern.FilecoinTipsetNumber]: {
		label: 'Tipset Number',
		placeholder: '12345678',
		pattern: /0|[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.FilecoinTransactionId]: {
		label: 'Transaction ID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+/,
		matchComplexity: 3,
	},
	[InputPattern.LensHandle]: {
		label: 'Lens Handle',
		placeholder: 'stani.lens',
		pattern: /[^. ]+[.](?:lens|test)/,
		matchComplexity: 2,
	},
	[InputPattern.MoxieAuctionId]: {
		label: 'Moxie Auction ID',
		placeholder: '12345',
		pattern: /[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.MoxieOrderId]: {
		label: 'Moxie Order ID',
		placeholder: '67890',
		pattern: /[1-9][0-9]*/,
		matchComplexity: 1,
	},
	[InputPattern.MoxieSubjectId]: {
		label: 'Moxie Subject ID',
		placeholder: 'id:farcaster / fid:1234 / cid:founders',
		pattern: /id:([a-z]+)|fid:(\d+)|cid:(:?[a-z0-9]+(?:-[a-z0-9]+)*)/,
		matchComplexity: 3,
	},
	[InputPattern.TransactionId]: {
		label: 'Transaction ID',
		placeholder: '0xabcdef…456789',
		pattern: /0x[0-9a-fA-F]{64}/,
		matchComplexity: 3,
	},
} as const satisfies Record<InputPattern, {
	label: string,
	placeholder: string,
	placeholderLong?: string,
	pattern: RegExp,
	matchComplexity: number,
}>
