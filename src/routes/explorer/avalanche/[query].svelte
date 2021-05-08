<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { query } = params
		return { initialQuery: query }
	}
</script>

<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'

	const explorerNetwork: SvelteStore<Ethereum.Network> = getContext('explorerNetwork')
	const explorerProvider: SvelteStore<Ethereum.Provider> = getContext('explorerProvider')


	import { preferredAnalyticsProvider } from '../../../data/ethereum/preferences'
	$: analyticsProvider = $preferredAnalyticsProvider

	
	export let query: SvelteStore<string> = getContext('query')
		
	export let initialQuery: string
	$: if(initialQuery)
		query.set(initialQuery)


	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)


	import EthereumAccount from '../../../components/EthereumAccount.svelte'
	import EthereumBlock from '../../../components/EthereumBlock.svelte'
	import EthereumTransaction from '../../../components/EthereumTransaction.svelte'
</script>

{#if $query}
	{#if isAddress($query)}
		{#if $explorerProvider}
			<EthereumAccount network={$explorerNetwork} address={$query} provider={$explorerProvider}/>
		{/if}
	{:else if isTransaction($query)}
		{#if $explorerProvider}
			<EthereumTransaction network={$explorerNetwork} layout="standalone" transactionID={$query} />
			<!-- <EthereumTransaction network={$explorerNetwork} transactionID={$query} provider={$provider}/> -->
			<!-- <EthereumTransaction network={$explorerNetwork} transactionID={$query} analyticsProvider={analyticsProvider}/> -->
		{/if}
	{:else if isBlockNumber($query)}
		{#if $explorerProvider}
			<EthereumBlock network={$explorerNetwork} blockNumber={$query} provider={$explorerProvider} {analyticsProvider}/>
		{/if}
	{:else}
		<div class="card">avvy.domains resolution coming soon!</div>
	{/if}
{/if}