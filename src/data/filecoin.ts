import type { IpfsCid } from '../api/ipfs/contentId'

export namespace Filecoin {
	export type TipsetNumber = bigint

	export type Tipset = {
		tipsetNumber: TipsetNumber,
		timestamp: number,
		transactions?: Transaction[],
	}

	export type Address = `f${number | string}`

	/** FIL */
	export type NativeCurrencyAmount = bigint

	/** attoFIL */
	export type GasAmount = bigint
	
	export type TransactionId = IpfsCid

	export type Transaction = {
		transactionId: TransactionId,

		isSuccessful: boolean,

		fromAddress: Address,
		toAddress: Address,

		value: NativeCurrencyAmount,

		gasUsed: GasAmount,

		method:
			| 'AwardBlockReward'
			| 'PreCommitSector'
			| 'ProveCommitSector'
			| 'PublishStorageDeals',

		blockCid: IpfsCid,
		metadata: any,
	}
}
