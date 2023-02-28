// Types
import type { Ethereum } from '../../data/networks/types'


// Constants
import { networksBySlug } from '../../data/networks'


// Functions
import { getEthersProvider } from '../../data/providers'


// External stores

import { networkSlug } from './_explorerParams'

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
