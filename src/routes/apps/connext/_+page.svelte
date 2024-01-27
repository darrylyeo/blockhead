<script lang="ts">
	import { web3AppsBySlug } from '$/data/web3Apps'


	import TransferAssets from '$/components/TransferAssets.svelte'


	import { cardStyle } from '$/utils/card-background'
	import { fly } from 'svelte/transition'
</script>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<div class="card" style={cardStyle(web3AppsBySlug['connext'].colors)}>
		<div class="bar">
			<h3>Cross-Chain Transfer</h3>
			<div class="card-annotation">Connext</div>
		</div>

		<hr>

		<TransferAssets
			transferSolution="Connext"
		/>
	</div>
</section>