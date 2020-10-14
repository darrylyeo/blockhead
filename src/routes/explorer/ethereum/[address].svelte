<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { address } = params
		return {initialAddress: address}
	}
</script>

<script lang="ts">
	import { getEthersJS } from '../../../data/ethereum/provider'
	import type { EthereumProvider } from '../../../data/ethereum/provider'

	let ethers
	getEthersJS().then(_ => ethers = _)

	// export let provider: EthereumProvider = undefined
	let provider: SvelteStore<EthereumProvider> = getContext('provider')

	// export let address

	export let initialAddress
	export let address: SvelteStore<string> = getContext('address')
	
	$: if(initialAddress)
		address.set(initialAddress)

	$: console.log('$address', $address)

	// let balance
	// $: if(address)
	// 	$provider?.getBalance(address).then(_ => balance = _)

	import Loading from '../../../components/Loading.svelte'
	import TokenIcon from '../../../components/TokenIcon.svelte'
	import TokenValue from '../../../components/TokenValue.svelte'
	// import Portfolio from '../../../components/Portfolio.svelte'
</script>

<style>

</style>

<div>
	<!-- <Portfolio {address} /> -->
	{#if $address}
		{#await $provider?.getBalance($address).catch(console.error)}
			<Loading>
				<span slot="spinner"><TokenIcon token="ETH" /></span>
				Reading balance...
			</Loading>
		{:then balance} 
			<TokenValue token="ETH" value={ethers?.utils.formatEther(balance)} />
		{/await}
	{/if}

	<!-- {#each balances as balance} -->
		<!-- <TokenValue token="BTC" /> -->
	<!-- {/each} -->
</div>
