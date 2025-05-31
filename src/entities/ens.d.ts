import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { ChainId } from './chain'
import type { Address, Hash, Timestamp } from './scalars'

export type ENSNodeId = Hash

export type ENSName = string
export type ENSNode = Hash
export type ContentHash = string

export enum ENSRecordType {
	Address = 'Address',
	ContentHash = 'ContentHash',
	Text = 'Text',
	ABI = 'ABI',
	PubKey = 'PubKey',
	Name = 'Name',
	Multicoin = 'Multicoin',
	DNS = 'DNS'
}

export enum ENSNameStatus {
	Active = 'Active',
	Expired = 'Expired',
	Grace = 'Grace', // Grace period after expiry
	Premium = 'Premium', // Premium pricing period
	Available = 'Available',
	Reserved = 'Reserved',
	Banned = 'Banned'
}

export type ENSTextRecord = {
	key: string
	value: string
	updatedAt?: Timestamp
}

export type ENSAddressRecord = {
	coinType: number // 60 for ETH, 0 for BTC, etc.
	coinName?: string
	address: string
	updatedAt?: Timestamp
}

export type ENSDomain = {
	// Domain identification
	name: ENSName
	normalizedName: ENSName
	node: ENSNode
	labelhash: Hash
	chainId: ChainId

	// Domain hierarchy
	tld: string // e.g., 'eth'
	sld?: string // Second level domain
	subdomain?: string
	parent?: ENSName

	// Registration
	registeredAt: Timestamp
	expiresAt?: Timestamp
	renewedAt?: Timestamp
	registrationDuration?: number // in seconds
	registrationPrice?: string

	// Status
	status: ENSNameStatus
	isAvailable: boolean
	isPrimary?: boolean // Primary name for an address

	// Resolver
	resolver?: Address
	resolverName?: string

	// Records
	records?: {
		addresses?: ENSAddressRecord[]
		text?: ENSTextRecord[]
		contentHash?: ContentHash
		avatar?: string
		email?: string
		url?: string
		twitter?: string
		github?: string
		discord?: string
		description?: string
		keywords?: string[]
		notice?: string
	}

	// Metadata
	tokenId?: string
	wrapped?: boolean // If wrapped as ERC1155 NFT
	fuses?: number // Permission fuses if wrapped

	// Subdomains
	subdomains?: ENSName[]
	subdomainCount?: number

	// History
	transferHistory?: {
		from: Address
		to: Address
		timestamp: Timestamp
		transactionHash: Hash
		price?: string
	}[]
} & {
	$owner?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>

	$registrant?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>

	$controller?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>
}

export type ENSReverseRecord = {
	// Reverse record identification
	address: Address
	name: ENSName
	node: ENSNode
	chainId: ChainId

	// Record data
	resolver: Address
	verifiedAt: Timestamp
	lastChecked: Timestamp

	// Validation
	isValid: boolean
	validationErrors?: string[]
} & {
	$addressActor?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>
}

export type ENSSubdomain = {
	// Subdomain identification
	name: ENSName
	parent: ENSName
	fullName: ENSName
	node: ENSNode

	// Creation details
	createdAt: Timestamp

	// Configuration
	resolver?: Address
	ttl?: number
	allowSubdomains?: boolean

	// Permissions
	permissions?: {
		canTransfer: boolean
		canSetResolver: boolean
		canSetTTL: boolean
		canCreateSubdomains: boolean
	}
} & {
	$owner?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>

	$creator?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>
}

export type ENSRegistration = {
	// Registration identification
	id: string
	name: ENSName
	label: string

	// Registration details
	registeredAt: Timestamp
	expiresAt: Timestamp

	// Cost
	cost: string
	fee?: string
	duration: number // seconds

	// Transaction
	transactionHash: Hash
	blockNumber: number

	// Events
	events?: {
		type: 'registered' | 'renewed' | 'transferred' | 'migrated'
		timestamp: Timestamp
		transactionHash: Hash
		data?: Record<string, any>
	}[]
} & {
	$registrant?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>

	$controller?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>
}

export type ENSResolver = {
	// Resolver identification
	address: Address
	chainId: ChainId
	version?: string

	// Capabilities
	supportsInterface: {
		addr: boolean
		contenthash: boolean
		text: boolean
		abi: boolean
		pubkey: boolean
		name: boolean
		multicoin: boolean
		dns: boolean
	}

	// Usage
	namesCount?: number
	lastActivity?: Timestamp

	// Metadata
	isOfficial?: boolean
	description?: string
}

export type ENSActivity = {
	// Activity identification
	id: string
	type: 'register' | 'renew' | 'transfer' | 'setResolver' | 'setRecord' | 'wrap' | 'unwrap'
	name: ENSName

	// Transaction
	transactionHash: Hash
	blockNumber: number
	timestamp: Timestamp
	gasUsed?: string

	// Activity specific data
	data?: {
		// For register/renew
		duration?: number
		cost?: string

		// For setRecord
		recordType?: ENSRecordType
		recordKey?: string
		recordValue?: string

		// For wrap/unwrap
		fuses?: number
		expiry?: Timestamp
	}
} & {
	$from?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>

	$to?: PartialExceptOneOf<Actor,
		| 'address'
		| 'format'
	>
} 