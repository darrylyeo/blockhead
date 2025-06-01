import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { TokenId, Nft, NftMetadata } from '$/entities/nft'
import { NftStandard, NftCategory, NftRarity } from '$/entities/nft'

export const fetch = async ({ chainId, contractAddress, tokenId }: { chainId: ChainId, contractAddress: Address, tokenId: string }) => {
	const { createClient } = await import('$/api/blockscout/graphql/index')
	const client = createClient(chainId)

	const query = `
		query GetNftInstance($contractAddress: AddressHash!, $tokenId: String!) {
			tokenInstance(contractAddressHash: $contractAddress, tokenId: $tokenId) {
				id
				tokenId
				metadata
				currentOwner
				token {
					contractAddressHash
					name
					symbol
					type
					totalSupply
					holderCount
					iconUrl
				}
				tokenTransfers(first: 10, orderBy: BLOCK_NUMBER, orderDirection: DESC) {
					edges {
						node {
							fromAddressHash
							toAddressHash
							transactionHash
							blockNumber
							timestamp
							amount
						}
					}
				}
			}
		}
	`

	const result = await client.query(query, { 
		contractAddress, 
		tokenId: tokenId.toString() 
	}).toPromise()
	
	if (result.error) {
		throw new Error(`Blockscout API error: ${result.error.message}`)
	}

	if (!result.data?.tokenInstance) {
		throw new Error(`NFT ${contractAddress}:${tokenId} not found on chain ${chainId}`)
	}

	return result.data.tokenInstance
}

export const normalize = (data: any, { chainId, contractAddress, tokenId }: { chainId: ChainId, contractAddress: Address, tokenId: string }) => {
	const token = data.token
	const metadata = data.metadata ? JSON.parse(data.metadata) : {}
	const transfers = data.tokenTransfers?.edges || []

	// Determine NFT standard
	let standard: NftStandard = NftStandard.Erc721
	if (token?.type?.toUpperCase().includes('ERC-1155')) {
		standard = NftStandard.Erc1155
	} else if (token?.type?.toUpperCase().includes('ERC-998')) {
		standard = NftStandard.Erc998
	}

	// Determine category based on metadata and token name
	let category: NftCategory = NftCategory.Collectible
	const name = metadata.name?.toLowerCase() || token?.name?.toLowerCase() || ''
	const description = metadata.description?.toLowerCase() || ''
	
	if (name.includes('art') || description.includes('art')) {
		category = NftCategory.Art
	} else if (name.includes('game') || description.includes('game')) {
		category = NftCategory.Gaming
	} else if (name.includes('music') || description.includes('audio')) {
		category = NftCategory.Music
	} else if (name.includes('photo') || description.includes('photo')) {
		category = NftCategory.Photography
	} else if (name.includes('domain') || name.includes('.eth')) {
		category = NftCategory.Domain
	}

	// Build metadata object
	const nftMetadata: NftMetadata = {
		name: metadata.name || `${token?.name || 'Unknown'} #${tokenId}`,
		description: metadata.description,
		image: metadata.image,
		imagePreview: metadata.image_preview || metadata.image_url,
		imageThumbnail: metadata.image_thumbnail,
		imageOriginal: metadata.image_original || metadata.image,
		animationUrl: metadata.animation_url,
		externalUrl: metadata.external_url,
		backgroundColor: metadata.background_color,
		attributes: metadata.attributes?.map((attr: any) => ({
			traitType: attr.trait_type || attr.key,
			value: attr.value,
			displayType: attr.display_type,
			maxValue: attr.max_value,
		})) || [],
		properties: metadata.properties,
		tokenUri: metadata.token_uri,
	}

	// Build ownership history from transfers
	const ownershipHistory = transfers.map((edge: any) => ({
		owner: edge.node.toAddressHash,
		from: edge.node.fromAddressHash,
		timestamp: edge.node.timestamp ? Math.floor(new Date(edge.node.timestamp).getTime() / 1000) : 0,
		transactionHash: edge.node.transactionHash,
	}))

	// Get current owner
	const currentOwner = data.currentOwner || 
		(ownershipHistory.length > 0 ? ownershipHistory[0].owner : undefined)

	// Mint information from earliest transfer
	const mintTransfer = ownershipHistory[ownershipHistory.length - 1]
	const mintedAt = mintTransfer?.timestamp
	const mintTransaction = mintTransfer?.transactionHash

	const baseNft = {
		standard,
		categories: [category],
		contractAddress,
		tokenId,
		chainId,
		ownershipHistory,
		metadata: nftMetadata,
		mintedAt,
		mintTransaction,
		createdAt: mintedAt || Math.floor(Date.now() / 1000),
		updatedAt: Math.floor(Date.now() / 1000),
		lastTransferAt: ownershipHistory.length > 0 ? ownershipHistory[0].timestamp : undefined,
		isVerified: true, // Blockscout data is generally verified
		verificationSource: 'manual' as const, // Use 'manual' which is in the allowed types
	}

	// Add standard-specific data with type assertion
	if (standard === NftStandard.Erc721) {
		return {
			...baseNft,
			tokenUri: metadata.token_uri,
		} as any // Type assertion to avoid deep instantiation issues
	} else if (standard === NftStandard.Erc1155) {
		return {
			...baseNft,
			balance: '1', // Default balance for blockscout
			uri: metadata.token_uri,
		} as any // Type assertion to avoid deep instantiation issues
	}

	return baseNft as any // Type assertion to avoid deep instantiation issues
}
