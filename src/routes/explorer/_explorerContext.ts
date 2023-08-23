// Types
import type { AccountId } from '../../data/accountId'
import type { Ethereum } from '../../data/networks/types'


// Constants
import { networksBySlug } from '../../data/networks'


// Functions
import { getViemPublicClient } from '../../data/networkProviders'

import { isEvmAddress } from '../../utils/isEvmAddress'
import { isEvmTransactionId } from '../../utils/isEvmTransactionId'
import { isBlockNumber } from '../../utils/isBlockNumber'


// External stores

import { networkSlug, query } from './_explorerParams'

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

const getExplorerQueryType = (query: string) => (
	query ?
		isEvmTransactionId(query) ?
			'transaction'
		: isBlockNumber(query) ?
			'block'
		: isEvmAddress(query) ?
			'address'
		:
			'accountId'
	:
		undefined
)

type ExplorerQueryType = ReturnType<typeof getExplorerQueryType>

export const explorerQueryType = derived<typeof query, ExplorerQueryType>(query, ($query, set) => {
	set(getExplorerQueryType($query))
})

const getExplorerViewData = (query: string, queryType: ExplorerQueryType) => (
	queryType === 'transaction' ?
		{
			transactionId: query as Ethereum.TransactionID
		}
	: queryType === 'block' ?
		{
			blockNumber: Number(query) as Ethereum.BlockNumber
		}
	: queryType === 'address' ?
		{
			address: query as Ethereum.Address
		}
	: queryType === 'accountId' ?
		{
			accountId: query as AccountId
		}
	:
		{}
)

export const explorerViewData: SvelteStore<ReturnType<typeof getExplorerViewData>> = derived([
	query,
	explorerQueryType,
], ([
	$query,
	$explorerView,
], set) => {
	set(getExplorerViewData($query, $explorerView))
})


// Internal stores
import { writable } from 'svelte/store'

export const showTestnets = writable(false)
