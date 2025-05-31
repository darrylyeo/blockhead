import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor, ActorType } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './chain'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

// ABI and function types
export type ABIType = 'function' | 'constructor' | 'event' | 'error' | 'fallback' | 'receive'
export type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'
export type ABIParameterType = string // 'uint256', 'address', 'string', etc.

export type ABIParameter<
	T extends ABIParameterType = ABIParameterType,
	Components = any[]
> = {
	name: string
	type: T
	internalType?: string
	components?: Components // For tuples/structs
	indexed?: boolean // For events
}

export type ABIElement<
	Type extends ABIType = ABIType,
	P = {}
> = {
	type: Type
} & P

// Specific ABI element types
export type ABIFunction<
	SM extends StateMutability = StateMutability,
	Inputs extends ABIParameter[] = ABIParameter[],
	Outputs extends ABIParameter[] = ABIParameter[]
> = ABIElement<'function', {
	name: string
	stateMutability: SM
	inputs: Inputs
	outputs: Outputs

	// Function metadata
	selector: string // 4-byte function selector
	signature: string // Human readable signature
	gasEstimate?: string

	// Documentation
	notice?: string
	dev?: string
	params?: Record<string, string>
	returns?: Record<string, string>
}>

export type ABIEvent<
	Inputs extends ABIParameter[] = ABIParameter[]
> = ABIElement<'event', {
	name: string
	inputs: Inputs
	anonymous?: boolean

	// Event metadata
	signature: Hash // Event signature hash
	topic0: Hash // Same as signature

	// Documentation
	notice?: string
	dev?: string
	params?: Record<string, string>
}>

export type ABIError<
	Inputs extends ABIParameter[] = ABIParameter[]
> = ABIElement<'error', {
	name: string
	inputs: Inputs

	// Error metadata
	selector: string // 4-byte error selector
	signature: string
}>

export type ABIConstructor<
	SM extends 'payable' | 'nonpayable' = 'payable' | 'nonpayable',
	Inputs extends ABIParameter[] = ABIParameter[]
> = ABIElement<'constructor', {
	stateMutability?: SM
	inputs: Inputs
}>

export type ABIFallback<
	Type extends 'fallback' | 'receive' = 'fallback' | 'receive',
	SM extends 'payable' | 'nonpayable' = 'payable' | 'nonpayable'
> = ABIElement<Type, {
	stateMutability: SM
}>

// Union type for all ABI elements
export type AnyABIElement = ABIFunction | ABIEvent | ABIError | ABIConstructor | ABIFallback

export type ContractABI<
	Elements extends AnyABIElement[] = AnyABIElement[]
> = {
	abi: Elements

	// Function lookups
	functions: Record<string, ABIFunction> // name -> function
	events: Record<string, ABIEvent> // name -> event
	errors: Record<string, ABIError> // name -> error

	// Selectors
	functionSelectors: Record<string, ABIFunction> // selector -> function
	eventTopics: Record<Hash, ABIEvent> // topic0 -> event
	errorSelectors: Record<string, ABIError> // selector -> error
}

// Contract source with generic compiler settings
export type ContractSource<
	Language extends 'Solidity' | 'Vyper' | 'Yul' = 'Solidity' | 'Vyper' | 'Yul',
	Settings extends Record<string, any> = Record<string, any>,
	VerificationMethod extends string = 'standard' | 'single-file' | 'multi-part',
	VerifiedBy extends string = 'etherscan' | 'sourcify' | 'blockscout'
> = {
	sources: Record<string, string> // filename -> source code
	compiler: {
		version: string
		language: Language
		settings: Settings
	}

	verificationMethod: VerificationMethod
	verifiedAt: number
	verifiedBy: VerifiedBy

	license?: string
	libraries?: Record<string, Address>
}

// Contract deployment with generic creation type
export type ContractDeployment<
	CreationType extends 'create' | 'create2' = 'create' | 'create2'
> = {
	deployTransaction: Hash
	deployBlock: number
	deployTimestamp: number
	deployer: Address

	constructorArgs?: string
	gasUsed: string
	gasPrice: string
	deploymentCost: string

	creationType: CreationType
	salt?: Hash
	factory?: Address

	isProxy: boolean
	implementation?: Address
	admin?: Address
}

// Contract pattern with generic pattern type
export type ContractPattern<
	Pattern extends string = string,
	Evidence extends string[] = string[]
> = {
	pattern: Pattern
	confidence: number // 0-100
	evidence: Evidence
}

