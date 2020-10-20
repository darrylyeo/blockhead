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
	import type { EthereumProvider } from '../../../data/ethereum/provider'

	let provider: SvelteStore<EthereumProvider> = getContext('provider')

	export let initialQuery
	export let query: SvelteStore<string> = getContext('query')

	$: if(initialQuery)
		query.set(initialQuery)

	import Balance from '../../../components/Balance.svelte'
	import EnsExplorer from '../../../components/EnsExplorer.svelte'
</script>

<style>

</style>

<div>
	{#if $query}
		{#if isAddress($query)}
			{#if $provider}
				<Balance provider={$provider} address={$query} />
			{/if}
		{:else if isENS($query)}
			<EnsExplorer domain={$query} />
		{/if}
	{/if}
</div>
