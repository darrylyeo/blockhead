import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { ChainId } from './network'
import type { Address, Hash, Timestamp, TokenAmount, UsdAmount } from './scalars'
import type { ContractStandard } from './contract'

export enum ActorType {
	Eoa = 'Eoa', // Externally Owned Account
	Contract = 'Contract' // Smart Contract
}

// Contract standards and roles (previously subtypes)
export enum ContractTag {
	System = 'System',
	Multisig = 'Multisig',
	Proxy = 'Proxy',
	Factory = 'Factory',
	Token = 'Token',
	Exchange = 'Exchange',
	Bridge = 'Bridge',
	Oracle = 'Oracle',
	Governance = 'Governance',
	Treasury = 'Treasury',
	Registry = 'Registry',
	Router = 'Router',
	Vault = 'Vault',
	Staking = 'Staking',
	Dao = 'Dao',
	Marketplace = 'Marketplace',
	Launchpad = 'Launchpad'
}

// Main Actor type with generic parameters
export type Actor<
	_ActorType extends ActorType = ActorType,
	_ContractTag extends ContractTag = ContractTag
> = {
	// Actor identification
	type: _ActorType
	address: Address
	chainId: ChainId

	// Common metadata
	labels?: {
		name: string
		source: string
		verified: boolean
	}[]

	// Balance information
	balance?: TokenAmount
	balanceUsd?: UsdAmount

	// Activity tracking
	firstSeenAt?: Timestamp
	lastActiveAt?: Timestamp
	transactionCount?: number
	internalTransactionCount?: number

	// Security and verification
	riskLevel?: 'low' | 'medium' | 'high' | 'critical'
	securityScore?: number
	auditReports?: {
		auditor: string
		date: Timestamp
		reportUrl: string
		score?: number
	}[]
} & (
	_ActorType extends ActorType.Eoa ? {
		// EOA specific properties
		nonce?: number
		ensName?: string
		ensAvatar?: string
		ensReverse?: string

		// Wallet metadata
		isVerified?: boolean
		tags?: string[]

		// Transaction patterns
		averageGasPrice?: string
		preferredGasLimit?: string
	}
	: _ActorType extends ActorType.Contract ? {
		// Contract properties
		bytecode?: Hash
		creationTransaction?: Hash
		creationBlock?: number
		isVerified?: boolean
		bytecodeSize?: number
		hasSource?: boolean
		verificationDate?: number
		verificationMethod?: 'etherscan' | 'sourcify' | 'manual'

		// Contract tags and standards
		tags?: _ContractTag[]
		standards?: ContractStandard[]

		// Proxy details
		proxyType?: ProxyType
		isUpgradable?: boolean
		upgradeHistory?: {
			timestamp: Timestamp
			oldImplementation: Address
			newImplementation: Address
		}[]

		// Protocol info
		protocolName?: string
		protocolVersion?: string
		protocolRole?: string
	}
	: {}
)
// Conditional fields for each tag (only applied to Contract actors)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Multisig ? {
			// Multisig properties
			signers?: Address[]
			threshold?: number
			multisigType?: 'gnosis-safe' | 'multi-sig-wallet' | 'custom'
		} : {}
	: {}
)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Factory ? {
			// Factory properties
			deploymentPattern?: 'create' | 'create2' | 'clone'
			deploymentsCount?: number
			deploySalt?: Hash
		} : {}
	: {}
)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Token ? {
			// Token properties
			tokenStandard?: 'Erc20' | 'Erc721' | 'Erc1155' | 'Erc4626'
			symbol?: string
			name?: string
			decimals?: number
			totalSupply?: string
		} : {}
	: {}
)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Exchange ? {
			// Exchange properties
			exchangeType?: 'dex' | 'orderbook' | 'amm' | 'aggregator'
			version?: string
			feeStructure?: {
				tradingFee: number
				protocolFee: number
			}
		} : {}
	: {}
)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Bridge ? {
			// Bridge properties
			bridgeType?: 'lock-mint' | 'burn-mint' | 'liquidity'
			sourceChains?: ChainId[]
			targetChains?: ChainId[]
			bridgeVersion?: string
			securityModel?: string
		} : {}
	: {}
)
& (
	_ActorType extends ActorType.Contract ?
		_ContractTag extends ContractTag.Oracle ? {
			// Oracle properties
			oracleType?: 'price' | 'random' | 'data' | 'computation'
			dataFeeds?: string[]
			updateFrequency?: number
			aggregationMethod?: string
		} : {}
	: {}
)
& {
	_relatedContracts?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>[]
	_createdContracts?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>[]
	_controlledBy?: PartialExceptOneOf<Actor, 'address'>
	_controls?: PartialExceptOneOf<Actor, 'address'>[]

	// For contracts
	_creator?: PartialExceptOneOf<Actor, 'address'>
	_implementation?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>
	_admin?: PartialExceptOneOf<Actor, 'address'>
	_templateContract?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>

	// Transactions associated with this actor
	_transactions?: PartialExceptOneOf<import('./transaction').Transaction, 'id'>[]
}

// Supporting types
export type ProxyType = (
	| 'eip-1967' // Transparent proxy
	| 'eip-1822' // Universal upgradeable proxy
	| 'eip-897'  // Delegate proxy
	| 'beacon'
	| 'diamond'
	| 'minimal'
	| 'clone'
)
