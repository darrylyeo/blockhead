// Types
import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'
import type { Filecoin } from '$/data/filecoin'

export type ExplorerParams = {
	networkSlug?: Ethereum.NetworkSlug
	address?: Ethereum.Address
	blockNumber?: Ethereum.BlockNumber
	ensName?: ENS.Name
	transactionId?: Ethereum.TransactionId
	filecoinTipsetCid?: Filecoin.TipsetCid
	filecoinBlockCid?: Filecoin.BlockCid
}

export type ExplorerInputParams = Partial<Omit<ExplorerParams, 'networkSlug'>>


// Param stores
export const networkSlug = writable<ExplorerParams['networkSlug']>()
export const address = writable<ExplorerParams['address']>()
export const blockNumber = writable<ExplorerParams['blockNumber']>()
export const ensName = writable<ExplorerParams['ensName']>()
export const transactionId = writable<ExplorerParams['transactionId']>()
export const filecoinTipsetCid = writable<ExplorerParams['filecoinTipsetCid']>()
export const filecoinBlockCid = writable<ExplorerParams['filecoinBlockCid']>()

export const explorerParams = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
	filecoinTipsetCid,
	filecoinBlockCid,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
	$filecoinTipsetCid,
	$filecoinBlockCid,
], set: (_: ExplorerParams) => void) => {
	set(({
		networkSlug: $networkSlug,
		address: $address,
		blockNumber: $blockNumber,
		ensName: $ensName,
		transactionId: $transactionId,
		filecoinTipsetCid: $filecoinTipsetCid,
		filecoinBlockCid: $filecoinBlockCid,
	}))
})


// Derived path store
import { type Readable, derived, writable } from 'svelte/store'

import { match as isNetworkSlugFilecoin } from '$/params/isNetworkSlugFilecoin'

export const derivedPath: Readable<string> = derived([
	networkSlug,
	address,
	blockNumber,
	ensName,
	transactionId,
	filecoinTipsetCid,
	filecoinBlockCid,
], ([
	$networkSlug,
	$address,
	$blockNumber,
	$ensName,
	$transactionId,
	$filecoinTipsetCid,
	$filecoinBlockCid,
], set) => set(
	`/explorer${
		$networkSlug ?
			`/${$networkSlug}${
				$address || $ensName ?
					`/address/${$address || $ensName}`
				: $blockNumber ?
					`/${isNetworkSlugFilecoin($networkSlug) ? 'tipset' : 'block'}/${$blockNumber}`
				: $transactionId ?
					`/tx/${$transactionId}`
				: $filecoinTipsetCid ?
					`/tipset/${$filecoinTipsetCid}`
				: $filecoinBlockCid ?
					`/block/${$filecoinBlockCid}`
				:
					''
			}`
		:
			''
	}`
))
