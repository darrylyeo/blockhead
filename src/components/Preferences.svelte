<script lang="ts">
	import { Covalent } from '../data/analytics/covalent'
	import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '../data/currency/currency'
	import { preferredColorScheme, preferredAnalyticsProvider, preferredOracleProvider, preferredEthereumProvider, preferredDeFiProvider, preferredTransactionProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let showDefiProvider = false
	export let showTransactionProvider = false


	import { scale } from 'svelte/transition'
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

	<label>
		<span>Theme:</span>
		<select bind:value={$preferredColorScheme}>
			<option value="auto">Auto</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>

	<!-- <label>
		<span>Historical Data Provider:</span>
		<select bind:value={$preferredAnalyticsProvider}>
			<option value="Covalent">Covalent</option>
			<option value="Moralis">Moralis</option>
		</select>
	</label> -->

	<!-- <label>
		<span>Price Feed:</span>
		<select bind:value={$preferredOracleProvider}>
			<option value="Chainlink">Chainlink</option> -->
			<!-- <option value="Tellor">Tellor</option>
			<option value="Open Price Feed">Compound Price Feed</option> -->
		<!-- </select>
	</label> -->

	<label>
		<span>Blockchain Provider:</span>
		<select bind:value={$preferredEthereumProvider}>
			<option value="Ethers">Ethers Quorum</option><!-- (Infura + Etherscan + Alchemy + Pocket) -->
			<option value="Pocket Network">Pocket Network</option>
			<option value="Alchemy">Alchemy</option>
			<option value="Infura">Infura</option>
			<option value="Moralis">Moralis</option>
			<option value="Etherscan">Etherscan</option>
			<option value="Portis">Infura (Portis)</option>
		</select>
	</label>

	{#if showDefiProvider}
		<label transition:scale>
			<span>DeFi Provider:</span>
			<select bind:value={$preferredDeFiProvider}>
				<option value="Zapper">Zapper</option>
				<option value="Zerion DeFi SDK">Zerion DeFi SDK</option>
				<!-- <option value="Covalent">Covalent</option> -->
			</select>
		</label>
	{/if}

	{#if showTransactionProvider}
		<label transition:scale>
			<span>Transaction Provider:</span>
			<select bind:value={$preferredTransactionProvider}>
				<option value="Covalent">Covalent</option>
				<option value="Etherspot">Etherspot</option>
			</select>
		</label>
	{/if}

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