<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getEthersJS } from '../data/ethereum/ethers'

	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress

	let ethers
	getEthersJS().then(_ => ethers = _)

	export let provider: Ethereum.Provider
	export let address: string
	
	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenValue from './TokenValue.svelte'
	
	import { scale } from 'svelte/transition'
</script>

<style>
	.animation-wrapper {
		display: flex;
	}
</style>

<div class="stack">
	{#if provider && address}
		<Loader
			fromPromise={() => provider.getBalance(address)}
			loadingMessage="Reading balance..."
		>
			<svelte:fragment slot="loadingIcon"><TokenIcon {token} {tokenAddress} /></svelte:fragment>
			<div in:scale class="animation-wrapper" let:then={balance}>
				<TokenValue {token} value={ethers?.utils.formatEther(balance)} />
			</div>
		</Loader>
	{/if}
</div>
