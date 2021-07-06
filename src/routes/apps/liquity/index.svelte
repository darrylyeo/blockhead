<script lang="ts">
	// import { Decimal, Fees, LiquityStore, LQTYStake, StabilityDeposit, TransactionFailedError, Trove, TroveWithPendingRedistribution, UserTrove } from '@liquity/lib-base'
	// import { BlockPolledLiquityStore, EthersLiquity, EthersTransactionCancelledError, EthersTransactionFailedError, PopulatableEthersLiquity, PopulatedEthersLiquityTransaction, PopulatedEthersRedemption, ReadableEthersLiquity, SendableEthersLiquity } from '@liquity/lib-ethers'


	const liquityFrontends = {
		'LiquityFi': 'https://eth.liquity.fi',
		'Liquity.App': 'https://liquity.app',
		'Lusd.eth.link': 'https://lusd.eth.link',
		'Liquity Land': 'https://liquityland.com',
		'LiquityApp': 'https://liquityapp.com',
	}


	let src
</script>


<style>
	iframe {
		width: 90vw;
		height: 100%;
		max-height: 80vh;
		justify-self: center;
		border-radius: 0.5em;
	}
</style>


<div class="column">
	<div class="bar">
		<h3>Liquity Frontend</h3>

		<select bind:value={src}>
			{#each Object.entries(liquityFrontends) as [name, url]}
				<option value={url}>{name} ({url.replace('https://', '')})</option>
			{/each}
		</select>
	</div>

	<iframe
		title="Liquity Frontend"
		{src}
	/>
</div>