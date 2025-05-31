import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { ChainId } from './chain'
import type { Address, Hash, NativeCurrencyAmount, Timestamp } from './scalars'

export type ValidatorIndex = number
export type EpochNumber = bigint
export type SlotNumber = bigint

export enum ValidatorStatus {
	Pending = 'Pending', // Waiting to be activated
	Active = 'Active', // Currently validating
	Exiting = 'Exiting', // In the process of exiting
	Exited = 'Exited', // No longer validating
	Slashed = 'Slashed', // Slashed for misbehavior
	WithdrawalPossible = 'WithdrawalPossible', // Can withdraw
	WithdrawalDone = 'WithdrawalDone' // Withdrawal completed
}

export enum ValidatorPerformance {
	Excellent = 'Excellent', // >99% effectiveness
	Good = 'Good', // 95-99% effectiveness
	Average = 'Average', // 90-95% effectiveness
	Poor = 'Poor', // 80-90% effectiveness
	Failing = 'Failing' // <80% effectiveness
}

export enum SlashingReason {
	AttesterSlashing = 'AttesterSlashing',
	ProposerSlashing = 'ProposerSlashing',
	DoubleVote = 'DoubleVote',
	SurroundVote = 'SurroundVote',
	DoubleProposal = 'DoubleProposal'
}

export type Validator = {
	// Validator identification
	index: ValidatorIndex
	pubkey: string
	withdrawalCredentials: string
	chainId: ChainId

	// Status
	status: ValidatorStatus
	activationEpoch?: EpochNumber
	activationEligibilityEpoch?: EpochNumber
	exitEpoch?: EpochNumber
	withdrawableEpoch?: EpochNumber

	// Balances
	balance: NativeCurrencyAmount
	effectiveBalance: NativeCurrencyAmount
	withdrawnAmount?: NativeCurrencyAmount

	// Performance
	performance: ValidatorPerformance
	effectiveness: number // 0-100%
	attestationSuccessRate: number
	proposalSuccessRate?: number
	syncCommitteeSuccessRate?: number

	// Rewards & Penalties
	totalRewards: NativeCurrencyAmount
	totalPenalties: NativeCurrencyAmount
	rewardsLastEpoch?: NativeCurrencyAmount
	penaltiesLastEpoch?: NativeCurrencyAmount

	// Slashing
	slashed: boolean
	slashingReason?: SlashingReason
	slashingEpoch?: EpochNumber
	slashingPenalty?: NativeCurrencyAmount

	// Operator information
	operatorAddress?: Address
	feeRecipient?: Address
	graffiti?: string

	// Client information
	clientName?: string
	clientVersion?: string

	// Pool information
	isPoolValidator?: boolean
	poolName?: string
	poolAddress?: Address
	poolFee?: number // percentage

	// Mev
	mevRewards?: NativeCurrencyAmount
	mevBlocksProposed?: number

	// Activity
	lastAttestationSlot?: SlotNumber
	lastProposalSlot?: SlotNumber
	missedAttestations?: number
	missedProposals?: number

	// Timestamps
	createdAt: Timestamp
	lastActiveAt?: Timestamp
	updatedAt: Timestamp
}

export type ValidatorDeposit = {
	// Deposit identification
	index: number
	pubkey: string
	withdrawalCredentials: string

	// Deposit data
	amount: NativeCurrencyAmount
	signature: string
	depositDataRoot: Hash

	// Transaction
	transactionHash: Hash
	blockNumber: number
	timestamp: Timestamp
	from: Address

	// Merkle proof
	proof?: string[]

	// Status
	included: boolean
	validatorIndex?: ValidatorIndex
}

export type ValidatorAttestation = {
	// Attestation identification
	slot: SlotNumber
	committeeIndex: number
	validatorIndex: ValidatorIndex

	// Attestation data
	beaconBlockRoot: Hash
	source: {
		epoch: EpochNumber
		root: Hash
	}
	target: {
		epoch: EpochNumber
		root: Hash
	}

	// Performance
	inclusionDelay?: number
	reward?: NativeCurrencyAmount
	missed: boolean
}

