import { derived, writable, type Readable } from 'svelte/store'
import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'
import type { Filecoin } from '$/data/filecoin'

export type ExplorerParams = {
	networkSlug: Ethereum.NetworkSlug | '',
	address: Ethereum.Address | '',
	blockNumber: Ethereum.BlockNumber | '',
	ensName: ENS.Name | '',
	transactionId: Ethereum.TransactionId | '',
	filecoinTipsetId: Filecoin.TipsetId | '',
	filecoinBlockCid: Filecoin.BlockCid | '',
}

export type ExplorerInputParams = Partial<Omit<ExplorerParams, 'networkSlug'>>


// Param stores

export const networkSlug = writable<ExplorerParams['networkSlug']>('')
export const address = writable<ExplorerParams['address']>('')
export const blockNumber = writable<ExplorerParams['blockNumber']>('')
export const ensName = writable<ExplorerParams['ensName']>('')
export const transactionId = writable<ExplorerParams['transactionId']>('')
export const filecoinTipsetId = writable<ExplorerParams['filecoinTipsetId']>('')
export const filecoinBlockCid = writable<ExplorerParams['filecoinBlockCid']>('')

export const explorerParams = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
	filecoinTipsetId,
	filecoinBlockCid,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
	$filecoinTipsetId,
	$filecoinBlockCid,
], set: (_: ExplorerParams) => void) => {
	set(({
		networkSlug: $networkSlug,
		address: $address,
		blockNumber: $blockNumber,
		ensName: $ensName,
		transactionId: $transactionId,
		filecoinTipsetId: $filecoinTipsetId,
		filecoinBlockCid: $filecoinBlockCid,
	}))
})


// Derived path store

export const derivedPath: Readable<string> = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
	filecoinTipsetId,
	filecoinBlockCid,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
	$filecoinTipsetId,
	$filecoinBlockCid,
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
				: $filecoinTipsetId ?
					`/tipset/${$filecoinTipsetId}`
				: $filecoinBlockCid ?
					`/block/${$filecoinBlockCid}`
				:
					''
			}`
		:
			''
	}`
))
