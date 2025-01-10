// Types
import type { getMetadataForUrls } from '.'
import type { UrlMetadata } from '$/data/urlMetadata'


// Functions
export const normalizeUrlMetadata = (
	data: Awaited<ReturnType<typeof getMetadataForUrls>>[keyof Awaited<ReturnType<typeof getMetadataForUrls>>],
): UrlMetadata => ({
	image: data.image,
	'json-ld': data['json-ld'],
	description: data.description,
	alt: data.alt,
	title: data.title,
	publisher: data.publisher,
	logo: data.logo,
	nft: data.nft,
	customOpenGraph: data.customOpenGraph
})
