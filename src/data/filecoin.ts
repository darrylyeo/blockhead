import type { Ethereum } from './networks/types'
import type { IpfsCid } from '$/api/ipfs/contentId'
import type { PartialExceptOneOf } from '$/utils/PartialExceptOneOf'
import type { TokenWithBalance } from './tokens'

export namespace Filecoin {
	export type TipsetId =  TipsetNumber | TipsetCid
	export type TipsetNumber = bigint
	export type TipsetCid = IpfsCid

	export type Tipset = {
		number: TipsetNumber,
		cid?: TipsetCid,

		timestamp: number,

		isCanonical?: boolean,

		baseGasFee?: GasRate

		previousTipset?: PartialExceptOneOf<Tipset,
			| 'number'
			| 'cid'
		>

		blocks?: Block[],

		transactions?: Transaction[],
		transactionsCount?: number,
	}

	export type BlockCid = IpfsCid

	export type Block = {
		cid: BlockCid

		miner: PartialExceptOneOf<Actor<ActorType.Miner>,
			| 'shortAddress'
		>
		labels?: {
			miner?: {
				label: string
				isSigned: boolean
			}
		}

		winCount?: number
		reward?: NativeCurrencyAmount
		penalty?: NativeCurrencyAmount

		transactions?: PartialExceptOneOf<Transaction,
			| 'cid'
		>[]
		transactionsCount?: number

		tipset?: PartialExceptOneOf<Tipset,
			| 'number'
			| 'cid'
			| 'timestamp'
		>

		parentBlocks?: PartialExceptOneOf<Block,
			| 'cid'
		>[]

		weight?: bigint
		stateRoot?: IpfsCid
		baseGasFee?: bigint
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
		cid: TransactionCid

		size?: bigint

		fromActor?: PartialExceptOneOf<Actor,
			| 'shortAddress'
			| 'robustAddress'
		>
		toActor?: PartialExceptOneOf<Actor,
			| 'shortAddress'
			| 'robustAddress'
		>
		labels?: {
			fromActor?: {
				label: string
				isSigned: boolean
			}
			toActor?: {
				label: string
				isSigned: boolean
			}
		}

		value: NativeCurrencyAmount

		gasToken?: Ethereum.NativeCurrency
		gasSpent?: GasAmount

		method?: ActorMethodName
		evmMethod?: string
		params?: string

		metadata?: any

		receipt?: {
			exitCode: 0 | 1
			return?: string
		}

		internalTransactions?: Transaction[]

		transfers?: Transfer[]

		block?: PartialExceptOneOf<Block,
			'cid'
		>

		tipset?: PartialExceptOneOf<Tipset,
			| 'number'
			| 'cid'
			| 'timestamp'
		>
	}

	export enum TransferType {
		MinerFee = 'MinerFee',
		BurnFee = 'BurnFee',
		Transfer = 'Transfer',
	}

	export type Transfer<
		T extends TransferType = TransferType
	> = {
		type: T

		fromActor: PartialExceptOneOf<Actor,
			| 'shortAddress'
			| 'robustAddress'
		>
		toActor: PartialExceptOneOf<Actor,
			| 'shortAddress'
			| 'robustAddress'
		>
		labels?: {
			fromActor?: {
				label: string
				isSigned: boolean
			}
			toActor?: {
				label: string
				isSigned: boolean
			}
		}

		value: NativeCurrencyAmount
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
		EthereumAddressManager = 'eam',
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
		[ActorType.EthereumAddressManager]: {
			name: 'Ethereum Address Manager',
			links: [
				'https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/address-types#ethereum-address-manager',
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
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.Init ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.Reward ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
					ethAddress: Ethereum.Address
				}

			: T extends ActorType.Cron ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.StoragePower ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.StorageMarket ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.VerifiedRegistry ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.DataCap ?
				{
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.StorageMiner ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.Miner ?
				{
					shortAddress: Address<Filecoin.AddressType.ID>
					robustAddress?: Address

					tag?: {
						name: string
						isSigned: boolean
					}
				}

			: T extends ActorType.Account ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
					robustAddress?: Address<AddressType.Secp256k1 | AddressType.BLS>
				}

			: T extends ActorType.Multisig ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
					robustAddress?: Address<AddressType.Actor | AddressType.BLS>

					signers?: (
						PartialExceptOneOf<Actor<ActorType.Account | ActorType.Multisig>,
							| 'shortAddress'
							| 'robustAddress'
						>[]
					)

					lastProcessedTipset?: PartialExceptOneOf<Tipset,
						| 'number'
					>
				}

			: T extends ActorType.PaymentChannel ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.User ?
				{
					shortAddress: Address<AddressType.ID>
				}

			: T extends ActorType.EvmPlaceholder ?
				{
					shortAddress: Address<AddressType.ID>
					evmAddress: Ethereum.Address
				}

			: T extends ActorType.EvmAccount ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
					robustAddress?: Address<AddressType.Extensible>
					evmAddress: Ethereum.Address
				}

			: T extends ActorType.EvmContract ?
				{
					cid?: ActorCid
					shortAddress: Address<AddressType.ID>
					robustAddress?: Address<AddressType.Extensible>
					evmAddress: Ethereum.Address

					creator?: PartialExceptOneOf<Actor<ActorType.Account | ActorType.Multisig | ActorType.EvmContract>,
						| 'shortAddress'
						| 'robustAddress'
					>

					erc20Token?: Ethereum.Erc20Token
				}

			:
				never
		)

		& {
			assets?: {
				nativeBalance: TokenWithBalance
				erc20Tokens?: TokenWithBalance[]
				erc20TokensCount?: number,
			}

			transactions?: Transaction[]
			transactionsCount?: number

			transfers?: Transfer[]
			transfersCount?: number

			ownedMiners: PartialExceptOneOf<Actor<ActorType.Miner>,
				| 'shortAddress'
				| 'robustAddress'
			>[]
			workerMiners: PartialExceptOneOf<Actor<ActorType.Miner>,
				| 'shortAddress'
				| 'robustAddress'
			>[]
			benefitedMiners: PartialExceptOneOf<Actor<ActorType.Miner>,
				| 'shortAddress'
				| 'robustAddress'
			>[]

			createdAt?: TimeReference

			lastActiveAt?: TimeReference
		}
	)

	export type TimeReference = PartialExceptOneOf<{
		transaction: PartialExceptOneOf<Transaction,
			'cid'
		>

		tipset: PartialExceptOneOf<Tipset,
			'timestamp'
		>
	}>
}
