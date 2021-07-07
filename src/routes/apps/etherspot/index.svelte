<script lang="ts">
	import TransferAssets from '../../../components/TransferAssets.svelte'


	import { fly } from 'svelte/transition'
</script>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<div class="card">
		<div class="bar">
			<h3>Cross-Chain Transfer</h3>
			<div class="card-annotation">Etherspot</div>
		</div>

		<hr>

		<TransferAssets
			transferSolution="Etherspot"
		/>
	</div>
</section>