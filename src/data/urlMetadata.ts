import type { Ethereum } from '$/data/networks/types'

export type UrlMetadata = {
	url: string
	image?: {
		url?: string
		width?: number
		height?: number
	}
	video?: {
		url?: string
		width?: number
		height?: number
	}
	audio?: {
		url?: string
	}
	"json-ld"?: Record<string, object[]>
	description?: string
	alt?: string
	title?: string
	publisher?: string
	date?: number
	datePublished?: number
	dateModified?: number
	language?: string
	feed?: string
	logo?: {
		url: string
	}
	nft?: {
		owner?: Ethereum.Address
		tokenId?: string
		mediaUrl?: string
		mintUrl?: string
		mimeType?: string
		collection: {
			id: string
			name: string
			chain: string
			contractAddress: string
			creatorAddress: string
			itemCount: number
			ownerCount: number
			mintUrl?: string
			description?: string
			imageUrl?: string
			openSeaUrl?: string
			creator?: Ethereum.Address
		}
	}
	customOpenGraph?: {
		'fc:frame'?: string
		'fc:frame:image'?: string
		'fc:frame:image:aspect_ratio'?: string
		'fc:frame:input:text'?: string
		'fc:frame:button:1'?: string
		'fc:frame:button:1:action'?: string
		'fc:frame:button:1:target'?: string
		'fc:frame:button:2'?: string
		'fc:frame:button:2:action'?: string
		'fc:frame:button:2:target'?: string
		'fc:frame:button:3'?: string
		'fc:frame:button:3:action'?: string
		'fc:frame:button:3:target'?: string
		'fc:frame:button:4'?: string
		'fc:frame:button:4:action'?: string
		'fc:frame:button:4:target'?: string
		'fc:frame:post_url'?: string
	}
}
