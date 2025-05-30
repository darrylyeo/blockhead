import type { Address, Hash } from './address.js'
import type { ChainId } from './chain.js'

// Beacon chain entities
export enum BeaconEntity {
	Validator = 'Validator', // Consensus validators
	Attestation = 'Attestation', // Validator attestations
	Deposit = 'Deposit', // ETH deposits
	Withdrawal = 'Withdrawal', // ETH withdrawals
	Slashing = 'Slashing', // Validator slashing
	BlockProposal = 'BlockProposal', // Block proposals
	SyncCommittee = 'SyncCommittee' // Sync committee
}

export enum ValidatorStatus {
	PendingInitialized = 'PendingInitialized', // Deposit processed
	PendingQueued = 'PendingQueued', // Waiting for activation
	ActiveOngoing = 'ActiveOngoing', // Actively validating
	ActiveExiting = 'ActiveExiting', // Exiting validation
	ActiveSlashed = 'ActiveSlashed', // Slashed validator
	ExitedUnslashed = 'ExitedUnslashed', // Clean exit
	ExitedSlashed = 'ExitedSlashed', // Slashed exit
	WithdrawalPossible = 'WithdrawalPossible', // Can withdraw
	WithdrawalDone = 'WithdrawalDone' // Withdrawn
}

// Generic beacon data type with entity-specific fields
export type BeaconData<_T extends BeaconEntity = BeaconEntity> = (
	& {
		// Beacon identification
		slot: number
		epoch: number
		chainId: ChainId
		
		// Entity type
		entity: _T
		
		// Consensus data
		blockRoot: Hash
		stateRoot: Hash
		
		// Timing
		timestamp: number
		
		// Finality
		isFinalized: boolean
		justificationBits?: string
		
		// Network state
		networkInfo?: {
			totalValidators: number
			activeValidators: number
			totalStake: string
			participationRate: number
		}
	}

	& (
		_T extends BeaconEntity.Validator ?
			{
				// Validator identity
				validatorIndex: number
				publicKey: string
				withdrawalCredentials: Hash
				
				// Status and lifecycle
				status: ValidatorStatus
				activationEpoch?: number
				exitEpoch?: number
				withdrawableEpoch?: number
				slashedEpoch?: number
				
				// Balance and rewards
				balance: string // Gwei
				effectiveBalance: string // Gwei
				
				// Performance metrics
				performance: {
					attestationHitRate: number
					proposalCount: number
					slashingCount: number
					missedBlocks: number
					missedAttestations: number
				}
				
				// Execution layer
				executionAddress?: Address
				feeRecipient?: Address
				
				// Validator info
				validatorInfo?: {
					operatorName?: string
					isPooled: boolean
					poolAddress?: Address
					commission?: number
				}
			}

		: _T extends BeaconEntity.Attestation ?
			{
				// Attestation details
				attestingIndices: number[]
				aggregationBits: string
				signature: string
				
				// Attestation data
				beaconBlockRoot: Hash
				source: {
					epoch: number
					root: Hash
				}
				target: {
					epoch: number
					root: Hash
				}
				
				// Committee info
				committeeIndex: number
				
				// Inclusion details
				inclusionDelay?: number
				proposerIndex?: number
				
				// Rewards
				baseReward?: string
				proposerReward?: string
				inclusionReward?: string
			}

		: _T extends BeaconEntity.Deposit ?
			{
				// Deposit details
				depositorAddress: Address
				validatorPublicKey: string
				amount: string // ETH
				signature: string
				
				// Deposit processing
				depositIndex: number
				isValid: boolean
				
				// Execution layer context
				executionBlockNumber: number
				executionTransactionHash: Hash
				
				// Validator context
				validatorIndex?: number
				isNewValidator: boolean
				
				// Pool context
				stakingPool?: {
					poolAddress: Address
					poolName: string
					operatorFee: number
				}
			}

		: _T extends BeaconEntity.Withdrawal ?
			{
				// Withdrawal details
				withdrawalIndex: number
				validatorIndex: number
				address: Address
				amount: string // ETH
				
				// Withdrawal type
				withdrawalType: 'partial' | 'full' | 'skipped'
				
				// Execution layer
				executionBlockNumber?: number
				executionTransactionHash?: Hash
				
				// Validator context
				validatorBalance: string
				effectiveBalance: string
				
				// Performance impact
				rewardsEarned?: string
				penaltiesIncurred?: string
				netRewards?: string
			}

		: _T extends BeaconEntity.Slashing ?
			{
				// Slashing details
				slashedValidatorIndex: number
				slasherIndex?: number
				slashingType: 'proposer' | 'attester'
				
				// Slashing reason
				violation: 'double-proposal' | 'double-vote' | 'surround-vote'
				evidence: {
					conflictingData: any[]
					signatures: string[]
				}
				
				// Penalties
				slashingPenalty: string
				whistleblowerReward?: string
				
				// Impact
				validatorBalanceBefore: string
				validatorBalanceAfter: string
				
				// Network impact
				networkPenalty?: string
			}

		: _T extends BeaconEntity.BlockProposal ?
			{
				// Proposer details
				proposerIndex: number
				proposerPublicKey: string
				
				// Block details
				parentRoot: Hash
				randaoReveal: string
				graffiti: string
				
				// Block body
				attestationCount: number
				depositCount: number
				voluntaryExitCount: number
				slashingCount: number
				
				// Execution payload
				executionPayload?: {
					blockNumber: number
					blockHash: Hash
					transactionCount: number
					gasUsed: string
					baseFeePerGas: string
					blobGasUsed?: string
				}
				
				// Rewards
				proposerReward: string
				attestationRewards: string
				syncCommitteeReward?: string
				
				// Performance
				onTime: boolean
				proposalDelay?: number
			}

		: _T extends BeaconEntity.SyncCommittee ?
			{
				// Committee composition
				validators: number[]
				aggregatePubkey: string
				
				// Participation
				participationBits: string
				signature: string
				
				// Performance
				participationRate: number
				rewardPerValidator: string
				
				// Period info
				period: number
				isCurrentPeriod: boolean
			}

		:
			{}
	)
)

