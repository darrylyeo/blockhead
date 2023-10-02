import { derived, writable, type Readable } from 'svelte/store'
import type { Ethereum } from '../../data/networks/types'
import type { ENS } from '../../api/ens'

export type ExplorerParams = {
	networkSlug: Ethereum.NetworkSlug | '',
	address: Ethereum.Address | '',
	blockNumber: Ethereum.BlockNumber | '',
	ensName: ENS.Name | '',
	transactionId: Ethereum.TransactionID | '',
}

export type ExplorerInputParams = Partial<Omit<ExplorerParams, 'networkSlug'>>


// Param stores

export const networkSlug = writable<ExplorerParams['networkSlug']>('')
export const address = writable<ExplorerParams['address']>('')
export const blockNumber = writable<ExplorerParams['blockNumber']>('')
export const ensName = writable<ExplorerParams['ensName']>('')
export const transactionId = writable<ExplorerParams['transactionId']>('')

export const explorerParams = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
], set: (_: ExplorerParams) => void) => {
	set(({
		networkSlug: $networkSlug,
		address: $address,
		blockNumber: $blockNumber,
		ensName: $ensName,
		transactionId: $transactionId,
	}))
})


// Derived path store

export const derivedPath: Readable<string> = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
], set) => set(
	`/explorer${
		$networkSlug ?
			`/${$networkSlug}${
				$address || $ensName ?
					`/address/${$address || $ensName}`
				: $blockNumber ?
					`/block/${$blockNumber}`
				: $transactionId ?
					`/tx/${$transactionId}`
				:
					''
			}`
		:
			''
	}`
))
