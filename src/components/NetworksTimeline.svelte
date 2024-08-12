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


	// Internal state
	let cachedBlockQueries: ReturnType<typeof queryCache.findAll> | undefined

	import { onMount } from 'svelte'

	onMount(() => {
		const i = setInterval(() => {
			cachedBlockQueries = queryCache.findAll({
				queryKey: ['Block'],
			})
		}, 500)

		return () => {
			clearInterval(i)
		}
	})

	$: data = {
		groups: (
			networks.map(network => ({
				id: network.chainId,
				title: network.name,
				content: network.name,
			})),
		),

		items: (
			cachedBlockQueries
				?.filter(({
					queryKey: [_, {
						blockNumber,
						chainId
					}],
					state: {
						data,
						status,
					},
				}) => (
					status === 'success' && blockNumber && data
				))
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
					blockNumber,
					chainId,
					timestamp,
				}))
				.sort((a, b) => Number(a.timestamp - b.timestamp))
				.slice(-100)
				.map(({
					blockNumber,
					chainId,
					timestamp,
				}) => ({
					id: `${blockNumber}/${chainId}`,
					group: chainId,
					content: `
						<a href="/explorer/${networkByChainId.get(chainId).slug}/block/${blockNumber}">
							<img
								src="${getNetworkIcon(networkByChainId.get(chainId))}"
								width="16"
							/>

							${blockNumber}
						</a>
					`.trim(),
					start: new Date(Number(timestamp) * 1000),
					style: `
						background: color-mix(in lab, ${getNetworkColor(networkByChainId.get(chainId))} 20%, rgba(80, 80, 80, 0.75));
						display: flex;
						align-items: center;
						gap: 0.5em;
						width: auto;
						padding: 0.4em;
						line-height: 1;
						border: none;
						box-shadow: inset 0 0 0 calc(0.5px + 0.1em) rgba(var(--rgb-light-dark-inverse), 0.15);
						border-radius: 0.45em;
						font-size: 0.8em;
						font-family: var(--monospace-fonts);
					`,
				}))
		),
	}


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
		groupHeightMode: 'fixed',
		stack: false,
		stackSubgroups: false,
		timeAxis: {
			scale: 'second',
		},
		zoomMin: 1000,
		zoomMax: 16 * 1000,
		rollingMode: {
			follow: true,
			offset: 1.25,
		},
		zoomFriction: 10,
	}}
/>
