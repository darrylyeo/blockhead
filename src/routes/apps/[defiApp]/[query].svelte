<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { query } = params
		return { initialQuery: query }
	}
</script>

<script lang="ts">
	// import type { Ethereum } from '../../../data/ethereum/types'
	// import type { DefiAppConfig } from '../../../data/ethereum/defi-apps'
	// import { networksByChainID } from '../../../data/ethereum/networks'
	// import { getEthersProvider } from '../../../data/ethereum/provider'


	// const defiAppConfig: SvelteStore<DefiAppConfig> = getContext('defiAppConfig')


	// import { preferredDeFiProvider, preferredEthereumProvider, preferredQuoteCurrency } from '../../../data/ethereum/preferences'


	import type { Writable } from 'svelte/store'

	export let query = getContext<Writable<string>>('query')

	export let initialQuery: string
	$: if(initialQuery)
		$query = initialQuery


	// let showValues
	// let showUnderlyingAssets


	// const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	// const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	// const isBlockNumber = query => /^[0-9]+$/i.test(query)


	// import DefiAppDashboard from '../../../components/DefiAppDashboard.svelte'
</script>


<!-- <style>
	.options {
		position: sticky;
		bottom: 0;

		z-index: 1;

		font-size: 0.8em;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	.column {
		display: grid;
		align-items: start;
		grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
	}
</style>


{#if $defiAppConfig && $query}
	{#if isAddress($query)}
		<div class="column">
			<DefiAppDashboard
				address={$query}
				defiAppConfig={$defiAppConfig}
				providerName={$preferredEthereumProvider}
				defiProvider={$preferredDeFiProvider}
				quoteCurrency={$preferredQuoteCurrency}
				{showValues}
				{showUnderlyingAssets}
			/>
		</div>
	{:else}
		<div class="card">
			"{$query}" is not a valid address. ENS names will be supported soon!
		</div>
	{/if}


	<div class="card bar options">
		<div class="row">
			<h3>Show</h3>
			<label>
				<select bind:value={showValues}>
					<option value="original">Balances</option>
					<option value="converted">Quotes</option>
					<option value="both">Balances + Quotes</option>
				</select>
			</label>
			<label>
				<input type="checkbox" bind:checked={showUnderlyingAssets}>
				<span>Underlying Assets</span>
			</label>
		</div>
	</div>
{/if} -->