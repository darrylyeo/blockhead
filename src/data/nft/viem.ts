import type { Address } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { TokenId, Nft, NftMetadata } from '$/entities/nft'
import { NftStandard, NftCategory } from '$/entities/nft'

// ERC721 ABI
const erc721Abi = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'tokenId', type: 'uint256' }],
		name: 'tokenURI',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'tokenId', type: 'uint256' }],
		name: 'ownerOf',
		outputs: [{ name: '', type: 'address' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
] as const

// ERC1155 ABI
const erc1155Abi = [
	{
		constant: true,
		inputs: [{ name: 'tokenId', type: 'uint256' }],
		name: 'uri',
		outputs: [{ name: '', type: 'string' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{ name: 'account', type: 'address' },
			{ name: 'id', type: 'uint256' }
		],
		name: 'balanceOf',
		outputs: [{ name: '', type: 'uint256' }],
		type: 'function',
	},
	{
		constant: true,
		inputs: [{ name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ name: '', type: 'bool' }],
		type: 'function',
	},
] as const

// Interface IDs
const ERC721_INTERFACE_ID = '0x80ac58cd'
const ERC1155_INTERFACE_ID = '0xd9b67a26'

// Fetch metadata from URI
const fetchMetadata = async (uri: string): Promise<any> => {
	try {
		// Handle IPFS URIs
		if (uri.startsWith('ipfs://')) {
			uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
		}
		
		// Simple HTTP fetch with timeout
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 5000)
		
		const httpResponse = await globalThis.fetch(uri, { signal: controller.signal })
		clearTimeout(timeoutId)
		
		if (!httpResponse.ok) return {}
		
		const metadata = await httpResponse.json()
		return metadata || {}
	} catch {
		return {}
	}
}

export const fetch = async (chainId: ChainId, contractAddress: Address, tokenId: TokenId) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		const tokenIdBigInt = BigInt(tokenId)
		
		// First check if contract supports ERC721 or ERC1155
		const [supportsERC721, supportsERC1155] = await Promise.allSettled([
			client.readContract({
				address: contractAddress as `0x${string}`,
				abi: erc721Abi,
				functionName: 'supportsInterface',
				args: [ERC721_INTERFACE_ID],
			}) as Promise<boolean>,
			client.readContract({
				address: contractAddress as `0x${string}`,
				abi: erc1155Abi,
				functionName: 'supportsInterface',
				args: [ERC1155_INTERFACE_ID],
			}) as Promise<boolean>,
		])
		
		const isERC721 = supportsERC721.status === 'fulfilled' && supportsERC721.value
		const isERC1155 = supportsERC1155.status === 'fulfilled' && supportsERC1155.value
		
		if (!isERC721 && !isERC1155) {
			throw new Error(`Contract ${contractAddress} does not implement ERC721 or ERC1155`)
		}
		
		if (isERC721) {
			// Fetch ERC721 data
			const [name, symbol, tokenURI, owner] = await Promise.allSettled([
				client.readContract({
					address: contractAddress as `0x${string}`,
					abi: erc721Abi,
					functionName: 'name',
				}) as Promise<string>,
				client.readContract({
					address: contractAddress as `0x${string}`,
					abi: erc721Abi,
					functionName: 'symbol',
				}) as Promise<string>,
				client.readContract({
					address: contractAddress as `0x${string}`,
					abi: erc721Abi,
					functionName: 'tokenURI',
					args: [tokenIdBigInt],
				}) as Promise<string>,
				client.readContract({
					address: contractAddress as `0x${string}`,
					abi: erc721Abi,
					functionName: 'ownerOf',
					args: [tokenIdBigInt],
				}) as Promise<string>,
			])
			
			const tokenUriValue = tokenURI.status === 'fulfilled' ? tokenURI.value : ''
			
			// Fetch metadata if URI is available
			let metadata = {}
			if (tokenUriValue) {
				metadata = await fetchMetadata(tokenUriValue)
			}
			
			return {
				standard: 'ERC721',
				name: name.status === 'fulfilled' ? name.value : 'Unknown',
				symbol: symbol.status === 'fulfilled' ? symbol.value : 'UNKNOWN',
				tokenURI: tokenUriValue,
				owner: owner.status === 'fulfilled' ? owner.value : undefined,
				metadata,
				chainId,
				fetchedAt: Math.floor(Date.now() / 1000),
			}
		} else {
			// Fetch ERC1155 data - need an account to check balance
			const [uri] = await Promise.allSettled([
				client.readContract({
					address: contractAddress as `0x${string}`,
					abi: erc1155Abi,
					functionName: 'uri',
					args: [tokenIdBigInt],
				}) as Promise<string>,
			])
			
			const uriValue = uri.status === 'fulfilled' ? uri.value : ''
			
			// Fetch metadata if URI is available
			let metadata = {}
			if (uriValue) {
				// Replace {id} placeholder in ERC1155 URI
				const processedUri = uriValue.replace('{id}', tokenId.toString().padStart(64, '0'))
				metadata = await fetchMetadata(processedUri)
			}
			
			return {
				standard: 'ERC1155',
				uri: uriValue,
				metadata,
				chainId,
				fetchedAt: Math.floor(Date.now() / 1000),
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('Chain not supported')) {
				throw new Error(`Chain ${chainId} not supported by viem`)
			}
			if (error.message.includes('execution reverted')) {
				throw new Error(`Contract calls reverted. Token ${contractAddress}:${tokenId} may not exist`)
			}
		}
		throw new Error(`Viem NFT error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, chainId: ChainId, contractAddress: Address, tokenId: TokenId) => {
	const metadata = data.metadata || {}
	
	// Determine standard
	const standard = data.standard === 'ERC1155' ? NftStandard.Erc1155 : NftStandard.Erc721
	
	// Determine category based on metadata
	let category: NftCategory = NftCategory.Collectible
	const name = metadata.name?.toLowerCase() || ''
	const description = metadata.description?.toLowerCase() || ''
	
	if (name.includes('art') || description.includes('art')) {
		category = NftCategory.Art
	} else if (name.includes('game') || description.includes('game')) {
		category = NftCategory.Gaming
	} else if (name.includes('music') || description.includes('audio')) {
		category = NftCategory.Music
	} else if (name.includes('domain') || name.includes('.eth')) {
		category = NftCategory.Domain
	}
	
	// Build metadata object with only available fields
	const nftMetadata: any = {}
	
	if (metadata.name) nftMetadata.name = metadata.name
	else if (data.name) nftMetadata.name = `${data.name} #${tokenId}`
	
	if (metadata.description) nftMetadata.description = metadata.description
	if (metadata.image) nftMetadata.image = metadata.image
	if (metadata.image_preview || metadata.image_url) nftMetadata.imagePreview = metadata.image_preview || metadata.image_url
	if (metadata.image_thumbnail) nftMetadata.imageThumbnail = metadata.image_thumbnail
	if (metadata.image_original) nftMetadata.imageOriginal = metadata.image_original
	if (metadata.animation_url) nftMetadata.animationUrl = metadata.animation_url
	if (metadata.external_url) nftMetadata.externalUrl = metadata.external_url
	if (metadata.background_color) nftMetadata.backgroundColor = metadata.background_color
	if (data.tokenURI || data.uri) nftMetadata.tokenUri = data.tokenURI || data.uri
	
	// Add attributes if they exist
	if (metadata.attributes && Array.isArray(metadata.attributes)) {
		nftMetadata.attributes = metadata.attributes.map((attr: any) => ({
			...(attr.trait_type && { traitType: attr.trait_type }),
			...(attr.key && !attr.trait_type && { traitType: attr.key }),
			...(attr.value !== undefined && { value: attr.value }),
			...(attr.display_type && { displayType: attr.display_type }),
			...(attr.max_value && { maxValue: attr.max_value }),
		}))
	}
	
	if (metadata.properties) nftMetadata.properties = metadata.properties
	
	const baseNft: any = {
		standard,
		categories: [category],
		contractAddress,
		tokenId,
		chainId,
		metadata: nftMetadata,
		createdAt: data.fetchedAt,
		updatedAt: data.fetchedAt,
		isVerified: false, // Can't verify from viem alone
		source: 'viem',
	}
	
	// Add standard-specific data
	if (standard === NftStandard.Erc721 && data.tokenURI) {
		baseNft.tokenUri = data.tokenURI
	} else if (standard === NftStandard.Erc1155) {
		if (data.uri) baseNft.uri = data.uri
		// Note: balance would require an owner address, which we don't have in this context
	}
	
	return baseNft as any
}
