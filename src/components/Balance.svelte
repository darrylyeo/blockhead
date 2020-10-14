<script lang="ts">
	import { getEthersJS } from '../data/ethereum/provider'
	import type { EthereumProvider } from '../data/ethereum/provider'

	let ethers
	getEthersJS().then(_ => ethers = _)

	export let provider: EthereumProvider
	export let address: string
	
	import Loading from './Loading.svelte'
	import TokenIcon from './TokenIcon.svelte'
    import TokenValue from './TokenValue.svelte'
    
    import { scale } from 'svelte/transition'
</script>

<div>
	{#if provider && address}
		{#await provider.getBalance(address)}
			<Loading>
				<span slot="spinner"><TokenIcon token="ETH" /></span>
				Reading balance...
			</Loading>
        {:then balance}
            <div transition:scale>
                <TokenValue token="ETH" value={ethers?.utils.formatEther(balance)} />
            </div>
		{:catch error}
			{error}
		{/await}
	{/if}
</div>
