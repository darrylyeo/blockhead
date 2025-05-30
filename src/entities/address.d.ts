import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { ChainId } from './chain.js'
import type { Timestamp } from './types.js'

// Base address types
export type Address = `0x${string}`
export type Hash = `0x${string}`

export enum ActorType {
	EOA = 'EOA', // Externally Owned Account
	Contract = 'Contract', // Smart Contract
	System = 'System', // System/Protocol Account
	Multisig = 'Multisig', // Multisignature Wallet
	Proxy = 'Proxy', // Proxy Contract
	Factory = 'Factory', // Factory Contract
	Token = 'Token', // Token Contract
	Exchange = 'Exchange', // Exchange Contract
	Bridge = 'Bridge', // Bridge Contract
	Oracle = 'Oracle' // Oracle Contract
}

export enum ContractSubtype {
	System = 'System',
	Multisig = 'Multisig',
	Proxy = 'Proxy',
	Factory = 'Factory',
	Token = 'Token',
	Exchange = 'Exchange',
	Bridge = 'Bridge',
	Oracle = 'Oracle'
}

// Generic address type with type parameter and extension
export type AddressEntity<
	T extends AddressType = AddressType,
	P = {}
> = {
	address: Address
	chainId: ChainId
	type: T
	label?: string
	
	// Balance information
	balance: string // Wei
	balanceUsd?: number
	
	// Transaction stats
	nonce?: number
	transactionCount: number
	internalTransactionCount?: number
	
	// Timestamps
	firstSeenAt?: number
	lastActiveAt?: number
} & P

// EOA Address with specific properties
export type EOAAddress = AddressEntity<'eoa', {
	// ENS information
	ensName?: string
	ensAvatar?: string
	ensReverse?: string
	
	// Social/Identity
	tags?: string[]
	isVerified?: boolean
	
	// Activity patterns
	averageGasPrice?: string
	preferredGasLimit?: string
}>

// Contract Address with specific properties
export type ContractAddress = AddressEntity<'contract' | 'proxy' | 'factory', {
	// Contract metadata
	name?: string
	symbol?: string
	contractType?: ContractType
	
	// Deployment info
	deployTransaction?: Hash
	deployBlock?: number
	deployTimestamp?: number
	deployer?: Address
	deploymentGasUsed?: string
	
	// Verification
	isVerified: boolean
	verificationDate?: number
	verificationMethod?: 'etherscan' | 'sourcify' | 'manual'
	
	// Code information
	bytecodeSize: number
	hasSource: boolean
	
	// Proxy information (if applicable)
	implementation?: Address
	proxyType?: ProxyType
	admin?: Address
	
	// Factory information (if applicable)
	createdContracts?: Address[]
	
	// Security
	securityAudits?: SecurityAudit[]
	knownVulnerabilities?: Vulnerability[]
}>

// Multisig Address with specific properties
export type MultisigAddress = AddressEntity<'multisig', {
	// Multisig configuration
	threshold: number
	ownerCount: number
	owners: Address[]
	
	// Multisig metadata
	multisigType: 'gnosis-safe' | 'multi-sig-wallet' | 'custom'
	version?: string
	
	// Transaction info
	pendingTransactions?: number
	executedTransactions?: number
}>

// Account Abstraction Address with specific properties
export type AccountAbstractionAddress = AddressEntity<'account-abstraction', {
	// AA specific
	factory: Address
	implementation: Address
	entryPoint: Address
	
	// AA metadata
	aaType: 'erc-4337' | 'erc-6551' | 'custom'
	owner?: Address
	guardian?: Address
}>

// Union type for all address variants
export type AnyAddress = 
	| EOAAddress 
	| ContractAddress 
	| MultisigAddress 
	| AccountAbstractionAddress

// Contract types
export type ContractType = 
	| 'token-erc20'
	| 'token-erc721'
	| 'token-erc1155'
	| 'dex'
	| 'lending'
	| 'governance'
	| 'bridge'
	| 'oracle'
	| 'staking'
	| 'vault'
	| 'factory'
	| 'router'
	| 'proxy'
	| 'multisig'
	| 'dao'
	| 'marketplace'
	| 'launchpad'
	| 'other'

