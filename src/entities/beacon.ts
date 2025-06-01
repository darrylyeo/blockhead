import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { ChainId } from './network'
import type { Address, Hash, NativeCurrencyAmount, Percentage, Timestamp, ValidatorIndex, EpochNumber, SlotNumber, BlockNumber, BasisPoints } from './scalars'

// Core consensus operations
export enum ConsensusEntity {
	Block = 'Block',
	Attestation = 'Attestation',
	Proposal = 'Proposal'
}

// Committee and sync operations
export enum CommitteeEntity {
	Committee = 'Committee',
	Sync = 'Sync'
}

// Validator lifecycle management
export enum ValidatorLifecycleEntity {
	Deposit = 'Deposit',
	Exit = 'Exit',
	Slashing = 'Slashing'
}

// Economic operations
export enum EconomicEntity {
	Withdrawal = 'Withdrawal',
	Reward = 'Reward'
}

// All beacon entities combined (for backwards compatibility)
export enum BeaconEntity {
	Block = 'Block',
	Attestation = 'Attestation',
	Proposal = 'Proposal',
	Committee = 'Committee',
	Sync = 'Sync',
	Deposit = 'Deposit',
	Exit = 'Exit',
	Slashing = 'Slashing',
	Withdrawal = 'Withdrawal',
	Reward = 'Reward'
}

export type BeaconEntityType = 
	| ConsensusEntity
	| CommitteeEntity
	| ValidatorLifecycleEntity
	| EconomicEntity

export enum BeaconBlockType {
	Genesis = 'Genesis',
	Regular = 'Regular',
	Skipped = 'Skipped',
	Orphaned = 'Orphaned',
	Canonical = 'Canonical'
}

export enum AttestationStatus {
	Pending = 'Pending',
	Included = 'Included',
	Missed = 'Missed',
	Invalid = 'Invalid'
}

export enum ProposerStatus {
	Scheduled = 'Scheduled',
	Proposed = 'Proposed',
	Missed = 'Missed',
	Orphaned = 'Orphaned'
}

export enum SlashingType {
	AttesterSlashing = 'AttesterSlashing',
	ProposerSlashing = 'ProposerSlashing'
}

export enum ExitType {
	Voluntary = 'Voluntary',
	Forced = 'Forced'
}

export enum WithdrawalStatus {
	Pending = 'Pending',
	Processing = 'Processing',
	Completed = 'Completed',
	Failed = 'Failed'
}

export enum DepositStatus {
	Pending = 'Pending',
	Included = 'Included',
	Invalid = 'Invalid'
}

export enum RewardType {
	Attestation = 'Attestation',
	Proposal = 'Proposal',
	Sync = 'Sync',
	Slashing = 'Slashing'
}

// Base beacon entity with common fields
type BaseBeaconEntity = {
	id: string
	chainId: ChainId
	epoch: EpochNumber
	slot: SlotNumber
	timestamp: Timestamp
	isActive: boolean
	isFinalized: boolean
}

// Consensus entity types
export type BeaconBlock = BaseBeaconEntity & {
	entity: ConsensusEntity.Block
	blockType: BeaconBlockType
	blockRoot: Hash
	parentRoot: Hash
	stateRoot: Hash
	proposerIndex: ValidatorIndex
	proposerAddress: Address
	randaoReveal: string
	graffiti: string
	attestations: number
	deposits: number
	voluntaryExits: number
	attesterSlashings: number
	proposerSlashings: number
	blockSize: number
	transactionCount?: number
	totalDifficulty?: string
	executionPayload?: {
		parentHash: Hash
		feeRecipient: Address
		stateRoot: Hash
		receiptsRoot: Hash
		logsBloom: string
		prevRandao: string
		blockNumber: BlockNumber
		gasLimit: string
		gasUsed: string
		timestamp: Timestamp
		extraData: string
		baseFeePerGas: string
		blockHash: Hash
		transactionsRoot: Hash
		withdrawalsRoot?: Hash
	}
}

