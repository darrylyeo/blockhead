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

	let provider: Writable<Ethereum.Provider> = getContext('provider')

	export let query: Writable<string> = getContext('query')
		
	export let initialQuery: string
	$: if(initialQuery)
		query.set(initialQuery)

	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)

	import EnsExplorer from '../../../components/EnsExplorer.svelte'
	import EthereumAccount from '../../../components/EthereumAccount.svelte'
	import EthereumBlock from '../../../components/EthereumBlock.svelte'
	import EthereumTransactionDetails from '../../../components/EthereumTransactionDetails.svelte'
</script>

<style>

</style>

{#if $query}
	{#if isAddress($query)}
		{#if $provider}
			<EthereumAccount address={$query} provider={$provider}/>
		{/if}
	{:else if isTransaction($query)}
		{#if $provider}
			<EthereumTransactionDetails transactionID={$query} provider={$provider}/>
		{/if}
	{:else if isBlockNumber($query)}
		{#if $provider}
			<EthereumBlock blockNumber={$query} provider={$provider}/>
		{/if}
	{:else}
		<EnsExplorer query={$query} />
	{/if}
{/if}