// Types/constants
import { AccountIdType } from './accountId'

export enum StringPattern {
	Address = AccountIdType.Address,
	BlockNumber = 'blockNumber',
	EasAttestationId = 'easAttestationId',
	EasSchemaId = 'easSchemaId',
	EnsName = AccountIdType.EnsName,
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
	LensHandle = AccountIdType.LensHandle,
	MoxieAuctionId = 'moxieAuctionId',
	MoxieOrderId = 'moxieOrderId',
	MoxieSubjectId = 'moxieSubjectId',
	TransactionId = 'transactionId',
}


// Patterns
import { filecoinAddressPattern } from '$/utils/isFilecoinAddress'

export const stringPatterns = {
	[StringPattern.Address]: {
		label: 'Address',
		placeholder: '0xabcd…6789',
		placeholderLong: '0x0000000000000000000000000000000000000000',
		pattern: /0x[0-9a-fA-F]{40}/,
		complexity: 2,
	},
	[StringPattern.BlockNumber]: {
		label: 'Block Number',
		placeholder: '12345678',
		pattern: /0|[1-9][0-9]*/,
		complexity: 1,
	},
	[StringPattern.EasAttestationId]: {
		label: 'EAS Attestation ID',
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		complexity: 2,
	},
	[StringPattern.EasSchemaId]: {
		label: 'EAS Schema ID',
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{64}/,
		complexity: 2,
	},
	[StringPattern.EnsName]: {
		label: 'ENS Name',
		placeholder: 'ens.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		complexity: 2,
	},
	[StringPattern.FarcasterCastId]: {
		label: 'Cast ID',
		placeholder: '0xabcd…6789',
		pattern: /0x[0-9a-fA-F]{40}/,
		complexity: 2,
	},
	[StringPattern.FarcasterChannelId]: {
		label: 'Farcaster Channel ID',
		placeholder: 'my-channel-name',
		pattern: /[a-z0-9]+(?:-[a-z0-9]+)*/, 
		complexity: 2,
	},
	[StringPattern.FarcasterUserId]: {
		label: 'Farcaster ID',
		placeholder: '123',
		pattern: /[1-9][0-9]*/,
		complexity: 1,
	},
	[StringPattern.FarcasterUserName]: {
		label: 'Farcaster Name',
		placeholder: 'v',
		pattern: /[a-z0-9_]+/,
		complexity: 1,
	},
	[StringPattern.FarcasterUserNameEns]: {
		label: 'Farcaster Name (ENS)',
		placeholder: 'dwr.eth',
		pattern: /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/,
		complexity: 2,
	},
	[StringPattern.FilecoinAccountId]: {
		label: 'Address',
		placeholder: 'f05 / f1… / f2… / f3… / f4…',
		placeholderLong: 'f05 / f1…xyz / f2…xyz / f3…xyz / f4123f…xyz',
		pattern: filecoinAddressPattern,
		complexity: 2,
	},
	[StringPattern.FilecoinBlockCid]: {
		label: 'Block CID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+/,
		complexity: 2,
	},
	[StringPattern.FilecoinTipsetCid]: {
		label: 'Tipset CID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+/,
		complexity: 3,
	},
	[StringPattern.FilecoinTipsetNumber]: {
		label: 'Tipset Number',
		placeholder: '12345678',
		pattern: /0|[1-9][0-9]*/,
		complexity: 1,
	},
	[StringPattern.FilecoinTransactionId]: {
		label: 'Transaction ID',
		placeholder: 'bafy…',
		placeholderLong: 'bafy…wxyz',
		pattern: /bafy.+|0x[0-9a-fA-F]{64}/,
		complexity: 3,
	},
	[StringPattern.LensHandle]: {
		label: 'Lens Handle',
		placeholder: 'stani.lens',
		pattern: /[^. ]+[.](?:lens|test)/,
		complexity: 2,
	},
	[StringPattern.MoxieAuctionId]: {
		label: 'Moxie Auction ID',
		placeholder: '12345',
		pattern: /[1-9][0-9]*/,
		complexity: 1,
	},
	[StringPattern.MoxieOrderId]: {
		label: 'Moxie Order ID',
		placeholder: '67890',
		pattern: /[1-9][0-9]*/,
		complexity: 1,
	},
	[StringPattern.MoxieSubjectId]: {
		label: 'Moxie Subject ID',
		placeholder: 'id:farcaster / fid:1234 / cid:founders',
		pattern: /id:([a-z]+)|fid:(\d+)|cid:(:?[a-z0-9]+(?:-[a-z0-9]+)*)/,
		complexity: 3,
	},
	[StringPattern.TransactionId]: {
		label: 'Transaction ID',
		placeholder: '0xabcdef…456789',
		pattern: /0x[0-9a-fA-F]{64}/,
		complexity: 3,
	},
} as const satisfies Record<StringPattern, {
	label: string,
	placeholder: string,
	placeholderLong?: string,
	pattern: RegExp,
	complexity: number,
}>
