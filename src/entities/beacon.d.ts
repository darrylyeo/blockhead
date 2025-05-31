import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { ChainId } from './network'
import type { Address, Hash } from './scalars'
import type { BasisPoints, BlockNumber, Percentage, Timestamp } from './types'
import type { Epoch, Gwei, Slot } from './validator'

// Beacon entity types
export enum BeaconEntity {
	Block = 'Block',
	Attestation = 'Attestation',
	Proposal = 'Proposal',
	Sync = 'Sync',
	Committee = 'Committee',
	Slashing = 'Slashing',
	Exit = 'Exit',
	Withdrawal = 'Withdrawal',
	Deposit = 'Deposit',
	Reward = 'Reward'
}

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

// Generic beacon data type with entity-specific fields
export type BeaconData<_BeaconEntity extends BeaconEntity = BeaconEntity> = (
	& {
		// Beacon identification
		id: string
		chainId: ChainId
		entity: _BeaconEntity
		
		// Position in beacon chain
		epoch: Epoch
		slot: Slot
		
		// Timing
		timestamp: Timestamp
		
		// Common metadata
		isActive: boolean
		isFinalized: boolean
	}

	& (
		_BeaconEntity extends BeaconEntity.Block ?
			{
				// Block data
				blockType: BeaconBlockType
				blockRoot: Hash
				parentRoot: Hash
				stateRoot: Hash
				
				// Block metadata
				proposerIndex: number
				proposerAddress: Address
				randaoReveal: string
				graffiti: string
				
				// Block content
				attestations: number
				deposits: number
				voluntaryExits: number
				attesterSlashings: number
				proposerSlashings: number
				
				// Execution payload (post-merge)
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
				
				// Metrics
				blockSize: number
				transactionCount?: number
				totalDifficulty?: string
			}

		: _BeaconEntity extends BeaconEntity.Attestation ?
			{
				// Attestation data
				status: AttestationStatus
				aggregationBits: string
				signature: string
				
				// Committee info
				committeeIndex: number
				validatorIndices: number[]
				
				// Attestation target
				sourceEpoch: Epoch
				sourceRoot: Hash
				targetEpoch: Epoch
				targetRoot: Hash
				beaconBlockRoot: Hash
				
				// Inclusion info
				inclusionSlot?: Slot
				inclusionIndex?: number
				inclusionDelay?: number
			}

		: _BeaconEntity extends BeaconEntity.Proposal ?
			{
				// Proposer data
				proposerIndex: number
				proposerAddress: Address
				status: ProposerStatus
				
				// Proposal data
				blockRoot?: Hash
				signature?: string
				
				// Missed proposal info
				missedReason?: string
				slashingEligible?: boolean
			}

		: _BeaconEntity extends BeaconEntity.Sync ?
			{
				// Sync committee data
				syncCommitteeBits: string
				syncCommitteeSignature: string
				validatorIndices: number[]
				
				// Participation
				participationRate: Percentage
				validatorCount: number
			}

		: _BeaconEntity extends BeaconEntity.Committee ?
			{
				// Committee data
				committeeIndex: number
				validatorIndices: number[]
				
				// Committee size
				committeeSize: number
				targetCommitteeSize: number
				
				// Duties
				attestationSlot: Slot
				attestationShard?: number
			}

		: _BeaconEntity extends BeaconEntity.Slashing ?
			{
				// Slashing data
				slashingType: SlashingType
				whistleblowerIndex?: number
				whistleblowerReward?: Gwei
				
				// Slashed validators
				slashedIndices: number[]
				slashedAddresses: Address[]
				totalSlashed: Gwei
				
				// Evidence
				attestation1?: {
					attestingIndices: number[]
					data: any
					signature: string
				}
				attestation2?: {
					attestingIndices: number[]
					data: any
					signature: string
				}
				
				// Proposal slashing
				signedHeader1?: any
				signedHeader2?: any
			}

		: _BeaconEntity extends BeaconEntity.Exit ?
			{
				// Exit data
				exitType: ExitType
				validatorIndex: number
				validatorAddress: Address
				
				// Exit timing
				exitEpoch: Epoch
				withdrawableEpoch: Epoch
				
				// Exit details
				signature?: string
				reason?: string
			}

		: _BeaconEntity extends BeaconEntity.Withdrawal ?
			{
				// Withdrawal data
				status: WithdrawalStatus
				validatorIndex: number
				validatorAddress: Address
				withdrawalAddress: Address
				
				// Amounts
				amount: Gwei
				fee?: Gwei
				netAmount?: Gwei
				
				// Processing info
				withdrawalIndex?: number
				executionBlockNumber?: BlockNumber
				executionTransaction?: Hash
			}

		: _BeaconEntity extends BeaconEntity.Deposit ?
			{
				// Deposit data
				status: DepositStatus
				pubkey: string
				withdrawalCredentials: string
				signature: string
				
				// Deposit amount
				amount: Gwei
				
				// Source info
				depositorAddress: Address
				transactionHash: Hash
				logIndex: number
				blockNumber: BlockNumber
				
				// Validator info
				validatorIndex?: number
				activationEpoch?: Epoch
			}

		: _BeaconEntity extends BeaconEntity.Reward ?
			{
				// Reward data
				rewardType: RewardType
				validatorIndex: number
				validatorAddress: Address
				
				// Reward amounts
				amount: Gwei
				baseReward?: Gwei
				inclusionReward?: Gwei
				
				// Performance
				performance?: Percentage
				effectiveness?: Percentage
			}

		:
			{}
	)
)

// Validator analytics
export enum ValidatorAnalyticsTimeframe {
	OneEpoch = 'OneEpoch',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type ValidatorAnalytics = {
	validatorIndex: number
	timeframe: ValidatorAnalyticsTimeframe
	
	// Performance metrics
	attestationRate: Percentage
	proposalRate: Percentage
	syncCommitteeRate?: Percentage
	
	// Reward metrics
	totalRewards: Gwei
	attestationRewards: Gwei
	proposalRewards: Gwei
	syncRewards?: Gwei
	
	// Penalty metrics
	totalPenalties: Gwei
	missedAttestations: number
	missedProposals: number
	
	// Effectiveness
	effectiveness: Percentage
	uptime: Percentage
	inclusionDelay: number
}

export type BeaconChainState = {
	chainId: ChainId
	
	// Current state
	currentEpoch: Epoch
	currentSlot: Slot
	finalizedEpoch: Epoch
	justifiedEpoch: Epoch
	
	// Validators
	activeValidators: number
	totalValidators: number
	queuedValidators: number
	exitingValidators: number
	
	// Network metrics
	participationRate: Percentage
	networkBalance: Gwei
	totalStaked: Gwei
	
	// Recent performance
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
	// Entity filters
	entities?: BeaconEntity[]
	
	// Time filters
	epochRange?: {
		from: Epoch
		to: Epoch
	}
	slotRange?: {
		from: Slot
		to: Slot
	}
	
	// Validator filters
	validatorIndices?: number[]
	validatorAddresses?: Address[]
	
	// Status filters
	statuses?: string[]
	isFinalized?: boolean
	
	// Performance filters
	minParticipationRate?: Percentage
	maxInclusionDelay?: number
	
	// Pagination
	limit?: number
	offset?: number
} 