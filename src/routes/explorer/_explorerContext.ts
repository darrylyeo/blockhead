// Types
import type { Ethereum } from '../../data/networks/types'


// Constants
import { networksBySlug } from '../../data/networks'


// Functions
import { getViemPublicClient } from '../../data/networkProviders'


// External stores

import {
	type ExplorerInputParams,
	explorerParams,
	networkSlug,
} from './_explorerParams'

import { preferences } from '../../state/preferences'


// Derived stores

import { derived, type Readable } from 'svelte/store'

export const explorerNetwork: Readable<Ethereum.Network> = derived(networkSlug, ($networkSlug, set) => {
	if($networkSlug)
		set(networksBySlug[$networkSlug])
})

export const explorerPublicClient: Readable<Ethereum.PublicClient | undefined> = derived([explorerNetwork, preferences], ([$explorerNetwork, $preferences], set) => {
	if($explorerNetwork)
		set(getViemPublicClient({
			network: $explorerNetwork,
			networkProvider: $preferences.rpcNetwork
		}))
})

export const explorerBlockNumber: Readable<number> = derived(explorerPublicClient, ($explorerPublicClient, set) => (
	$explorerPublicClient?.watchBlockNumber({
		onBlockNumber: blockNumber => set(Number(blockNumber))
	})
))

export enum ExplorerQueryType {
	Account = 'account',
	Block = 'block',
	Transaction = 'transaction',
	None = 'none',
}

export const getExplorerQueryType = ({
	address,
	blockNumber,
	ensName,
	transactionId,
}: ExplorerInputParams) => (
	address || ensName ?
		ExplorerQueryType.Account
	: blockNumber ?
		ExplorerQueryType.Block
	: transactionId ?
		ExplorerQueryType.Transaction
	: 
		ExplorerQueryType.None
)

export const explorerQueryType = derived(explorerParams, (
	$explorerParams,
	set: (_: ExplorerQueryType) => void
) => {
	set(getExplorerQueryType($explorerParams))
})


export const explorerQuery = derived(explorerParams, (
	$explorerParams,
	set: (_: string) => void
) => {
	set(
		String($explorerParams.address || $explorerParams.blockNumber || $explorerParams.ensName || $explorerParams.transactionId || '')
	)
})


// Internal stores
import { writable } from 'svelte/store'

export const showTestnets = writable(false)
