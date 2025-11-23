import { evmAddressPattern, type EvmAddress } from './EvmActor'
import { evmBlockHashPattern, evmBlockNumberPattern, type EvmBlockHash, type EvmBlockNumberString } from './EvmBlock'
import { ensNamePattern, type EnsName } from './EnsDomain'
import { evmTransactionHashPattern, type EvmTransactionHash } from './EvmTransaction'
import { farcasterCastIdPattern, farcasterChannelIdPattern, farcasterUserIdPattern, farcasterUserNamePattern, type FarcasterCastId, type FarcasterChannelId, type FarcasterUserId, type FarcasterUserName } from './FarcasterAccount'

export enum InputPattern {
	EnsName = 'ensName',
	EvmAddress = 'evmAddress',
	EvmBlockHash = 'evmBlockHash',
	EvmBlockNumber = 'evmBlockNumber',
	EvmTransactionHash = 'evmTransactionHash',
	FarcasterAccountId = 'farcasterAccountId',
	FarcasterAccountName = 'farcasterAccountName',
	FarcasterCastId = 'farcasterCastId',
	FarcasterChannelId = 'farcasterChannelId',
}

export type TypeForInputPattern = {
	[InputPattern.EnsName]: EnsName
	[InputPattern.EvmAddress]: EvmAddress
	[InputPattern.EvmBlockHash]: EvmBlockHash
	[InputPattern.EvmBlockNumber]: EvmBlockNumberString
	[InputPattern.EvmTransactionHash]: EvmTransactionHash
	[InputPattern.FarcasterAccountId]: FarcasterUserId
	[InputPattern.FarcasterAccountName]: FarcasterUserName
	[InputPattern.FarcasterCastId]: FarcasterCastId
	[InputPattern.FarcasterChannelId]: FarcasterChannelId
}

export const inputPatternsConfig = {
	[InputPattern.EnsName]: {
		label: 'ENS Name',
		placeholder: 'vitalik.eth',
		pattern: ensNamePattern,
		matchComplexity: 2,
		isHumanReadable: true,
	},
	[InputPattern.EvmAddress]: {
		label: 'Address',
		placeholder: '0xabcd...6789',
		pattern: evmAddressPattern,
		matchComplexity: 2,
		isHumanReadable: false,
	},
	[InputPattern.EvmBlockHash]: {
		label: 'Block Hash',
		placeholder: '0xabcdef...456789',
		pattern: evmBlockHashPattern,
		matchComplexity: 3,
		isHumanReadable: false,
	},
	[InputPattern.EvmBlockNumber]: {
		label: 'Block Number',
		placeholder: '12345678',
		pattern: evmBlockNumberPattern,
		matchComplexity: 1,
		isHumanReadable: false,
	},
	[InputPattern.EvmTransactionHash]: {
		label: 'Transaction Hash',
		placeholder: '0xabcdef...456789',
		pattern: evmTransactionHashPattern,
		matchComplexity: 3,
		isHumanReadable: false,
	},
	[InputPattern.FarcasterAccountId]: {
		label: 'Farcaster ID',
		placeholder: '123',
		pattern: farcasterUserIdPattern,
		matchComplexity: 1,
		isHumanReadable: false,
	},
	[InputPattern.FarcasterAccountName]: {
		label: 'Farcaster Name',
		placeholder: 'v',
		pattern: farcasterUserNamePattern,
		matchComplexity: 1,
		isHumanReadable: true,
	},
	[InputPattern.FarcasterCastId]: {
		label: 'Cast ID',
		placeholder: '0xabcd...6789',
		pattern: farcasterCastIdPattern,
		matchComplexity: 2,
		isHumanReadable: false,
	},
	[InputPattern.FarcasterChannelId]: {
		label: 'Farcaster Channel ID',
		placeholder: 'my-channel-name',
		pattern: farcasterChannelIdPattern,
		matchComplexity: 2,
		isHumanReadable: true,
	},
} as const satisfies Record<InputPattern, {
	label: string,
	placeholder: string,
	pattern: RegExp,
	matchComplexity: number,
	isHumanReadable: boolean,
}>

export const matchesInputPattern = (value: string, pattern: InputPattern): boolean => (
	inputPatternsConfig[pattern].pattern.test(value)
)
