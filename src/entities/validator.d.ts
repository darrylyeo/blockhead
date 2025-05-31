import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Address, Hash } from './scalars'
import type { ChainId } from './network'
import type { Timestamp } from './types'

export type ValidatorIndex = number
export type Epoch = number
export type Slot = number
export type Gwei = string

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
	activationEpoch?: Epoch
	activationEligibilityEpoch?: Epoch
	exitEpoch?: Epoch
	withdrawableEpoch?: Epoch
	
	// Balances
	balance: Gwei
	effectiveBalance: Gwei
	withdrawnAmount?: Gwei
	
	// Performance
	performance: ValidatorPerformance
	effectiveness: number // 0-100%
	attestationSuccessRate: number
	proposalSuccessRate?: number
	syncCommitteeSuccessRate?: number
	
	// Rewards & Penalties
	totalRewards: Gwei
	totalPenalties: Gwei
	rewardsLastEpoch?: Gwei
	penaltiesLastEpoch?: Gwei
	
	// Slashing
	slashed: boolean
	slashingReason?: SlashingReason
	slashingEpoch?: Epoch
	slashingPenalty?: Gwei
	
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
	mevRewards?: Gwei
	mevBlocksProposed?: number
	
	// Activity
	lastAttestationSlot?: Slot
	lastProposalSlot?: Slot
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
	amount: Gwei
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
	slot: Slot
	committeeIndex: number
	validatorIndex: ValidatorIndex
	
	// Attestation data
	beaconBlockRoot: Hash
	source: {
		epoch: Epoch
		root: Hash
	}
	target: {
		epoch: Epoch
		root: Hash
	}
	
	// Performance
	inclusionDelay?: number
	reward?: Gwei
	missed: boolean
}

export type ValidatorProposal = {
	// Proposal identification
	slot: Slot
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
	blockReward: Gwei
	executionReward?: Gwei
	mevReward?: Gwei
	
	// Status
	missed: boolean
	orphaned: boolean
}

export type ValidatorSlashing = {
	// Slashing identification
	index: number
	validatorIndex: ValidatorIndex
	epoch: Epoch
	
	// Slashing details
	reason: SlashingReason
	evidence: {
		attestation1?: any
		attestation2?: any
		blockHeader1?: any
		blockHeader2?: any
	}
	
	// Penalties
	penalty: Gwei
	effectiveBalanceBefore: Gwei
	effectiveBalanceAfter: Gwei
	
	// Whistleblower
	whistleblowerIndex?: ValidatorIndex
	whistleblowerReward?: Gwei
	
	// Transaction
	blockNumber: number
	timestamp: Timestamp
}

export type ValidatorSync = {
	// Sync committee participation
	validatorIndex: ValidatorIndex
	period: number
	slot: Slot
	
	// Performance
	participated: boolean
	reward?: Gwei
	penalty?: Gwei
}

export type ValidatorQueue = {
	// Queue type
	type: 'activation' | 'exit' | 'withdrawal'
	
	// Queue data
	validators: Array<{
		index: ValidatorIndex
		pubkey: string
		position: number
		estimatedTime?: Timestamp
	}>
	
	// Queue stats
	totalInQueue: number
	processingRate: number // validators per epoch
	estimatedWaitTime: number // in seconds
}

export type ValidatorSet = {
	// Set identification
	epoch: Epoch
	slot: Slot
	
	// Validators
	activeValidators: ValidatorIndex[]
	totalValidators: number
	
	// Balances
	totalBalance: Gwei
	totalEffectiveBalance: Gwei
	
	// Performance
	participationRate: number
	averageBalance: Gwei
	
	// Changes
	activated: ValidatorIndex[]
	exited: ValidatorIndex[]
	slashed: ValidatorIndex[]
}

export type ValidatorRewards = {
	// Rewards identification
	validatorIndex: ValidatorIndex
	epoch: Epoch
	
	// Reward breakdown
	attestationReward: Gwei
	proposalReward?: Gwei
	syncCommitteeReward?: Gwei
	
	// Penalties
	attestationPenalty?: Gwei
	inactivityPenalty?: Gwei
	
	// Net
	netReward: Gwei
	
	// APR calculation
	apr?: number
	effectiveBalance: Gwei
}

export type ValidatorWithdrawal = {
	// Withdrawal identification
	index: number
	validatorIndex: ValidatorIndex
	
	// Withdrawal data
	address: Address
	amount: Gwei
	
	// Type
	isFullWithdrawal: boolean
	isPartialWithdrawal: boolean
	
	// Execution
	slot: Slot
	epoch: Epoch
	blockNumber: number
	timestamp: Timestamp
	transactionHash?: Hash
} 