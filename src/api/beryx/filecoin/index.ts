// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const baseUrls = {
	314: `https://api.zondax.ch/fil/data/v3/mainnet`,
	314159: `https://api.zondax.ch/fil/data/v3/calibration`,
} as const satisfies Record<Ethereum.ChainId, string>


// Context
import * as publicEnv from '$env/static/public'


// openapi-typescript
import { defaults } from './api'

defaults.headers = {
	Authorization: `Bearer ${publicEnv.PUBLIC_BERYX_API_KEY}`,
}

export * from './api'
