export enum UrlMetadataProvider {
	ModProtocol = 'Mod Protocol',
}


import { ModProtocolIcon } from '../assets/icons'

export const urlMetadataProviderIcons: Record<UrlMetadataProvider, string> = {
	[UrlMetadataProvider.ModProtocol]: ModProtocolIcon,
}
