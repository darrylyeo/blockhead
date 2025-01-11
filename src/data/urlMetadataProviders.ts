export enum UrlMetadataProvider {
	MetadataVision = 'MetadataVision',
	ModProtocol = 'Mod Protocol',
}


import { MetadataVisionIcon, ModProtocolIcon } from '$/assets/icons'

export const urlMetadataProviders = {
	[UrlMetadataProvider.MetadataVision]: {
		name: 'metadata.vision',
		icon: MetadataVisionIcon,
	},
	[UrlMetadataProvider.ModProtocol]: {
		name: 'Mod Protocol',
		icon: ModProtocolIcon,
	},
} as const satisfies Record<UrlMetadataProvider, {
	name: string
	icon?: string
}>