// Proxy types
export type ProxyType = 
	| 'eip-1967' // Transparent proxy
	| 'eip-1822' // Universal upgradeable proxy
	| 'eip-897'  // Delegate proxy
	| 'beacon'
	| 'diamond'
	| 'minimal'
	| 'clone'

// Security types with generic severity
export type SecurityAudit<S extends string = 'critical' | 'high' | 'medium' | 'low' | 'informational'> = {
	auditor: string
	auditDate: number
	reportUrl?: string
	score?: number
	findings: Record<S, number>
}

export type Vulnerability<
	Severity extends string = 'critical' | 'high' | 'medium' | 'low',
	Status extends string = 'open' | 'fixed' | 'acknowledged' | 'false-positive'
> = {
	id: string
	severity: Severity
	title: string
	description: string
	discoveredAt: number
	status: Status
	cve?: string
}

// Address collections with generic address types
export type AddressBook<A extends Address = Address> = {
	personal: Record<A, string> // address -> label
	protocols: Record<A, ProtocolInfo>
	exchanges: Record<A, ExchangeInfo>
	bridges: Record<A, BridgeInfo>
}

export type ProtocolInfo<T extends number = number> = {
	name: string
	category: string
	website?: string
	twitter?: string
	documentation?: string
	tvl?: T
	version?: string
}

export type ExchangeInfo<T extends 'cex' | 'dex' = 'cex' | 'dex', V extends number = number> = {
	name: string
	type: T
	website?: string
	volume24h?: V
}

export type BridgeInfo<
	BridgeType extends string = 'lock-mint' | 'burn-mint' | 'liquidity'
> = {
	name: string
	sourceChain: ChainId
	targetChain: ChainId
	bridgeType: BridgeType
	website?: string
}

// Address interactions with generic relationship types
export type AddressInteraction<
	RelType extends string = 'frequent' | 'contract-creator' | 'token-holder' | 'governance-voter'
> = {
	from: Address
	to: Address
	transactionCount: number
	totalValue: string // Wei
	firstInteraction: number
	lastInteraction: number
	relationshipType?: RelType
}

// Utility types for address validation and manipulation
export type ValidatedAddress<T extends string> = T extends `0x${infer Rest}` 
	? Rest extends `${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}${string}`
		? Address
		: never
	: never

export type Actor<
	_T extends ActorType = ActorType,
	_S extends ContractSubtype = ContractSubtype
