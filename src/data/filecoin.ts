import type { Ethereum } from './networks/types'
import type { IpfsCid } from '../api/ipfs/contentId'

export namespace Filecoin {
	export type TipsetNumber = bigint

	export type TipsetCid = IpfsCid

	export type Tipset = {
		id: TipsetCid,
		number: TipsetNumber,
		timestamp: number,
		isCanonical: boolean,

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

	export type Address = `f${number | string}`

	/** FIL */
	export type NativeCurrencyAmount = bigint

	/** attoFIL */
	export type GasAmount = bigint
	
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
}