// Contract vulnerability with generic severity and status
export type ContractVulnerability<
	Severity extends string = 'critical' | 'high' | 'medium' | 'low',
	Status extends string = 'open' | 'fixed' | 'acknowledged'
> = {
	id: string
	severity: Severity
	title: string
	description: string
	status: Status
	discoveredAt: number
}

// Contract audit with generic risk levels
export type ContractAudit<
	Risk extends string = 'low' | 'medium' | 'high' | 'critical',
	Findings extends Record<string, number> = Record<string, number>
> = {
	auditor: string
	auditDate: number
	reportUrl?: string
	findings: Findings
	overallRisk: Risk
}

// Utility types for contract validation
export type ValidContractAddress<T extends string> = T extends Address ? T : never

// Contract metadata type
export type ContractMetadata<
	Extensions extends Record<string, any> = Record<string, any>
> = {
	address: Address
	chainId: ChainId
	name?: string
	isVerified: boolean
	deployBlock: number
	deployer: Address
	bytecodeSize: number
	extensions?: Extensions
}

export enum ContractStandard {
	Erc20 = 'Erc20',
	Erc721 = 'Erc721',
	Erc1155 = 'Erc1155',
	Erc4626 = 'Erc4626',
	Erc1967 = 'Erc1967', // Proxy Standard
	Erc2535 = 'Erc2535', // Diamond Standard
	Erc4337 = 'Erc4337', // Account Abstraction
	Erc6551 = 'Erc6551', // Token Bound Accounts
	Custom = 'Custom'
}

export enum ContractCategory {
	Token = 'Token',
	Nft = 'Nft',
	Defi = 'Defi',
	Gaming = 'Gaming',
	Governance = 'Governance',
	Infrastructure = 'Infrastructure',
	Bridge = 'Bridge',
	Oracle = 'Oracle',
	Identity = 'Identity',
	Storage = 'Storage',
	Proxy = 'Proxy',
	Factory = 'Factory',
	Multisig = 'Multisig',
	Account = 'Account',
	Utility = 'Utility'
}

export type ContractInterface = {
	name: string
	type: 'function' | 'event' | 'constructor' | 'fallback' | 'receive'
	signature: string
	selector?: Hash
	inputs?: {
		name: string
		type: string
		indexed?: boolean
	}[]
	outputs?: {
		name: string
		type: string
	}[]
	stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable'
}

export type Contract<
	_ContractStandard extends ContractStandard = ContractStandard,
	_ContractCategory extends ContractCategory = ContractCategory
