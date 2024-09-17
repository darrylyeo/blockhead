<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'


	// Context
	import { network as appsContextNetwork } from '$/routes/apps/_appsContext'

	import { preferences } from '$/state/preferences'
	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// <Web3AppDashboard> embed
	export let network: Ethereum.Network
	$: network = $$props.network ?? $appsContextNetwork


	// Internal state
	let showFormattedNames = true
	let showFormattedTokenSymbols = true


	// Components
	import MoxieAuctionsLoader from '../../MoxieAuctionsLoader.svelte'
	import MoxieAuctions from '../../MoxieAuctions.svelte'
	import MoxieOrdersLoader from '../../MoxieOrdersLoader.svelte'
	import MoxieOrders from '../../MoxieOrders.svelte'
</script>


<section class="column">
	<MoxieAuctionsLoader
		{network}
		{moxieProvider}
		let:auctions
		let:pagination
	>
		{#if auctions}
			<MoxieAuctions
				{network}
				{auctions}
				{moxieProvider}

				containerClass="card"
				isOpen
				headingLevel={4}
				{showFormattedNames}
				{showFormattedTokenSymbols}

				{pagination}
			>
				<svelte:fragment slot="title">
					Recent Fan Token Auctions
				</svelte:fragment>
			</MoxieAuctions>
		{/if}
	</MoxieAuctionsLoader>
</section>

<section class="column">
	<MoxieOrdersLoader
		{network}
		{moxieProvider}
		let:orders
		let:pagination
	>
		{#if orders}
			<MoxieOrders
				{network}
				{orders}
				{moxieProvider}

				containerClass="card"
				isOpen
				headingLevel={4}
				{showFormattedNames}
				{showFormattedTokenSymbols}

				{pagination}
			>
				<svelte:fragment slot="title">
					Recent Orders
				</svelte:fragment>
			</MoxieOrders>
		{/if}
	</MoxieOrdersLoader>
</section>

<footer class="sticky row">
	<span />

	<div role="toolbar" class="row">
		<label>
			<input type="checkbox" bind:checked={showFormattedNames} />
			<span>Format Names</span>
		</label>

		<label>
			<input type="checkbox" bind:checked={showFormattedTokenSymbols} />
			<span>Format Token Names</span>
		</label>
	</div>
</footer>
