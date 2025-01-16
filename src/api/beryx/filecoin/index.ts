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


// Types
import type { Filecoin } from '$/data/filecoin'
import type { AccountInfo } from './api'

export type BeryxAccountInfo<
	T extends Filecoin.ActorType = Filecoin.ActorType
> = (
	& Omit<AccountInfo, 'actor_type'>

	& {
		actor_type: T
	}

	& (
		T extends Filecoin.ActorType.Multisig ?
			{
				state: {
					last_tipset_processed: number
				}
			}

		: T extends Filecoin.ActorType.EvmAccount ?
			{
				robust: string
				short: string
				actor_cid: string
				eth_address: string
			}

		: T extends Filecoin.ActorType.EvmContract ?
			{
				creation_tx_cid: string

				state?: {
					ticker: string
					contract_address: string
					description: string
					decimals: number
					total_supply: string
					creation_date: string
					holders_count: number
				}
			}

		: T extends Filecoin.ActorType.Miner ?
			{
				robust: string
				short: string
				creation_tx_cid: string
			}

		:
			never
	)
)
