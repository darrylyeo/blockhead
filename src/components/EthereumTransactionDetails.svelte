<script lang="ts">
	// import type { AnalyticsProvider } from '../data/analytics/provider'

	export let transactionID
	export let blockNumber

	export let fromAddress
	export let toAddress

	export let token = 'ETH'
	export let value
	export let valueQuote

	export let gasValue
	export let gasValueQuote

	export let quoteToken
	export let rate

	// export let provider: Ethereum.Provider
	// export let analyticsProvider: AnalyticsProvider

	function sizeByVolume(size) {
		return 1 + size * 0.0025
	}

	import Address from './Address.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenValue from './TokenValue.svelte'
</script>


<style>
	.transaction-details {
		--padding-inner: 0.5em;
		text-align: center;
	}
	.transaction-details > :global(.transaction) {
		font-size: 0.66em;
		justify-self: end;
	}

	.container {
		--padding-inner: 1em;

		display: grid;
		grid-auto-flow: column;
		gap: var(--padding-inner);
		align-items: center;

		font-weight: 300;

		position: relative;
	}
	.container > * {
		display: flex;
		flex-direction: column;
	}

	.value {
		font-size: 2em;
	}

	:global(.token-rate) {
		font-weight: 500;
	}
	:global(.address) {
		font-weight: 600;
	}
</style>

<div class="card transaction-details">
	<!-- <div class="bar">
		<h3><EthereumTransaction {transactionID} {blockNumber} /></h3>
		<span class="card-annotation">Ethereum Transaction</span>
	</div> -->
	<div class="container">
		<div class="sender">
			<span>
				<Address address={fromAddress} format="middle-truncated" />
			</span>
		</div>
		{#if value}
			<div>
				<span>sent</span>
				<span class="value" style="font-size: {sizeByVolume(valueQuote)}em">
					<TokenValue {value} {token} />
				</span>
				<span class="rate">
					(
					<TokenValue value={valueQuote} token={quoteToken} />
					at
					<TokenRate rate={rate} {quoteToken} baseToken={token} layout='horizontal'/>
					)
				</span>
			</div>
		{/if}
		<div class="receiver">
			<span>
				to
			</span>
			<span>
				<Address address={toAddress} format="middle-truncated" />
			</span>
		</div>
		<div class="fee">
			<span>
				for fee
			</span>
			<span>
				<TokenValue value={gasValue} {token} />
			</span>
			<span>
				(<TokenValue value={gasValueQuote} token={quoteToken} />)
			</span>
		</div>
	</div>
	<EthereumTransaction {transactionID} {blockNumber} />
</div>