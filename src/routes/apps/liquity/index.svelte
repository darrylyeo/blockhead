<script lang="ts">
	import { defiAppsBySlug } from '../../../data/ethereum/defi-apps'


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


	import { cardStyle } from '../../../utils/card-background'
	import { fly } from 'svelte/transition'
</script>


<style>
	iframe {
		width: 90vw;
		height: 80vh;
		justify-self: center;
		border-radius: 0.5em;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<div class="card" style={cardStyle(defiAppsBySlug['liquity'].colors)}>
		<div class="bar">
			<h3>Liquity Frontend</h3>

			<select bind:value={src}>
				{#each Object.entries(liquityFrontends) as [name, url]}
					<option value={url}>{name} ({url.replace('https://', '')})</option>
				{/each}
			</select>
		</div>

		<hr>

		<iframe
			title="Liquity Frontend"
			{src}
		/>
	</div>
</section>