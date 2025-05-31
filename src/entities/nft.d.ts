import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { ChainId } from './network'
import type { Address, Hash, Timestamp } from './scalars'

export type TokenId = string | number

export enum NftStandard {
	Erc721 = 'Erc721',
	Erc1155 = 'Erc1155',
	Erc998 = 'Erc998', // Composable NFT
	Erc4907 = 'Erc4907', // Rentable NFT
	Erc5192 = 'Erc5192', // Soulbound NFT
	CryptoKitties = 'CryptoKitties',
	CryptoPunks = 'CryptoPunks',
	Ens = 'Ens',
	Other = 'Other'
}

export enum NftCategory {
	Art = 'Art',
	Collectible = 'Collectible',
	Gaming = 'Gaming',
	Utility = 'Utility',
	Domain = 'Domain',
	Music = 'Music',
	Video = 'Video',
	Photography = 'Photography',
	Sports = 'Sports',
	VirtualWorlds = 'VirtualWorlds',
	Membership = 'Membership',
	Identity = 'Identity',
	Other = 'Other'
}

export enum NftRarity {
	Common = 'Common',
	Uncommon = 'Uncommon',
	Rare = 'Rare',
	Epic = 'Epic',
	Legendary = 'Legendary',
	Mythic = 'Mythic',
	Unique = 'Unique'
}

export type NftAttribute = {
	traitType: string
	value: string | number | boolean
	displayType?: 'string' | 'number' | 'boost_number' | 'boost_percentage' | 'date'
	maxValue?: number
	rarity?: number // 0-1
}

export type NftMetadata = {
	name?: string
	description?: string
	image?: string
	imagePreview?: string
	imageThumbnail?: string
	imageOriginal?: string

	// Media
	animationUrl?: string
	animationOriginal?: string
	externalUrl?: string
	backgroundColor?: string

	// Properties
	attributes?: NftAttribute[]
	properties?: Record<string, any>

	// Standards
	tokenUri?: string
	metadataUri?: string
	contractUri?: string
}

export type Nft<
	_NftStandard extends NftStandard = NftStandard,
	_NftCategory extends NftCategory = NftCategory
> = (
	& {
		// NFT identification
		standard: _NftStandard
		categories: _NftCategory[]
		contractAddress: Address
		tokenId: TokenId
		chainId: ChainId

		// Ownership history
		ownershipHistory?: {
			owner: Address
			from: Address
			timestamp: Timestamp
			transactionHash: Hash
			price?: string
		}[]

		// Metadata
		metadata: NftMetadata

		// Rarity
		rarity?: NftRarity
		rarityScore?: number
		rarityRank?: number

		// Supply
		totalSupply?: number
		circulatingSupply?: number
		burned?: boolean

		// Minting
		mintedAt?: Timestamp
		mintTransaction?: Hash
		mintPrice?: string

		// Timestamps
		createdAt: Timestamp
		updatedAt: Timestamp
		lastTransferAt?: Timestamp

		// Verification
		isVerified?: boolean
		verificationSource?: 'opensea' | 'rarible' | 'foundation' | 'manual'
		isFlagged?: boolean
		flagReason?: string
	}

	& (
		_NftStandard extends NftStandard.Erc721 ?
			{
				// ERC721 specific
				tokenUri?: string
				approved?: Address
				approvedForAll?: Record<Address, boolean>
			}

		: _NftStandard extends NftStandard.Erc1155 ?
			{
				// ERC1155 specific
				balance: string
				uri?: string
				totalHolders?: number
			}

		: _NftStandard extends NftStandard.Erc998 ?
			{
				// Composable NFT specific
				childTokens?: {
					contractAddress: Address
					tokenId: TokenId
					standard: NftStandard
				}[]
				parentToken?: {
					contractAddress: Address
					tokenId: TokenId
				}
			}

		: _NftStandard extends NftStandard.Erc4907 ?
			{
				// Rentable NFT specific
				user?: Address
				expires?: Timestamp
				rentalPrice?: string
				rentalPeriod?: number
			}

		: _NftStandard extends NftStandard.Erc5192 ?
			{
				// Soulbound NFT specific
				soulbound: true
				issuer: Address
				issuedAt: Timestamp
				revocable?: boolean
			}

		: _NftStandard extends NftStandard.Ens ?
			{
				// ENS specific
				ensName: string
				normalizedName: string
				expiryDate?: Timestamp
				resolver?: Address
				records?: Record<string, string>
			}

		:
			{}
	)

	& {
		// Category specific properties
	} & (
		_NftCategory extends NftCategory.Gaming ?
			{
				gameData?: {
					gameId: string
					level?: number
					experience?: number
					stats?: Record<string, number>
					equipped?: boolean
				}
			}

		: _NftCategory extends NftCategory.Domain ?
			{
				domainData?: {
					tld: string
					subdomain?: string
					resolver?: Address
					records?: Record<string, string>
					expiryDate?: Timestamp
				}
			}

		: _NftCategory extends NftCategory.Music ?
			{
				musicData?: {
					artist: string
					album?: string
					duration?: number
					genre?: string
					royalties?: number
				}
			}

		: _NftCategory extends NftCategory.VirtualWorlds ?
			{
				virtualWorldData?: {
					world: string
					coordinates?: { x: number, y: number, z?: number }
					size?: { width: number, height: number, depth?: number }
					landType?: string
				}
			}

		:
			{}
	)

	& {
		// Entity references
		$collection?: PartialExceptOneOf<NftCollection,
			| 'contractAddress'
		>

		$creator?: PartialExceptOneOf<import('./actor').Actor,
			| 'address'
		>

		$owner?: PartialExceptOneOf<import('./actor').Actor,
			| 'address'
		>

		$minter?: PartialExceptOneOf<import('./actor').Actor,
			| 'address'
		>

		$mintTransaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
		>
	}
)

export type NftCollection = {
	// Collection identification
	contractAddress: Address
	chainId: ChainId
	name: string
	symbol?: string

	// Collection metadata
	description?: string
	image?: string
	banner?: string
	website?: string
	twitter?: string
	discord?: string

	// Supply
	totalSupply?: number
	maxSupply?: number
	circulatingSupply?: number
	holders?: number

	// Deployment
	deployedAt: Timestamp
	deployTransaction: Hash

	// Royalties
	royaltyRecipient?: Address
	royaltyPercentage?: number

	// Verification
	isVerified: boolean
	verificationDate?: Timestamp

	// Category
	category: NftCategory
	tags?: string[]

	// Entity references
	$creator?: PartialExceptOneOf<import('./actor').Actor,
		| 'address'
	>

	$contract?: PartialExceptOneOf<import('./contract').Contract,
		| 'address'
	>
}
