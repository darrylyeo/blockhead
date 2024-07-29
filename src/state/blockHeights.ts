import type { Ethereum } from '$/data/networks/types'

import { derived } from 'svelte/store'
import { preferences } from './preferences'
import { getViemPublicClient } from '$/data/networkProviders'

import { watchBlockNumber } from 'viem/actions'


const blockHeightForNetworkStores: Record<Ethereum.ChainId, SvelteStore<Ethereum.BlockNumber>> = {}

export const blockHeightForNetwork = (network: Ethereum.Network) => (
	blockHeightForNetworkStores[network.chainId] ??= derived([
		preferences,
	], ([
		$preferences,
	], set) => {
		const publicClient = network && getViemPublicClient({
			network,
			networkProvider: $preferences.rpcNetwork,
		})

		return publicClient && watchBlockNumber(publicClient, {
			onBlockNumber: blockNumber => {
				set(blockNumber)
			}
		})
	})
)
