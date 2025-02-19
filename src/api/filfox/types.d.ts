// Types
import type { filfoxActorTypes, filfoxTransferTypes } from './constants'


export type Overview = {
	height: number
	timestamp: number
	totalRawBytePower: `${bigint}`
	totalQualityAdjPower: `${bigint}`
	totalRawBytePowerDelta: `${bigint}`
	totalQualityAdjPowerDelta: `${bigint}`
	accounts: number
	activeMiners: number
	activeMinersGrowth: number
	totalMaxSupply: `${bigint}`
	totalSupply: `${bigint}`
	circulatingSupply: `${bigint}`
	burntSupply: `${bigint}`
	totalPledgeCollateral: `${bigint}`
	totalMultisigLockedBalance: `${bigint}`
	totalMarketPledge: `${bigint}`
	blockReward: `${bigint}`
	dailyMessages: number
	dailyCoinsMined: `${bigint}`
	averageTipsetInterval: number
	averageTipsetBlocks: number
	averageTipsetWeightedBlocks: number
	baseFee: `${bigint}`
	averageRewardPerByte: number
	estimatedInitialPledgeCollateral: number
	sealCost: `${bigint}`
	price: number
	priceChangePercentage: number
}

export type AddressInfo<
	T extends keyof typeof filfoxActorTypes = keyof typeof filfoxActorTypes
> = (
	& {
		id: string
		robust: string
		actor: T
		createHeight: number
		createTimestamp: number
		lastSeenHeight: number
		lastSeenTimestamp: number
		balance: `${bigint}`
		messageCount: number
		transferCount: number
		tokenTransferCount: number
		timestamp: number
		tokens: number
	}

	& (
		T extends 'storageminer' ?
			{
				miner: {
					owner: {
						address: string
						balance: `${bigint}`
					}
					worker: {
						address: string
						balance: `${bigint}`
					}
					beneficiary: {
						address: string
						balance: `${bigint}`
					}
					controlAddresses: {
						address: string
						balance: `${bigint}`
					}[]
					peerId: string
					multiAddresses: string[]
					sectorSize: number
					rawBytePower: `${bigint}`
					qualityAdjPower: `${bigint}`
					networkRawBytePower: `${bigint}`
					networkQualityAdjPower: `${bigint}`
					blocksMined: number
					weightedBlocksMined: number
					totalRewards: `${bigint}`
					sectors: {
						live: number
						active: number
						faulty: number
						recovering: number
					}
					preCommitDeposits: `${bigint}`
					vestingFunds: `${bigint}`
					initialPledgeRequirement: `${bigint}`
					availableBalance: `${bigint}`
					sectorPledgeBalance: `${bigint}`
					pledgeBalance: `${bigint}`
					rawBytePowerRank: number
					qualityAdjPowerRank: number
				}
			}

		:
			never
	)

	& {
		ownedMiners: string[]
		workerMiners: string[]
		benefitedMiners: string[]
		address: string
	}
)

export type Tipset = {
	height: number
	timestamp: number
	messageCount: number
	blocks: Block<false>[]
}

export type Block<
	HasParentInfo extends boolean = boolean
> = (
	& {
		cid: string

		miner: string
		minerTag?: {
			name: string
			signed: boolean
		}

		winCount: number
		reward: `${bigint}`
		penalty: `${bigint}`
	}

	& (
		HasParentInfo extends true ?
			{
				height: number
				timestamp: number
				size: number

				parents: string[]
				parentBaseFee: `${bigint}`
				parentStateRoot: string
				parentWeight: `${bigint}`
			}
		:
			{
				height?: never
				timestamp?: never
				size?: never

				parents?: never
				parentBaseFee?: never
				parentStateRoot?: never
				parentWeight?: never
			}
	)

	& {
		messageCount: number
	}
)

export type BlockMessages = {
	totalCount: number
	messages: BlockMessage[]
	methods: string[]
}

export type BlockMessage = {
	cid: string
	from: string
	fromTag?: {
		name: '-' | string
		signed: boolean
	}
	to: string
	toTag?: {
		name: '-' | string
		signed: boolean
	}
	value: `${bigint}`
	method: string
	evmMethod?: string
	params: string // `ghkr${string}`
	receipt?: {
		exitCode: 0 | 1
		return?: string
		gasUsed?: number
	}
}

export type Message = {
	cid: string
	height: number
	timestamp: number
	confirmations: number
	blocks: string[]
	version: number
	from: string
	fromId: string
	fromActor: string
	fromTag?: {
		name: '-' | string
		signed: boolean
	}
	to: string
	toId: string
	toActor: string
	toTag?: {
		name: '-' | string
		signed: boolean
	}
	nonce: number
	value: `${bigint}`
	gasLimit: number
	gasFeeCap: `${bigint}`
	gasPremium: `${bigint}`
	method: string
	methodNumber: number
	evmMethod: string
	params: string // `ghkr${string}` | `0x${string}`
	receipt?: {
		exitCode: 0 | 1
		return: string // '' | `0x${string}`
		gasUsed: number
	}
	size: number
	error: string
	baseFee: `${bigint}`
	fee: {
		baseFeeBurn: `${bigint}`
		overEstimationBurn: `${bigint}`
		minerPenalty: `${bigint}`
		minerTip: `${bigint}`
		refund: `${bigint}`
	}
	transfers: Transfer[]
	ethTransactionHash?: `0x${string}`
	eventLogCount: number
	subcallCount: number
	tokenTransfers: TokenTransfer[]
}

export type MessageEvents = MessageEvent[]

export type MessageEvent = {
	address: string
	name: string
	data: `0x${string}`
	topics: `0x${string}`[]
	removed: boolean
	logIndex: number
}

export type Events = {
	totalCount: number
	events: Event[]
}

export type Event = {
	address: string
	data: `0x${string}`
	topics: `0x${string}`[]
	removed: boolean
	logIndex: number
	transactionIndex: number
	transactionHash: `bafy${string}`
	blockHash: `0x${string}`
	blockNumber: number
}

export type Transfer<
	T extends keyof typeof filfoxTransferTypes = keyof typeof filfoxTransferTypes
> = {
	from: string
	fromId: string
	fromTag?: {
		name: '-' | string
		signed: boolean
	}
	to: string
	toId: string
	toTag?: {
		name: '-' | string
		signed: boolean
	}
	value: `${bigint}`
	type: T
}

export type AddressMessages = {
	messages: Message[]
}

export type AddressTransfers = {
	totalCount: number
	transfers: AddressTransfer[]
	types: (keyof typeof filfoxTransferTypes)[]
}

export type AddressTransfer<
	T extends keyof typeof filfoxTransferTypes = keyof typeof filfoxTransferTypes
> = {
	height: number
	timestamp: number
	message?: string
	from: string
	fromTag?: {
		name: '-' | string
		signed: boolean
	}
	to: string
	toTag?: {
		name: '-' | string
		signed: boolean
	}
	value: `${bigint}`
	type: T
}

export type AddressMessageTransfers = {
	totalCount: number
	transfers: MessageTransfer[]
}

export type MessageTransfer = {
	message: string
	height: number
	timestamp: number
	value: `${bigint}`
}

export type AddressTokenTransfers = {
	totalCount: number
	transfers: TokenTransfer[]
}

export type TokenTransfer = {
	height: number
	timestamp: number
	message: string
	evmMethod: string
	from: string
	to: string
	token: string
	value: `${bigint}`
	type: string
	name: string
	symbol: string
	decimals: number
}
