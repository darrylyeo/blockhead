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

	export type Address = `${`f` | `t`}${`0${number}` | `1${string}` | `2${string}` | `3${string}` | `4${number}f${string}`}`

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
		Unknown = 'unknown',
		Miner = 'miner',
		Account = 'account',
	}

	export type Account = {
		address: Address,
	} & ({
		actorType: ActorType.Unknown,
	} | {
		actorType: ActorType.Miner,

		// ---

		robustAddress: Address,
		shortAddress: Address,
		createdTipsetTimestamp: number,
		createdTransactionId: TransactionCid,
	} | {
		actorType: ActorType.Account,

		// ---

		robustAddress: Address,
		shortAddress: Address,
		createdTipsetTimestamp: number,
	})
}
