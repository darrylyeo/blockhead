<script lang="ts">
	import { onMount } from 'svelte'
	
	let isMounted = false
	onMount(async () => {
		isMounted = true
		// await import('aframe')
	})
	import { tokenColors } from '../data/token-colors'
	import { getLocalAccounts, getEthersAccounts } from '../data/ethereum/accounts'
	import { getChainlinkPriceFeed } from '../data/ethereum/price/chainlink'
	const islands = {
		ETH: {
			name: 'The Ether',
			symbol: 'ETH',
			color: tokenColors['ETH'],
			accounts: getLocalAccounts(),
			price: 5
			// price: getChainlinkPriceFeed()
		},
		BTC: {
			name: 'Bitcoin Isle',
			symbol: 'BTC',
			color: tokenColors['BTC'],
			accounts: [],
			// price: getChainlinkPriceFeed()
		}
	}
	const trades = []
	let view: 'portfolio' | 'trade' | 'address' | 'transaction' = 'portfolio'
</script>


{#if isMounted}
	<a-scene>
		<a-entity id="rig" position="25 10 0">
			<a-camera id="camera"></a-camera>
		</a-entity>
		<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
		<a-sky color="#ECECEC"></a-sky>
	</a-scene>

	<a-scene>
		<!-- <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
		<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere> -->

		{#each Object.values(islands) as island, i}
			<a-cylinder position="{i} 0.75 -3" radius="0.5" height={island.price} color="var(--ethereum-blue)">
				<a-text value={island.name}></a-text>
			</a-cylinder>
			<!-- {#each island.$accounts as account}
				<a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
			{/each} -->
		{/each}

		{#if view === 'portfolio'}
			<a-entity id="rig" position="25 10 0">
				<a-camera id="camera"></a-camera>
			</a-entity>
		{:else if view === 'trade'}
			<!-- <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box> -->
			{#each trades as trade}
				<a-text value={trade.from.size}></a-text>
				<!-- <a-text value={trade.$price.price}></a-text> -->
				<a-text value={trade.to.size}></a-text>
			{/each}
		{:else if view === 'address'}
		{:else if view === 'transaction'}
		{/if}
		<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
		<a-sky color="#00000020"></a-sky>
	</a-scene>
{/if} 