// Constants
import { IpfsGatewayProvider, ipfsGatewaysByProvider } from '$/data/ipfsGateways'


// External stores
import { preferences } from '$/state/preferences'


// Derived stores
import { derived } from 'svelte/store'
export const ipfsGateway = derived(preferences, $preferences => ipfsGatewaysByProvider[$preferences.ipfsGateway as IpfsGatewayProvider])