export type BeaconAttestation = BaseBeaconEntity & {
	entity: ConsensusEntity.Attestation
	status: AttestationStatus
	aggregationBits: string
	signature: string
	committeeIndex: number
	validatorIndices: ValidatorIndex[]
	sourceEpoch: EpochNumber
	sourceRoot: Hash
	targetEpoch: EpochNumber
	targetRoot: Hash
	beaconBlockRoot: Hash
	inclusionSlot?: SlotNumber
	inclusionIndex?: number
	inclusionDelay?: number
}

export type BeaconProposal = BaseBeaconEntity & {
	entity: ConsensusEntity.Proposal
	proposerIndex: ValidatorIndex
	proposerAddress: Address
	status: ProposerStatus
	blockRoot?: Hash
	signature?: string
	missedReason?: string
	slashingEligible?: boolean
}

// Committee entity types
export type BeaconCommittee = BaseBeaconEntity & {
	entity: CommitteeEntity.Committee
	committeeIndex: number
	validatorIndices: ValidatorIndex[]
	committeeSize: number
	targetCommitteeSize: number
	attestationSlot: SlotNumber
	attestationShard?: number
}

export type BeaconSync = BaseBeaconEntity & {
	entity: CommitteeEntity.Sync
	syncCommitteeBits: string
	syncCommitteeSignature: string
	validatorIndices: ValidatorIndex[]
	participationRate: Percentage
	validatorCount: number
}

// Validator lifecycle entity types
export type BeaconDeposit = BaseBeaconEntity & {
	entity: ValidatorLifecycleEntity.Deposit
	status: DepositStatus
	pubkey: string
	withdrawalCredentials: string
	signature: string
	amount: NativeCurrencyAmount
	depositorAddress: Address
	transactionHash: Hash
	logIndex: number
	blockNumber: BlockNumber
	validatorIndex?: ValidatorIndex
	activationEpoch?: EpochNumber
}

export type BeaconExit = BaseBeaconEntity & {
	entity: ValidatorLifecycleEntity.Exit
	exitType: ExitType
	validatorIndex: ValidatorIndex
	validatorAddress: Address
	exitEpoch: EpochNumber
	withdrawableEpoch: EpochNumber
	signature?: string
	reason?: string
}

export type BeaconSlashing = BaseBeaconEntity & {
	entity: ValidatorLifecycleEntity.Slashing
	slashingType: SlashingType
	whistleblowerIndex?: ValidatorIndex
	whistleblowerReward?: NativeCurrencyAmount
	slashedIndices: ValidatorIndex[]
	slashedAddresses: Address[]
	totalSlashed: NativeCurrencyAmount
	attestation1?: {
		attestingIndices: ValidatorIndex[]
		data: any
		signature: string
	}
	attestation2?: {
		attestingIndices: ValidatorIndex[]
		data: any
		signature: string
	}
	signedHeader1?: any
	signedHeader2?: any
}

// Economic entity types
export type BeaconWithdrawal = BaseBeaconEntity & {
	entity: EconomicEntity.Withdrawal
	status: WithdrawalStatus
	validatorIndex: ValidatorIndex
	validatorAddress: Address
	withdrawalAddress: Address
	amount: NativeCurrencyAmount
	fee?: NativeCurrencyAmount
	netAmount?: NativeCurrencyAmount
	withdrawalIndex?: number
	executionBlockNumber?: BlockNumber
	executionTransaction?: Hash
}

export type BeaconReward = BaseBeaconEntity & {
	entity: EconomicEntity.Reward
	rewardType: RewardType
	validatorIndex: ValidatorIndex
	validatorAddress: Address
	amount: NativeCurrencyAmount
	baseReward?: NativeCurrencyAmount
	inclusionReward?: NativeCurrencyAmount
	performance?: Percentage
	effectiveness?: Percentage
}

