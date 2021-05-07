<script lang="ts">
	import { Covalent } from '../data/analytics/covalent'
	import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '../data/currency/currency'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredEthereumProvider, preferredPriceFeedProvider } from '../data/ethereum/preferences'
</script>

<style>
	.preferences {
		font-size: 0.9em;
		--padding-inner: 1.25em;
	}
	label {
		/* display: grid;
		gap: 0.2em; */
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
	/* label span {
		font-size: 0.9em;
	} */
</style>

<div class="bar preferences">
	<h3>Preferences</h3>

	<!-- <label>
		<span>Analytics Provider:</span>
		<select bind:value={$preferredAnalyticsProvider}>
			<option value="Covalent">Covalent</option>
		</select>
	</label> -->

	<!-- <label>
		<span>Price Feed:</span>
		<select bind:value={$preferredPriceFeedProvider}>
			<option value="Chainlink">Chainlink</option> -->
			<!-- <option value="Tellor">Tellor</option>
			<option value="Open Price Feed">Compound Price Feed</option> -->
		<!-- </select>
	</label> -->

	<!-- <label>
		<span>Blockchain Provider:</span>
		<select bind:value={$preferredEthereumProvider}>
			<option value="Pocket Network">Pocket Network</option>
			<option value="Portis">Infura (Portis)</option>
		</select>
	</label> -->

	<label>
		<span>Quote Currency:</span>
		<select bind:value={$preferredQuoteCurrency}>
			<optgroup label="Fiat Currencies">
				{#each Object.values(fiatQuoteCurrencies) as currency}
					<option value={currency.isoCode}>{currency.name} ({currency.symbol})</option>
					<!-- disabled={!Covalent.quoteCurrencies.includes(currency.isoCode)} -->
				{/each}
			</optgroup>
			<optgroup label="Cryptocurrencies">
				{#each Object.values(cryptoQuoteCurrencies) as currency}
					<option value={currency.isoCode}>{currency.name} ({currency.symbol})</option>
					<!-- disabled={!Covalent.quoteCurrencies.includes(currency.isoCode)} -->
				{/each}
			</optgroup>
		</select>
	</label>
</div>