<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { query } = params
		return { initialQuery: query }
	}

	const isAddress = query => query.startsWith('0x')
	const isENS = query => query.match(/^.+\..+$/)
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store'
	import type { Ethereum } from '../../../data/ethereum/types'

	let provider: Writable<Ethereum.Provider> = getContext('provider')

	export let query: Writable<string> = getContext('query')
		
	export let initialQuery: string
	$: if(initialQuery)
		query.set(initialQuery)

	import Address from '../../../components/Address.svelte'
	import Balance from '../../../components/Balance.svelte'
	import EnsExplorer from '../../../components/EnsExplorer.svelte'
</script>

<style>

</style>

{#if $query}
	{#if isAddress($query)}
		{#if $provider}
			<div class="card">
				<h2><Address address={$query}/></h2>
				<Balance provider={$provider} address={$query} />
			</div>
		{/if}
	{:else if isENS($query)}
		<EnsExplorer domain={$query} />
	{/if}
{/if}