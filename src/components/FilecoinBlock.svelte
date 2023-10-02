<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { Filecoin } from '../data/filecoin'
	import { networksBySlug } from '../data/networks'
	
	
	// Inputs
	export let network: Ethereum.Network = networksBySlug['filecoin']
	export let block: Filecoin.Block
	// (View options)
	export let isOpen: boolean
	
	
	// Components
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	class="column"
>
	<svelte:fragment slot="title">
		<div class="row wrap">
			<h4>
				<FilecoinBlockCid blockCid={block.id} format="middle-truncated" />
			</h4>

			<!-- <span>
				mined by
				<Address address={block.minerAddress} />
			</span> -->
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{network.name} Block
		</span>
	</svelte:fragment>
	
	<hr>

	<span>
		mined by
		<Address {network} address={block.minerAddress} />
	</span>

	{#if block.transactions?.length}	
		<hr>

		<section>
			<FilecoinTransactions
				transactions={block.transactions}
			/>
		</section>
	{/if}
</Collapsible>
