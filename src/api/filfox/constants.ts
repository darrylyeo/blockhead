
// Types/constants
import { invertRecord } from '$/utils/invertRecord'
import { Filecoin } from '$/data/filecoin'

export const filfoxActorTypes = invertRecord(
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
		[Filecoin.ActorType.EthereumAddressManager]: 'eam',
		[Filecoin.ActorType.EvmPlaceholder]: 'placeholder',
		[Filecoin.ActorType.EvmAccount]: 'ethaccount',
		[Filecoin.ActorType.EvmContract]: 'evm',
	} as const satisfies Partial<Record<Filecoin.ActorType, string>>
)
