<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { query } = params
		return { initialQuery: query }
	}
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store'
	import type { Ethereum } from '../../../data/ethereum/types'
	import type { AnalyticsProvider } from '../../../data/analytics/provider'

	const explorerNetwork: Writable<Ethereum.Network> = getContext('explorerNetwork')
	const provider: Writable<Ethereum.Provider> = getContext('ethereumProvider')
	const analyticsProvider: Writable<AnalyticsProvider> = getContext('analyticsProvider')

	export let query: Writable<string> = getContext('query')
		
	export let initialQuery: string
	$: if(initialQuery)
		query.set(initialQuery)

	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)

	import EnsQuery from '../../../components/EnsQuery.svelte'
	import EthereumAccount from '../../../components/EthereumAccount.svelte'
	import EthereumBlock from '../../../components/EthereumBlock.svelte'
	import EthereumTransaction from '../../../components/EthereumTransaction.svelte'
</script>

<style>

</style>

{#if $query}
	{#if isAddress($query)}
		{#if $provider}
			<EthereumAccount network={$explorerNetwork} address={$query} provider={$provider}/>
		{/if}
	{:else if isTransaction($query)}
		{#if $provider}
			<EthereumTransaction network={$explorerNetwork} layout="standalone" transactionID={$query} />
			<!-- <EthereumTransaction network={$explorerNetwork} transactionID={$query} provider={$provider}/> -->
			<!-- <EthereumTransaction network={$explorerNetwork} transactionID={$query} analyticsProvider={$analyticsProvider}/> -->
		{/if}
	{:else if isBlockNumber($query)}
		{#if $provider}
			<EthereumBlock network={$explorerNetwork} blockNumber={$query} provider={$provider} analyticsProvider={$analyticsProvider}/>
		{/if}
	{:else}
		<EnsQuery network={$explorerNetwork} query={$query} />
	{/if}
{/if}