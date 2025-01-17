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


// Functions
import { invertRecord } from '$/utils/invertRecord'


// Types/constants
import { Filecoin } from '$/data/filecoin'
import type { AccountInfo } from './api'

export const beryxActorTypes = invertRecord(
	{
		// Filecoin
		[Filecoin.ActorType.System]: 'system',
		[Filecoin.ActorType.Init]: 'init',
		[Filecoin.ActorType.Reward]: 'reward',
		[Filecoin.ActorType.Cron]: 'cron',
		[Filecoin.ActorType.StoragePower]: 'storagepower',
		[Filecoin.ActorType.StorageMarket]: 'storagemarket',
		[Filecoin.ActorType.VerifiedRegistry]: 'verifiedregistry',
		
		// Filecoin Plus
		[Filecoin.ActorType.DataCap]: 'datacap',
		
		// Miners
		[Filecoin.ActorType.StorageMiner]: 'storageminer',
		[Filecoin.ActorType.Miner]: 'miner',

		// Accounts
		[Filecoin.ActorType.Account]: 'account',
		[Filecoin.ActorType.Multisig]: 'multisig',

		// Payment channels
		[Filecoin.ActorType.PaymentChannel]: 'paymentchannel',

		// Smart contracts
		[Filecoin.ActorType.User]: 'user',

		// Filecoin EVM
		[Filecoin.ActorType.EvmPlaceholder]: 'placeholder',
		[Filecoin.ActorType.EvmAccount]: 'ethaccount',
		[Filecoin.ActorType.EvmContract]: 'evm',
	} as const satisfies Partial<Record<Filecoin.ActorType, string>>
)

export type BeryxActorType = keyof typeof beryxActorTypes

export type BeryxAccountInfo<
	T extends BeryxActorType = BeryxActorType
> = (
	& AccountInfo

	& {
		actor_type: BeryxActorType
	}

	& (
		T extends Filecoin.ActorType.System ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.Init ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.Reward ?
			{
				actor_cid: string
				robust: string
				short: string
				eth_address: string
			}

		: T extends Filecoin.ActorType.Cron ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.StoragePower ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.StorageMarket ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.VerifiedRegistry ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.DataCap ?
			{
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.StorageMiner ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.Miner ?
			{
				robust: string
				short: string
				creation_tx_cid: string
			}

		: T extends Filecoin.ActorType.Account ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.Multisig ?
			{
				actor_cid: string
				robust: string
				short: string
				state: {
					last_tipset_processed: number
				}
			}

		: T extends Filecoin.ActorType.PaymentChannel ?
			{
				actor_cid: string
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.User ?
			{
				robust: string
				short: string
			}

		: T extends Filecoin.ActorType.EvmPlaceholder ?
			Record<string, never>

		: T extends Filecoin.ActorType.EvmAccount ?
			{
				actor_cid: string
				robust: string
				short: string
				eth_address: string
			}

		: T extends Filecoin.ActorType.EvmContract ?
			{
				actor_cid: string
				robust: string
				short: string
				creation_tx_cid: string
				creator_address: string
				created_at: string

				state: (
					| {
						ticker: string
						contract_address: string
						description: string
						decimals: number
						total_supply: string
						creation_date: string
						holders_count: number
					}
					| {
						ticker: ''
						contract_address: ''
						description: ''
						decimals: 0
						total_supply: ''
						creation_date: ''
						holders_count: 0
					}
				)
			}

		:
			never
	)
)