export type BeaconAttestationReward = BeaconReward & {
	rewardType: RewardType.Attestation
	attestationRewardData: {
		sourceEpoch: EpochNumber
		targetEpoch: EpochNumber
		headVote: boolean
		sourceVote: boolean
		targetVote: boolean
		inclusionDelay?: number
	}
}

export type BeaconProposalReward = BeaconReward & {
	rewardType: RewardType.Proposal
	proposalRewardData: {
		blockRoot: Hash
		attestationsIncluded: number
		syncAggregateIncluded: boolean
		executionPayloadValue?: NativeCurrencyAmount
		mevReward?: NativeCurrencyAmount
	}
}

export type BeaconSyncReward = BeaconReward & {
	rewardType: RewardType.Sync
	syncRewardData: {
		syncCommitteeIndex: number
		participationRate: Percentage
		signatureIncluded: boolean
	}
}

export type BeaconSlashingReward = BeaconReward & {
	rewardType: RewardType.Slashing
	slashingRewardData: {
		slashedValidatorIndex: ValidatorIndex
		slashingType: SlashingType
		whistleblowerShare: NativeCurrencyAmount
		proposerShare: NativeCurrencyAmount
	}
}

// Union types by category
export type ConsensusBeaconEntity = 
	| BeaconBlock
	| BeaconAttestation
	| BeaconProposal

export type CommitteeBeaconEntity = 
	| BeaconCommittee
	| BeaconSync

export type ValidatorLifecycleBeaconEntity = 
	| BeaconDeposit
	| BeaconExit
	| BeaconSlashing

export type EconomicBeaconEntity = 
	| BeaconWithdrawal
	| BeaconAttestationReward
	| BeaconProposalReward
	| BeaconSyncReward
	| BeaconSlashingReward

// All beacon entities combined
export type AnyBeaconEntity = 
	| ConsensusBeaconEntity
	| CommitteeBeaconEntity
	| ValidatorLifecycleBeaconEntity
	| EconomicBeaconEntity

// Validator analytics
export enum ValidatorAnalyticsTimeframe {
	OneEpoch = 'OneEpoch',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type ValidatorAnalytics = {
	validatorIndex: ValidatorIndex
	timeframe: ValidatorAnalyticsTimeframe
	attestationRate: Percentage
	proposalRate: Percentage
	syncCommitteeRate?: Percentage
	totalRewards: NativeCurrencyAmount
	attestationRewards: NativeCurrencyAmount
	proposalRewards: NativeCurrencyAmount
	syncRewards?: NativeCurrencyAmount
	totalPenalties: NativeCurrencyAmount
	missedAttestations: number
	missedProposals: number
	effectiveness: Percentage
	uptime: Percentage
	inclusionDelay: number
}

export type BeaconChainState = {
	chainId: ChainId
	currentEpoch: EpochNumber
	currentSlot: SlotNumber
	finalizedEpoch: EpochNumber
	justifiedEpoch: EpochNumber
	activeValidators: number
	totalValidators: number
	queuedValidators: number
	exitingValidators: number
	participationRate: Percentage
	networkBalance: NativeCurrencyAmount
	totalStaked: NativeCurrencyAmount
	recentBlocks: {
		proposed: number
		missed: number
		orphaned: number
	}
	recentAttestations: {
		included: number
		missed: number
	}
}

export type BeaconFilter = {
	entities?: BeaconEntityType[]
	consensusEntities?: ConsensusEntity[]
	committeeEntities?: CommitteeEntity[]
	validatorLifecycleEntities?: ValidatorLifecycleEntity[]
	economicEntities?: EconomicEntity[]
	epochRange?: {
		from: EpochNumber
		to: EpochNumber
	}
	slotRange?: {
		from: SlotNumber
		to: SlotNumber
	}
	validatorIndices?: ValidatorIndex[]
	validatorAddresses?: Address[]
	statuses?: string[]
	isFinalized?: boolean
	minParticipationRate?: Percentage
	maxInclusionDelay?: number
	limit?: number
	offset?: number
} 