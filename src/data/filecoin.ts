import type { Ethereum } from './networks/types'
import type { IpfsCid } from '$/api/ipfs/contentId'

export namespace Filecoin {
	export type TipsetId =  TipsetNumber | TipsetCid
	export type TipsetNumber = bigint
	export type TipsetCid = IpfsCid

	export type Tipset = {
		id: TipsetCid,
		number: TipsetNumber,
		timestamp: number,
		isCanonical: boolean,
		baseGasFee?: GasRate

		// ---

		previousId?: TipsetCid,
		blocks?: Block[],
		transactions?: Transaction[],
	}

	export type BlockCid = IpfsCid

	export type Block = {
		id: BlockCid,
		minerAddress: Address,

		// ---

		transactions?: Transaction[],

		tipsetId?: TipsetCid,
		tipsetNumber?: TipsetNumber,
		tipsetTimestamp: number,
	}

	export enum AddressType {
		ID = 0,
		Secp256k1 = 1,
		Actor = 2,
		BLS = 3,
		Extensible = 4,
	}

	export type Address<
		T extends AddressType = AddressType
	> = (
		T extends AddressType.ID ?
			`${`f` | `t`}0${number}`

		: T extends AddressType.Secp256k1 ?
			`${`f` | `t`}1${string}`

		: T extends AddressType.Actor ?
			`${`f` | `t`}2${string}`

		: T extends AddressType.BLS ?
			`${`f` | `t`}3${string}`

		: T extends AddressType.Extensible ?
			`${`f` | `t`}4${number}f${string}`

		:
			never
	)

	/** FIL */
	export type NativeCurrencyAmount = bigint

	/** attoFIL */
	export type GasAmount = bigint
	export type GasRate = bigint
	
	export type TransactionCid = IpfsCid

	export type ActorMethodName = string

	export type Transaction = {
		id: TransactionCid,

		isSuccessful: boolean,

		fromAddress: Address,
		toAddress: Address,

		value: NativeCurrencyAmount,

		gasToken: Ethereum.NativeCurrency,
		gasSpent: GasAmount,

		method: ActorMethodName,

		metadata: any,

		internalTransactions?: Transaction[],

		// ---

		blockId?: IpfsCid,

		tipsetId?: TipsetCid,
		tipsetNumber?: TipsetNumber,
		tipsetTimestamp: number,
	}

	export enum ActorType {
		// Filecoin
		Cron = 'cron',
		Init = 'init',
		Account = 'account',
		Reward = 'reward',
		StorageMarket = 'storagemarket',
		StorageMiner = 'storageminer',
		Multisig = 'multisig',
		PaymentChannel = 'paymentchannel',
		StoragePower = 'storagepower',
		VerifiedRegistry = 'verifiedregistry',
		System = 'system',
		Miner = 'miner',

		// Filecoin Plus
		DataCap = 'datacap',

		// Smart contracts
		User = 'user',

		// Filecoin EVM
		EvmPlaceholder = 'placeholder',
		EvmAccount = 'ethaccount',
		EvmContract = 'evm',
	}

	export const actorTypes = {
		[ActorType.Cron]: {
			name: 'Cron',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#cronactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#cronactor',
			],
		},
		[ActorType.Init]: {
			name: 'Init',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#initactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#initactor',
			],
		},
		[ActorType.Account]: {
			name: 'Account',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#accountactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#accountactor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#account-actor',
			],
		},
		[ActorType.Reward]: {
			name: 'Reward',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#rewardactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#rewardactor',
			],
		},
		[ActorType.StorageMarket]: {
			name: 'Storage Market',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemarketactor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#storage-market-actor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#storagemarketactor',
			],
		},
		[ActorType.StorageMiner]: {
			name: 'Storage Miner',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemineractor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#storagemineractor',
			],
		},
		[ActorType.Multisig]: {
			name: 'Multisig',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#multisigactor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api#multisig',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#multisigactor',
			],
		},
		[ActorType.PaymentChannel]: {
			name: 'Payment Channel',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#paymentchannelactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#paymentchannelactor',
			],
		},
		[ActorType.StoragePower]: {
			name: 'Storage Power',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagepoweractor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#storage-power-actor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#storagepoweractor',
			],
		},
		[ActorType.VerifiedRegistry]: {
			name: 'Verified Registry',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#verifiedregistryactor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#verified-registry-actor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#verifiedregistryactor',
			],
		},
		[ActorType.System]: {
			name: 'System',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#systemactor',
				'https://docs.filecoin.io/reference/built-in-actors#systemactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#systemactor',
			],
		},
		[ActorType.Miner]: {
			name: 'Miner',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemineractor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#miner',
			],
		},
		[ActorType.DataCap]: {
			name: 'DataCap',
			links: [
				'https://docs.filecoin.io/basics/how-storage-works/filecoin-plus#datacap',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#datacap',
			],
		},
		[ActorType.User]: {
			name: 'FVM contract',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#user-actors-smart-contracts',
			],
		},
		[ActorType.EvmPlaceholder]: {
			name: 'EVM placeholder',
			links: [
				'https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/actor-types#placeholder',
			],
		},
		[ActorType.EvmAccount]: {
			name: 'EVM account',
			links: [
				'https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/actor-types#ethereum-style-account',
			],
		},
		[ActorType.EvmContract]: {
			name: 'EVM contract',
			links: [
				'https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/actor-types#evm-smart-contract',
			],
		},
	} as const satisfies Record<ActorType, {
		name: string
		links: string[]
	}>

	export type ActorCid = `bafk${string}`

	export type Actor<
		T extends ActorType = ActorType
	> = (
		& {
			type: T

			shortAddress: Address
		}

		& (
			T extends ActorType.Cron ?
				{
					cid: ActorCid
				}

			: T extends ActorType.Init ?
				{
					cid: ActorCid
				}

			: T extends ActorType.Account ?
				{
					cid: ActorCid
					robustAddress?: Address
				}

			: T extends ActorType.Reward ?
				{
					cid: ActorCid
					ethAddress: Address
				}

			: T extends ActorType.StorageMarket ?
				{
					cid: ActorCid
				}

			: T extends ActorType.StorageMiner ?
				{
					cid: ActorCid
				}

			: T extends ActorType.Multisig ?
				{
					cid: ActorCid
					robustAddress?: Address

					signers?: Address[]
				}

			: T extends ActorType.PaymentChannel ?
				{
					cid: ActorCid
				}

			: T extends ActorType.StoragePower ?
				{
					cid: ActorCid
				}

			: T extends ActorType.VerifiedRegistry ?
				{
					cid: ActorCid
				}

			: T extends ActorType.System ?
				{
					cid: ActorCid
				}

			: T extends ActorType.Miner ?
				never

			: T extends ActorType.DataCap ?
				never

			: T extends ActorType.User ?
				never

			: T extends ActorType.EvmPlaceholder ?
				never

			: T extends ActorType.EvmAccount ?
				{
					cid: ActorCid
					robustAddress?: Address
					evmAddress: Ethereum.Address
				}

			: T extends ActorType.EvmContract ?
				{
					cid: ActorCid
					robustAddress?: Address
					evmAddress: Ethereum.Address

					creator: (
						PartialExceptOneOf<
							Actor<ActorType.Account | ActorType.Multisig | ActorType.EvmContract>,
							'shortAddress' | 'robustAddress'
						>
					)

					erc20Token?: Ethereum.Erc20Token
				}

			:
				never
		)

		& {
			creation?: {
				transactionId?: string

				tipsetTimestamp?: string
			}
		}
	)
}