// Convenience type aliases
export type BeaconValidator = BeaconData<BeaconEntity.Validator>
export type BeaconAttestation = BeaconData<BeaconEntity.Attestation>
export type BeaconDeposit = BeaconData<BeaconEntity.Deposit>
export type BeaconWithdrawal = BeaconData<BeaconEntity.Withdrawal>
export type BeaconSlashing = BeaconData<BeaconEntity.Slashing>
export type BeaconBlockProposal = BeaconData<BeaconEntity.BlockProposal>
export type BeaconSyncCommittee = BeaconData<BeaconEntity.SyncCommittee>

// Union type for all beacon variants
export type AnyBeaconData = BeaconData<BeaconEntity>

// Validator analytics
export enum ValidatorAnalyticsTimeframe {
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays',
	All = 'All'
}

export type ValidatorAnalytics = {
	validatorIndex: number
	timeframe: ValidatorAnalyticsTimeframe
	
	// Performance metrics
	performance: {
		attestationRate: number
		proposalRate: number
		syncCommitteeRate: number
		uptime: number
		effectivenessRating: number
	}
	
	// Reward tracking
	rewards: {
		totalRewards: string
		attestationRewards: string
		proposalRewards: string
		syncCommitteeRewards: string
		averageDailyRewards: string
	}
	
	// Penalty tracking
	penalties: {
		totalPenalties: string
		missedAttestations: number
		missedProposals: number
		inactivityPenalties: string
		slashingPenalties: string
	}
	
	// Balance tracking
	balanceHistory: Array<{
		epoch: number
		balance: string
		effectiveBalance: string
		change: string
	}>
	
	// Network position
	ranking: {
		performanceRank: number
		balanceRank: number
		rewardRank: number
		percentile: number
	}
}

// Network-wide beacon analytics
export type BeaconNetworkAnalytics = {
	chainId: ChainId
	currentEpoch: number
	currentSlot: number
	
	// Network state
	networkState: {
		totalValidators: number
		activeValidators: number
		pendingValidators: number
		exitingValidators: number
		slashedValidators: number
		
		totalStake: string
		activeStake: string
		averageBalance: string
	}
	
	// Performance metrics
	performance: {
		globalParticipationRate: number
		attestationRate: number
		proposalRate: number
		syncCommitteeRate: number
		finalizationRate: number
	}
	
	// Economic metrics
	economics: {
		totalIssuance: string
		totalBurn: string
		netIssuance: string
		stakingYield: number
		realYield: number
	}
	
	// Penalties and slashing
	penalties: {
		totalSlashings: number
		totalPenalties: string
		inactivityLeakActive: boolean
		averagePenalty: string
	}
	
	// MEV and execution
	mev: {
		totalMevRewards: string
		averageMevPerBlock: string
		mevParticipationRate: number
		topMevValidators: Array<{
			validatorIndex: number
			mevRewards: string
		}>
	}
} 