> = (
	& {
		// Contract identification
		address: Address
		chainId: ChainId
		standards: _ContractStandard[]
		categories: _ContractCategory[]

		// Contract metadata
		name?: string
		version?: string
		bytecode: Hash
		sourceCode?: string
		compilerVersion?: string
		optimizationEnabled?: boolean

		// Deployment information
		deploymentTransaction: Hash
		deploymentBlock: BlockNumber
		deploymentTimestamp: Timestamp

		// Contract interface
		abi?: ContractInterface[]
		functions: ContractInterface[]
		events: ContractInterface[]

		// Verification status
		verification: {
			isVerified: boolean
			verificationService?: string
			verifiedAt?: Timestamp
			sourcifyMatch?: 'perfect' | 'partial' | 'none'
			securityScore?: number

			auditReports?: {
				auditor: string
				date: Timestamp
				reportUrl: string
				score?: number
				findings: {
					severity: 'critical' | 'high' | 'medium' | 'low' | 'informational'
					title: string
					description: string
				}[]
			}[]
		}

		// Usage statistics
		statistics: {
			transactionCount: number
			internalTransactionCount: number
			uniqueCallers: number

			// Activity metrics
			dailyActiveUsers: number
			weeklyActiveUsers: number
			monthlyActiveUsers: number

			// Function usage
			functionCalls: Record<string, {
				count: number
				percentage: Percentage
				averageGasUsed: number
			}>

			// Economic metrics
			totalValueReceived: TokenAmount
			totalValueSent: TokenAmount
			totalFeesGenerated: TokenAmount
			averageTransactionValue: TokenAmount
		}

		// Risk assessment
		risk: {
			riskLevel: 'low' | 'medium' | 'high' | 'critical'
			riskFactors: string[]

			// Security analysis
			hasRenounceOwnership: boolean
			hasMultiSig: boolean
			hasTimelock: boolean
			hasEmergencyPause: boolean
			hasUpgradeability: boolean
			hasExternalDependencies: boolean

			// Compliance flags
			blacklistedFunctions: string[]
			suspiciousPatterns: string[]
			complianceIssues: string[]
		}
	}
)
// Conditional fields for each standard
& (
	_ContractStandard extends ContractStandard.Erc20 ? {
		// ERC20 specific data
		tokenData: {
			name: string
			symbol: string
			decimals: number
			totalSupply: TokenAmount

			// Token mechanics
			isMintable: boolean
			isBurnable: boolean
			hasTransferTax: boolean
			hasReflection: boolean
			hasAntiWhale: boolean

			// Distribution
			holderCount: number
			topHolderPercentage: Percentage
			liquidityLocked: boolean
		}
	} : {}
)
& (
	_ContractStandard extends ContractStandard.Erc721 ? {
		// ERC721 specific data
		nftData: {
			name: string
			symbol: string
			totalSupply: TokenAmount
			baseURI?: string

			// Collection info
			maxSupply?: number
			mintPrice?: TokenAmount
			royaltyPercentage?: Percentage

			// Minting mechanics
			isMintable: boolean
			publicMint: boolean
			whitelistMint: boolean

			// Market data
			floorPrice?: TokenAmount
			totalVolume?: TokenAmount
			uniqueOwners: number
		}
	} : {}
)
& (
	_ContractStandard extends ContractStandard.Erc1155 ? {
		// ERC1155 specific data
		multiTokenData: {
			name?: string
			uri: string
			tokenCount: number

			// Token tracking
			tokenTypes: {
				fungible: number
				nonFungible: number
				semiFungible: number
			}

			// Batch operations
			supportsBatchTransfer: boolean
			supportsBatchMint: boolean
		}
	} : {}
)
& (
	_ContractStandard extends ContractStandard.Erc1967 ? {
		// Proxy specific data
		proxyData: {
			proxyType: 'transparent' | 'uups' | 'beacon' | 'diamond' | 'minimal'
			implementation?: Address
			admin?: Address
			beacon?: Address
			slots?: Record<string, Hash>

			// Upgrade mechanics
			isUpgradable: boolean
			upgradeHistory?: {
				timestamp: Timestamp
				oldImplementation: Address
				newImplementation: Address
			}[]
		}
	} : {}
)
& (
	_ContractStandard extends ContractStandard.Custom ? {
		// Custom contract data
		customData: {
			contractType: string
			protocolName?: string
			protocolVersion?: string
			features: string[]

			// Custom properties
			properties: Record<string, any>
		}
	} : {}
)
// Conditional fields for each category
& (
	_ContractCategory extends ContractCategory.Defi ? {
		// DeFi protocol specific features
		defiFeatures?: {
			protocolType: 'dex' | 'lending' | 'yield' | 'derivatives' | 'insurance'
			tvl?: TokenAmount
			apr?: Percentage
			fees?: {
				tradingFee?: BasisPoints
				protocolFee?: BasisPoints
				performanceFee?: BasisPoints
			}
		}
	} : {}
)
& (
	_ContractCategory extends ContractCategory.Governance ? {
		// Governance features
		governance?: {
			hasOwner: boolean
			isMultiOwner: boolean
			hasPermissions: boolean
			isPausable: boolean
			isUpgradable: boolean

			roles?: {
				role: string
				members: Address[]
				permissions: string[]
			}[]

			timelock?: {
				delay: number
				proposalThreshold: TokenAmount
				executionThreshold: number
			}
		}
	} : {}
)
& {
	$contractActor?: PartialExceptOneOf<Actor<ActorType.Contract>,
		| 'address'
	>

	$deployer?: PartialExceptOneOf<Actor,
		| 'address'
	>

	$owner?: PartialExceptOneOf<Actor,
		| 'address'
	>

	$admin?: PartialExceptOneOf<Actor,
		| 'address'
	>

	$implementation?: PartialExceptOneOf<Contract,
		| 'address'
	>

	$beacon?: PartialExceptOneOf<Contract,
		| 'address'
	>

	$factory?: PartialExceptOneOf<Actor<ActorType.Contract>,
		| 'address'
	>

	$createdContracts?: PartialExceptOneOf<Contract,
		| 'address'
	>[]

	$relatedContracts?: PartialExceptOneOf<Contract,
		| 'address'
	>[]

	$dependsOn?: PartialExceptOneOf<Contract,
		| 'address'
	>[]

	$dependents?: PartialExceptOneOf<Contract,
		| 'address'
	>[]

	$frequentCallers?: PartialExceptOneOf<Actor,
		| 'address'
	>[]

	$recentTransactions?: PartialExceptOneOf<import('./transaction').Transaction,
		| 'id'
	>[]

	$events?: PartialExceptOneOf<import('./event').Event,
		| 'id'
	>[]
} 