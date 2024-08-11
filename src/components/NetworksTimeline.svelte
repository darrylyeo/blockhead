<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { getNetworkColor, getNetworkIcon, networkByChainId } from '$/data/networks'
	
	
	// Inputs
	export let networks: Ethereum.Network[]
	
	
	// Data
	import { getQueryClientContext } from '@tanstack/svelte-query'
	const queryClient = getQueryClientContext()
	const queryCache = queryClient.getQueryCache()
	
	let cachedBlockQueries = queryCache.findAll(['Block'])

	queryCache.subscribe(({ type, query }) => {
		if(type === 'added' || type === 'updated')
			if(query.queryKey[0] === 'Block')
				cachedBlockQueries = [...cachedBlockQueries, query]
	})

	$: data = cachedBlockQueries
		.filter(({
			queryKey: [_, {
				blockNumber,
				chainId
			}],
			state: {
				data,
			},
		}) => (
			blockNumber && data
		))
		.slice(-100)
		.map(({
			queryKey: [_, {
				blockNumber,
				chainId,
			}],
			state: {
				data: {
					timestamp,
				},
			},
		}) => ({
			id: `${blockNumber}/${chainId}`,
			group: chainId,
			className: 'card row',
			content: `
				<a href="/explorer/${networkByChainId.get(chainId).slug}/block/${blockNumber}" class="row">
					<img
						src="${getNetworkIcon(networkByChainId.get(chainId))}"
						width="20"
					/>

					${blockNumber}
				</a>
			`,
			start: new Date(Number(timestamp) * 1000),
			// end: new Date(Number(timestamp) * 1000),
			style: `
				background: ${getNetworkColor(networkByChainId.get(chainId))};
				width: 100px;
			`,
		}))

	// $: console.log({cachedBlockQueries, data})


	// Components
	import EthereumBlocks from './EthereumBlocks.svelte'
	import VisTimeline from './VisTimeline.svelte'
</script>


<div class="hidden" hidden>
	{#each networks as network}
		<EthereumBlocks
			{network}
		/>
	{/each}
</div>


<VisTimeline
	{data}
	options={{
		cluster: false,
		timeAxis: {
			scale: 'second',
		},
		stackSubgroups: false,
		zoomMin: 100,
		zoomMax: 1000,
		rollingMode: {
			follow: true,
		},
		zoomFriction: 10,
	}}
/>
