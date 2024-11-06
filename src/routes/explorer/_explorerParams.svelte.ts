// Types
import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'

export type ExplorerParams = {
	networkSlug: Ethereum.NetworkSlug | ''
	address: Ethereum.Address | ''
	blockNumber: Ethereum.BlockNumber | ''
	ensName: ENS.Name | ''
	transactionId: Ethereum.TransactionId | ''
}

export type ExplorerInputParams = Partial<Omit<ExplorerParams, 'networkSlug'>>


// State
export const explorerParams = new class {
	// Params
	networkSlug = $state<ExplorerParams['networkSlug'] | ''>('')
	address = $state<ExplorerParams['address'] | ''>('')
	blockNumber = $state<ExplorerParams['blockNumber'] | ''>('')
	ensName = $state<ExplorerParams['ensName'] | ''>('')
	transactionId = $state<ExplorerParams['transactionId'] | ''>('')

	explorerParams = $derived(
		{
			networkSlug: this.networkSlug,
			address: this.address,
			blockNumber: this.blockNumber,
			ensName: this.ensName,
			transactionId: this.transactionId,
		} as ExplorerParams
	)

	derivedPath = $derived(
		`/explorer${
			this.networkSlug ?
				`/${this.networkSlug}${
					this.address || this.ensName ?
						`/address/${this.address || this.ensName}`
					: this.blockNumber ?
						`/block/${this.blockNumber}`
					: this.transactionId ?
						`/tx/${this.transactionId}`
					:
						''
				}`
			:
				''
		}`
	)
}
