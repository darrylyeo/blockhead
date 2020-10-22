<script lang="ts">
	import { getContext } from 'svelte'
	import type { EthereumProvider } from '../../../data/ethereum/provider'
	
	const provider = getContext('provider')
	
	import Loading from '../../../components/Loading.svelte'
</script>

{#await $provider?.getBlockNumber()}
	<Loading>Retrieving statistics...</Loading>
{:then blockNumber}
	<section class="card">
		<h3>Block Number</h3>
		<p>
			<span>The Ethereum blockchain is </span>
			<strong>{blockNumber}</strong>
			<span> blocks long.</span>
		</p>
	</section>
{:catch error}
	{error}
{/await}