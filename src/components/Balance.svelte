<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getEthersJS } from '../data/ethereum/ethers'

	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress

	let ethers
	getEthersJS().then(_ => ethers = _)

	export let provider: Ethereum.Provider
	export let address: string
	
	import Loading from './Loading.svelte'
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
		{#await provider.getBalance(address)}
			<Loading>
				<span slot="icon"><TokenIcon {token} {tokenAddress} /></span>
				Reading balance...
			</Loading>
		{:then balance}
			<div in:scale class="animation-wrapper">
				<TokenValue {token} value={ethers?.utils.formatEther(balance)} />
			</div>
		{:catch error}
			{error}
		{/await}
	{/if}
</div>