export type ValidatorProposal = {
	// Proposal identification
	slot: SlotNumber
	proposerIndex: ValidatorIndex
	blockRoot: Hash

	// Block data
	parentRoot: Hash
	stateRoot: Hash
	randaoReveal: string

	// Execution payload
	executionPayload?: {
		blockHash: Hash
		blockNumber: number
		timestamp: Timestamp
		feeRecipient: Address
		gasUsed: string
		gasLimit: string
		baseFeePerGas: string
	}

	// Rewards
	blockReward: NativeCurrencyAmount
	executionReward?: NativeCurrencyAmount
	mevReward?: NativeCurrencyAmount

	// Status
	missed: boolean
	orphaned: boolean
}

export type ValidatorSlashing = {
	// Slashing identification
	index: number
	validatorIndex: ValidatorIndex
	epoch: EpochNumber

	// Slashing details
	reason: SlashingReason
	evidence: {
		attestation1?: any
		attestation2?: any
		blockHeader1?: any
		blockHeader2?: any
	}

	// Penalties
	penalty: NativeCurrencyAmount
	effectiveBalanceBefore: NativeCurrencyAmount
	effectiveBalanceAfter: NativeCurrencyAmount

	// Whistleblower
	whistleblowerIndex?: ValidatorIndex
	whistleblowerReward?: NativeCurrencyAmount

	// Transaction
	blockNumber: number
	timestamp: Timestamp
}

export type ValidatorSync = {
	// Sync committee participation
	validatorIndex: ValidatorIndex
	period: number
	slot: SlotNumber

	// Performance
	participated: boolean
	reward?: NativeCurrencyAmount
	penalty?: NativeCurrencyAmount
}

export type ValidatorQueue = {
	// Queue type
	type: 'activation' | 'exit' | 'withdrawal'

	// Queue data
	validators: {
		index: ValidatorIndex
		pubkey: string
		position: number
		estimatedTime?: Timestamp
	}[]

	// Queue stats
	totalInQueue: number
	processingRate: number // validators per epoch
	estimatedWaitTime: number // in seconds
}

export type ValidatorSet = {
	// Set identification
	epoch: EpochNumber
	slot: SlotNumber

	// Validators
	activeValidators: ValidatorIndex[]
	totalValidators: number

	// Balances
	totalBalance: NativeCurrencyAmount
	totalEffectiveBalance: NativeCurrencyAmount

	// Performance
	participationRate: number
	averageBalance: NativeCurrencyAmount

	// Changes
	activated: ValidatorIndex[]
	exited: ValidatorIndex[]
	slashed: ValidatorIndex[]
}

export type ValidatorRewards = {
	// Rewards identification
	validatorIndex: ValidatorIndex
	epoch: EpochNumber

	// Reward breakdown
	attestationReward: NativeCurrencyAmount
	proposalReward?: NativeCurrencyAmount
	syncCommitteeReward?: NativeCurrencyAmount

	// Penalties
	attestationPenalty?: NativeCurrencyAmount
	inactivityPenalty?: NativeCurrencyAmount

	// Net
	netReward: NativeCurrencyAmount

	// APR calculation
	apr?: number
	effectiveBalance: NativeCurrencyAmount
}

export type ValidatorWithdrawal = {
	// Withdrawal identification
	index: number
	validatorIndex: ValidatorIndex

	// Withdrawal data
	address: Address
	amount: NativeCurrencyAmount

	// Type
	isFullWithdrawal: boolean
	isPartialWithdrawal: boolean

	// Execution
	slot: SlotNumber
	epoch: EpochNumber
	blockNumber: number
	timestamp: Timestamp
	transactionHash?: Hash
} 