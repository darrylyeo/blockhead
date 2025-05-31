import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { ChainId } from './network'
import type { Address, Hash } from './scalars'
import type { Timestamp } from './types'

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
export type Actor<_ActorType extends ActorType = ActorType> = {
	// Actor identification
	type: _ActorType
	address: Address
	chainId: ChainId
	
	// Common metadata
	labels?: Array<{
		name: string
		source: string
		verified: boolean
	}>
	
	// Balance information
	balance?: string // Wei
	balanceUsd?: number
	
	// Activity tracking
	firstSeenAt?: Timestamp
	lastActiveAt?: Timestamp
	transactionCount?: number
	internalTransactionCount?: number
	
	// Security and verification
	riskLevel?: 'low' | 'medium' | 'high' | 'critical'
	securityScore?: number
	auditReports?: Array<{
		auditor: string
		date: Timestamp
		reportUrl: string
		score?: number
	}>
	
	// Entity References
	relatedContracts?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>[]
	createdContracts?: PartialExceptOneOf<Actor<ActorType.Contract>, 'address'>[]
	controlledBy?: PartialExceptOneOf<Actor, 'address'>
	controls?: PartialExceptOneOf<Actor, 'address'>[]
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
		creator?: Address
		creationTransaction?: Hash
		creationBlock?: number
		isVerified?: boolean
		bytecodeSize?: number
		hasSource?: boolean
		verificationDate?: number
		verificationMethod?: 'etherscan' | 'sourcify' | 'manual'
		
		// Contract tags and standards
		tags?: ContractTag[]
		standards?: ContractStandard[]
		
		// Implementation details (for proxies)
		implementation?: Address
		admin?: Address
		proxyType?: ProxyType
		isUpgradable?: boolean
		upgradeHistory?: Array<{
			timestamp: Timestamp
			oldImplementation: Address
			newImplementation: Address
		}>
		
		// Multisig properties (when tagged as Multisig)
		signers?: Address[]
		threshold?: number
		multisigType?: 'gnosis-safe' | 'multi-sig-wallet' | 'custom'
		
		// Factory properties (when tagged as Factory)
		deploymentPattern?: 'create' | 'create2' | 'clone'
		deploymentsCount?: number
		templateContract?: Address
		deploySalt?: Hash
		
		// Token properties (when tagged as Token)
		tokenStandard?: 'Erc20' | 'Erc721' | 'Erc1155' | 'Erc4626'
		symbol?: string
		name?: string
		decimals?: number
		totalSupply?: string
		
		// Exchange properties (when tagged as Exchange)
		exchangeType?: 'dex' | 'orderbook' | 'amm' | 'aggregator'
		version?: string
		feeStructure?: {
			tradingFee: number
			protocolFee: number
		}
		
		// Bridge properties (when tagged as Bridge)
		bridgeType?: 'lock-mint' | 'burn-mint' | 'liquidity'
		sourceChains?: ChainId[]
		targetChains?: ChainId[]
		bridgeVersion?: string
		securityModel?: string
		
		// Oracle properties (when tagged as Oracle)
		oracleType?: 'price' | 'random' | 'data' | 'computation'
		dataFeeds?: string[]
		updateFrequency?: number
		aggregationMethod?: string
		
		// Protocol info
		protocolName?: string
		protocolVersion?: string
		protocolRole?: string
	}
	: {}
)

// Contract standards
export enum ContractStandard {
	Erc20 = 'Erc20',
	Erc721 = 'Erc721',
	Erc1155 = 'Erc1155',
	Erc4626 = 'Erc4626',
	Erc1967 = 'Erc1967', // Proxy Standard
	Erc1822 = 'Erc1822', // UUPS
	Erc2535 = 'Erc2535', // Diamond Standard
	Erc4337 = 'Erc4337', // Account Abstraction
	Erc6551 = 'Erc6551', // Token Bound Accounts
	Erc3156 = 'Erc3156', // Flash Loans
	Erc2612 = 'Erc2612', // Permit
}

// Supporting types
export type ProxyType = 
	| 'eip-1967' // Transparent proxy
	| 'eip-1822' // Universal upgradeable proxy
	| 'eip-897'  // Delegate proxy
	| 'beacon'
	| 'diamond'
	| 'minimal'
	| 'clone'

// Security types
export type SecurityAudit = {
	auditor: string
	auditDate: number
	reportUrl?: string
	score?: number
	findings: {
		critical: number
		high: number
		medium: number
		low: number
		informational: number
	}
}

export type Vulnerability = {
	id: string
	severity: 'critical' | 'high' | 'medium' | 'low'
	title: string
	description: string
	discoveredAt: number
	status: 'open' | 'fixed' | 'acknowledged' | 'false-positive'
	cve?: string
}

// Address book types
export type AddressBook = {
	personal: Record<Address, string> // address -> label
	protocols: Record<Address, ProtocolInfo>
	exchanges: Record<Address, ExchangeInfo>
	bridges: Record<Address, BridgeInfo>
}

export type ProtocolInfo = {
	name: string
	category: string
	website?: string
	twitter?: string
	documentation?: string
	tvl?: number
	version?: string
}

export type ExchangeInfo = {
	name: string
	type: 'cex' | 'dex'
	website?: string
	volume24h?: number
}

export type BridgeInfo = {
	name: string
	sourceChain: ChainId
	targetChain: ChainId
	bridgeType: 'lock-mint' | 'burn-mint' | 'liquidity'
	website?: string
}

// Address interaction type
export type AddressInteraction = {
	from: Address
	to: Address
	transactionCount: number
	totalValue: string // Wei
	firstInteraction: number
	lastInteraction: number
	relationshipType?: 'frequent' | 'contract-creator' | 'token-holder' | 'governance-voter'
}

// Utility type for address validation
export type ValidatedAddress<T extends string> = T extends `0x${infer Rest}` 
	? Rest extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}`
		? Address
		: never
	: never 