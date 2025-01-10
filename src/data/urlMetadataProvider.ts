export enum UrlMetadataProvider {
	MetadataVision = 'metadata.vision',
	ModProtocol = 'Mod Protocol',
}


import { MetadataVisionIcon, ModProtocolIcon } from '$/assets/icons'

export const urlMetadataProviderIcons: Record<UrlMetadataProvider, string> = {
	[UrlMetadataProvider.MetadataVision]: MetadataVisionIcon,
	[UrlMetadataProvider.ModProtocol]: ModProtocolIcon,
}
