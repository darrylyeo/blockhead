<script context="module" lang="ts">
	let cachedBlockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = {}
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


	// export let network: Ethereum.Network
	// export let provider: Ethereum.Provider


	// import { preferences } from '../data/ethereum/preferences'
	// import { getEthersProvider } from '../data/providers'

	// $: if(network && !provider){
	// 	getEthersProvider({
	// 		network,
	// 		networkProvider: $preferences.rpcNetwork
	// 	})
	// 		.then(_ => provider = _)
	// }


	// export let blockNumber: number

	// const setBlockNumber = _ => {console.log(_); blockNumber = _}

	// const useBlockNumber = (_, _provider: Ethereum.Provider) => {
	// 	let provider

	// 	const init = (_provider) => {
	// 		provider = _provider
	// 		provider?.on('block', setBlockNumber)
	// 	}

	// 	const update = (_provider) => {
	// 		destroy()
	// 		init(_provider)
	// 	}

	// 	const destroy = () => {
	// 		provider?.off('block', setBlockNumber)
	// 	}

	// 	init(_provider)

	// 	return { update, destroy }
	// }



	// import { derived, writable } from 'svelte/store'

	// const providerStore = writable(provider)
	// $: $providerStore = provider

	// const blockNumberStore = derived<typeof providerStore, number>(providerStore, ($provider, set) => {
	// 	console.log('blockHeightForNetwork', blockHeightForNetwork)
	// 	console.log('blockNumberStore', $provider)

	// 	const onBlock = (blockNumber) => {
	// 		console.log('blockNumber', blockNumber)
	// 		set(blockHeightForNetwork[network.chainId] = blockNumber)
	// 	}

	// 	if($provider){
	// 		console.log('$provider', $provider)
	// 		$provider.on('block', onBlock)
	// 		return () => $provider.off('block', onBlock)
	// 	}else{
	// 		set(blockHeightForNetwork[network.chainId])
	// 	}
	// }, blockHeightForNetwork[network.chainId])

	// export let blockNumber
	// $: blockNumber = $blockNumberStore



	export let network: Ethereum.Network

	
	// Computed

	export let latestBlockNumber: Ethereum.BlockNumber | undefined

	let blockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = cachedBlockHeightForNetwork
	
	$: {
		latestBlockNumber = blockHeightForNetwork[network.chainId]
		cachedBlockHeightForNetwork = blockHeightForNetwork
	}


	import { preferences } from '../data/ethereum/preferences'
	import { getEthersProvider } from '../data/providers'
	// import { onDestroy } from 'svelte'

	$: if(network && !blockHeightForNetwork[network.chainId]){
		const { chainId } = network

		getEthersProvider({
			network,
			networkProvider: $preferences.rpcNetwork
		}).then((provider: Ethereum.Provider) => {
			const onBlock = (blockNumber) => {
				blockHeightForNetwork = {
					...blockHeightForNetwork,
					[chainId]: blockNumber
				}
			}

			provider.on('block', onBlock)

			// onDestroy(() => provider.off('block', onBlock))
		})
	}


	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	// import Loader from './Loader.svelte'
	// import Loading from './Loading.svelte'
	// import NetworkIcon from './NetworkIcon.svelte'
</script>


<slot {network} {latestBlockNumber}>
	<EthereumBlockNumber {network} blockNumber={latestBlockNumber} />
</slot>

<!-- <div use:useBlockNumber={provider}> -->
<!-- <div>
	<Loader
		loadingMessage=""
		fromPromise={provider && (() => new Promise(r => provider.once('block', r)))}
	>
		<NetworkIcon slot="loadingIcon" {network} />

		{#if latestBlockNumber}
			<EthereumBlockNumber {network} blockNumber={latestBlockNumber} />
		{:else}
			<Loading iconAnimation="hover">
				<NetworkIcon slot="icon" {network} />
			</Loading>
		{/if}
	</Loader>
</div> -->