> = (
	& {
		// Actor identification
		type: _T
		address: Address
		chainId: ChainId
		
		// Common metadata
		labels?: Array<{
			name: string
			source: string
			verified: boolean
		}>
		
		// Activity tracking
		firstSeenAt?: Timestamp
		lastActiveAt?: Timestamp
		transactionCount?: number
		
		// Security and verification
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		securityScore?: number
		auditReports?: Array<{
			auditor: string
			date: Timestamp
			reportUrl: string
			score?: number
		}>
	}

	& (
		_T extends ActorType.EOA ?
			{
				// EOA specific properties
				nonce?: number
				ensName?: string
				ensAvatar?: string
				
				// Wallet metadata
				isVerified?: boolean
				tags?: string[]
				
				// Transaction patterns
				averageGasPrice?: string
				preferredGasLimit?: string
			}

		: _T extends ActorType.Contract ?
			(
				_S extends ContractSubtype.System ?
					{
						// System contract properties
						systemRole: 'governance' | 'treasury' | 'registry' | 'factory'
						protocolName?: string
						version?: string
					}

				: _S extends ContractSubtype.Multisig ?
					{
						// Multisig contract properties
						signers: Address[]
						threshold: number
						nonce?: number
						multisigType: 'gnosis-safe' | 'multi-sig-wallet' | 'custom'
					}

				: _S extends ContractSubtype.Proxy ?
					{
						// Proxy contract properties
						implementation: Address
						admin?: Address
						proxyType: 'transparent' | 'uups' | 'beacon' | 'diamond'
						upgradeHistory?: Array<{
							timestamp: Timestamp
							oldImplementation: Address
							newImplementation: Address
						}>
					}

				: _S extends ContractSubtype.Factory ?
					{
						// Factory contract properties
						deploymentPattern: 'create' | 'create2' | 'clone'
						deploymentsCount?: number
						templateContract?: Address
						deploySalt?: Hash
					}

				: _S extends ContractSubtype.Token ?
					{
						// Token contract properties
						tokenStandard: 'ERC20' | 'ERC721' | 'ERC1155' | 'ERC4626'
						symbol?: string
						name?: string
						decimals?: number
						totalSupply?: string
						isVerified?: boolean
					}

				: _S extends ContractSubtype.Exchange ?
					{
						// Exchange contract properties
						exchangeType: 'dex' | 'orderbook' | 'amm' | 'aggregator'
						version?: string
						feeStructure?: {
							tradingFee: number
							protocolFee: number
						}
					}

				: _S extends ContractSubtype.Bridge ?
					{
						// Bridge contract properties
						bridgeType: 'lock-mint' | 'burn-mint' | 'liquidity'
						sourceChains: ChainId[]
						targetChains: ChainId[]
						bridgeVersion?: string
						securityModel?: string
					}

				: _S extends ContractSubtype.Oracle ?
					{
						// Oracle contract properties
						oracleType: 'price' | 'random' | 'data' | 'computation'
						dataFeeds?: string[]
						updateFrequency?: number
						aggregationMethod?: string
					}

				:
					{
						// Generic contract properties
						bytecode?: Hash
						creator?: Address
						creationTransaction?: Hash
						creationBlock?: number
						isVerified?: boolean
					}
			)

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		relatedContracts?: PartialExceptOneOf<Actor<ActorType.Contract>,
			| 'address'
		>[]

		createdContracts?: PartialExceptOneOf<Actor<ActorType.Contract>,
			| 'address'
		>[]

		controlledBy?: PartialExceptOneOf<Actor,
			| 'address'
		>

		controls?: PartialExceptOneOf<Actor,
			| 'address'
		>[]
	}
)

// Convenience type aliases
export type EOAActor = Actor<ActorType.EOA>
export type ContractActor = Actor<ActorType.Contract>
export type SystemActor = Actor<ActorType.Contract, ContractSubtype.System>
export type MultisigActor = Actor<ActorType.Contract, ContractSubtype.Multisig>
export type ProxyActor = Actor<ActorType.Contract, ContractSubtype.Proxy>
export type FactoryActor = Actor<ActorType.Contract, ContractSubtype.Factory>
export type TokenActor = Actor<ActorType.Contract, ContractSubtype.Token>
export type ExchangeActor = Actor<ActorType.Contract, ContractSubtype.Exchange>
export type BridgeActor = Actor<ActorType.Contract, ContractSubtype.Bridge>
export type OracleActor = Actor<ActorType.Contract, ContractSubtype.Oracle>

export type AnyActor = Actor<ActorType, ContractSubtype>

// Legacy types for compatibility
export type AddressType = 'eoa' | 'contract' | 'multisig' | 'proxy' | 'factory'

// Address collections with generic address types
export type AddressBook<A extends Address = Address> = {
	personal: Record<A, string> // address -> label
	protocols: Record<A, ProtocolInfo>
	exchanges: Record<A, ExchangeInfo>
	bridges: Record<A, BridgeInfo>
}

export type ProtocolInfo<T extends number = number> = {
	name: string
	category: string
	website?: string
	twitter?: string
	documentation?: string
	tvl?: T
	version?: string
}

export type ExchangeInfo<T extends 'cex' | 'dex' = 'cex' | 'dex', V extends number = number> = {
	name: string
	type: T
	website?: string
	volume24h?: V
}

export type BridgeInfo<
	BridgeType extends string = 'lock-mint' | 'burn-mint' | 'liquidity'
> = {
	name: string
	sourceChain: ChainId
	targetChain: ChainId
	bridgeType: BridgeType
	website?: string
}

// Address interactions with generic relationship types
export type AddressInteraction<
	RelType extends string = 'frequent' | 'contract-creator' | 'token-holder' | 'governance-voter'
> = {
	from: Address
	to: Address
	transactionCount: number
	totalValue: string // Wei
	firstInteraction: number
	lastInteraction: number
	relationshipType?: RelType
} 