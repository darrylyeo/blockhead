import type { Ethereum } from './networks/types'
import type { IpfsCid } from '$/api/ipfs/contentId'
import type { PartialExceptOneOf } from '$/utils/PartialExceptOneOf'

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

	export const addressTypes = {
		[AddressType.ID]: {
			name: 'ID Address',
			link: 'https://docs.filecoin.io/basics/the-blockchain/addresses#actor-ids',
			description: 'An ID address assigned by InitActor. Similar to auto-incrementing IDs in a database; can temporarily change during chain reorganization until finality.',
		},
		[AddressType.Secp256k1]: {
			name: 'Public Key (secp256k1)',
			link: 'https://docs.filecoin.io/basics/the-blockchain/addresses#public-keys',
			description: 'A robust public key address derived from secp256k1. Independent of chain state, allowing offline address generation.',
		},
		[AddressType.Actor]: {
			name: 'Actor Address',
			link: 'https://docs.filecoin.io/basics/the-blockchain/addresses#actors',
			description: 'A robust address for non-public-key actors, derived from sha256 hash of account creation. Independent of chain state.',
		},
		[AddressType.BLS]: {
			name: 'Public Key (BLS)',
			link: 'https://docs.filecoin.io/basics/the-blockchain/addresses#public-keys',
			description: 'A robust public key address using BLS curve bls12-381. Independent of chain state, uses G1 for public keys and G2 for signatures.',
		},
		[AddressType.Extensible]: {
			name: 'Extensible Address',
			link: 'https://docs.filecoin.io/basics/the-blockchain/addresses#extensible-user-defined-actors',
			description: 'Extensible addresses managed by address manager actors. Format: f4<manager-id>f<new-id>. Enables predictable addressing and custom address systems.',
		},
	} as const satisfies Record<AddressType, {
		name: string,
		link: string,
		description: string,
	}>

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
		System = 'system',
		Init = 'init',
		Reward = 'reward',
		Cron = 'cron',
		StoragePower = 'storagepower',
		StorageMarket = 'storagemarket',
		VerifiedRegistry = 'verifiedregistry',
		
		// Filecoin Plus
		DataCap = 'datacap',
		
		// Miners
		StorageMiner = 'storageminer',
		Miner = 'miner',

		// Accounts
		Account = 'account',
		Multisig = 'multisig',

		// Payment
		PaymentChannel = 'paymentchannel',

		// Smart contracts
		User = 'user',

		// Filecoin EVM
		EvmPlaceholder = 'placeholder',
		EvmAccount = 'ethaccount',
		EvmContract = 'evm',
	}

	export const actorTypes = {
		[ActorType.System]: {
			name: 'System',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#systemactor',
				'https://docs.filecoin.io/reference/built-in-actors#systemactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#systemactor',
			],
		},
		[ActorType.Init]: {
			name: 'Init',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#initactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#initactor',
			],
		},
		[ActorType.Reward]: {
			name: 'Reward',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#rewardactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#rewardactor',
			],
		},
		[ActorType.Cron]: {
			name: 'Cron',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#cronactor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#cronactor',
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
		[ActorType.StorageMarket]: {
			name: 'Storage Market',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemarketactor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#storage-market-actor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#storagemarketactor',
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
		[ActorType.DataCap]: {
			name: 'DataCap',
			links: [
				'https://docs.filecoin.io/basics/how-storage-works/filecoin-plus#datacap',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#datacap',
			],
		},
		[ActorType.StorageMiner]: {
			name: 'Storage Miner',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemineractor',
				'https://docs.filecoin.io/reference/built-in-actors/overview/#storagemineractor',
			],
		},
		[ActorType.Miner]: {
			name: 'Miner',
			links: [
				'https://docs.filecoin.io/basics/the-blockchain/actors#storagemineractor',
				'https://docs.filecoin.io/reference/built-in-actors/protocol-api/#miner',
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
		}

		& (
			T extends ActorType.System ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.Init ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.Reward ?
				{
					cid: ActorCid
					shortAddress: Address
					ethAddress: Ethereum.Address
				}

			: T extends ActorType.Cron ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.StoragePower ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.StorageMarket ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.VerifiedRegistry ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.DataCap ?
				{
					shortAddress: Address
				}

			: T extends ActorType.StorageMiner ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.Miner ?
				{
					shortAddress: Address
					robustAddress?: Address
				}

			: T extends ActorType.Account ?
				{
					cid: ActorCid
					shortAddress: Address
					robustAddress?: Address
				}

			: T extends ActorType.Multisig ?
				{
					cid: ActorCid
					shortAddress: Address
					robustAddress?: Address

					signers?: Address[]

					lastProcessedTipsetNumber?: bigint
				}

			: T extends ActorType.PaymentChannel ?
				{
					cid: ActorCid
					shortAddress: Address
				}

			: T extends ActorType.User ?
				{
					shortAddress: Address
				}

			: T extends ActorType.EvmPlaceholder ?
				{
					shortAddress: Address
					evmAddress: Ethereum.Address
				}

			: T extends ActorType.EvmAccount ?
				{
					cid: ActorCid
					shortAddress: Address
					robustAddress?: Address
					evmAddress: Ethereum.Address
				}

			: T extends ActorType.EvmContract ?
				{
					cid: ActorCid
					shortAddress: Address
					robustAddress?: Address
					evmAddress: Ethereum.Address

					creatorAddress: Address

					erc20Token?: Ethereum.Erc20Token
				}

			:
				never
		)

		& {
			createdAt?: {
				transaction?: PartialExceptOneOf<Transaction,
					'id'
				>

				tipset?: PartialExceptOneOf<Tipset,
					'timestamp'
				>
			}
		}
	)
}
