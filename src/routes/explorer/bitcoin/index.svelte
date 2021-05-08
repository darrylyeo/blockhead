<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'


	const token = 'BTC'

	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')


	import OraclePrice from '../../../components/OraclePrice.svelte'
</script>

<style>
	.row {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.row > * {
		flex: 1 20rem;
		padding: var(--padding-outer);
	}
</style>

<div class="card">Bitcoin explorer coming soon!</div>

<hr>

<div class="row">
	<section class="card">
		<OraclePrice
			oracleProvider={$preferredPriceFeedProvider}
			{token}
			quoteCurrency={$preferredQuoteCurrency}
			provider={$ethereumProvider}
			network={$ethereumNetwork}
		/>
	</section>
</div>