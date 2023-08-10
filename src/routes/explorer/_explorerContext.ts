// Types
import type { AccountId } from '../../data/accountId'
import type { Ethereum } from '../../data/networks/types'


// Constants
import { networksBySlug } from '../../data/networks'


// Functions
import { getEthersProvider } from '../../data/networkProviders'

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

export const explorerProvider: Readable<Ethereum.Provider> = derived([explorerNetwork, preferences], ([$explorerNetwork, $preferences], set) => {
	if($explorerNetwork)
		getEthersProvider({
			network: $explorerNetwork,
			networkProvider: $preferences.rpcNetwork
		}).then(provider => set(provider))
})

export const explorerBlockNumber: Readable<number> = derived(explorerProvider, ($explorerProvider, set) => {
	if($explorerProvider){
		const onBlock = blockNumber => set(blockNumber)

		$explorerProvider.on('block', onBlock)

		return () => $explorerProvider.off('block', onBlock)
	}
})

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
