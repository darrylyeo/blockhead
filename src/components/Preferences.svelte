<script lang="ts">
	import { preferredAnalyticsProvider, preferredBaseCurrency, preferredEthereumProvider, preferredPriceFeedProvider } from '../data/ethereum/preferences'
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
		<span>Price Feed:</span>
		<select bind:value={$preferredPriceFeedProvider}>
			<option value="Chainlink">Chainlink</option>
			<option value="Tellor">Tellor</option>
			<option value="Open Price Feed">Compound Price Feed</option>
		</select>
	</label>

	<label>
		<span>Blockchain Provider:</span>
		<select bind:value={$preferredEthereumProvider}>
			<option value="Pocket Network">Pocket Network</option>
			<option value="Portis">Infura (Portis)</option>
		</select>
	</label>

	<label>
		<span>Analytics Provider:</span>
		<select bind:value={$preferredAnalyticsProvider}>
			<option value="Covalent">Covalent</option>
		</select>
	</label>

	<label>
		<span>Base Currency:</span>
		<select bind:value={$preferredBaseCurrency}>
			<optgroup label="Fiat Currencies">
				<option value="USD">US Dollar ($)</option>
				<option value="GBP">British Pound (£)</option>
				<option value="CAD">Canadian Dollar (CA$)</option>
				<option value="INR">Indian Rupee ()</option>
				<option value="EUR">Euro ()</option>
			</optgroup>
			<optgroup label="Cryptocurrencies">
				<option value="BTC">Bitcoin (BTC)</option>
				<option value="ETH">Ethereum (ETH)</option>
			</optgroup>
		</select>
	</label>
</div>