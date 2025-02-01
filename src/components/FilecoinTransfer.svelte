<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	import { FilecoinTransactionProvider } from '$/data/filecoinTransactionProviders'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transfer: Filecoin.Transfer
	export let filecoinTransactionProvider: FilecoinTransactionProvider

	// (View options)
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'summary'
	export let layout: 'default' | 'inline' | undefined = 'default'
	export let title = Filecoin.transferTypes[transfer.type]?.label ?? transfer.type
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let isOpen = true


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte';
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TransactionId from './TransactionId.svelte'
</script>


<article
	class:card={layout !== 'inline'}
>
	<Collapsible
		type="label"
		showContentsOnly={layout === 'inline'}
		bind:isOpen
	>
		<svelte:fragment slot="title">
			<slot name="title">
				<span class="row inline wrap">
					<svelte:element this={`h${headingLevel}`}>
						{title}
					</svelte:element>
				</span>
			</slot>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				{network.name} Transfer
				({Filecoin.transferTypes[transfer.type]?.label ?? transfer.type})
			</span>
		</svelte:fragment>

		<section class="summary row wrap">
			{#if transfer.fromActor}
				<AddressWithLabel
					{network}
					address={transfer.fromActor.shortAddress ?? transfer.fromActor.robustAddress}
					label={transfer.labels?.fromActor?.label}
					format="address-label"
					addressFormat="middle-truncated"
				/>
			{/if}

			<span>
				<span>
					{#if transfer.transaction && 'receipt' in transfer.transaction && transfer.transaction.receipt === undefined}
						will send
					{:else if transfer.transaction?.receipt?.exitCode === 1}
						failed to send
					{:else}
						sent
					{/if}
				</span>

				<TokenBalanceWithConversion
					{tokenBalanceFormat}
					showDecimalPlaces={detailLevel === 'exhaustive' ? 9 : 6}
					token={{
						chainId: network.chainId,
						...network.nativeCurrency,
					}}
					balance={transfer.value}
				/>
			</span>

			<span>
				<span>to</span>

				{#if transfer.toActor}
					<AddressWithLabel
						{network}
						address={transfer.toActor.shortAddress ?? transfer.toActor.robustAddress}
						label={transfer.labels?.toActor?.label}
						format="address-label"
						addressFormat="middle-truncated"
					/>
				{/if}
			</span>

			{#if detailLevel === 'summary' || layout === 'inline'}
				{#if transfer.tipset?.timestamp}
					<small>
						<DateTime
							date={transfer.tipset.timestamp}
						/>
					</small>
				{/if}

				{#if transfer.type && layout === 'inline'}
					<span class="card-annotation">{Filecoin.transferTypes[transfer.type]?.label ?? transfer.type}</span>
				{/if}
			{/if}
		</section>

		{#if layout === 'default' && detailLevel === 'exhaustive'}
			<hr>

			<footer class="footer row">
				{#if transfer.transaction?.cid}
					at
					transaction
					<TransactionId
						{network}
						transactionId={transfer.transaction.cid}
					/>
				{/if}
				
				{#if transfer.tipset?.number}
					<span class="row">
						in

						<BlockNumber
							{network}
							blockNumber={transfer.tipset.number}
						/>
					</span>
				{/if}

				{#if transfer.tipset?.timestamp}
					<DateTime
						date={transfer.tipset.timestamp}
					/>
				{/if}
			</footer>
		{/if}
	</Collapsible>
</article>
