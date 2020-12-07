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
		return 1 //+ size * 0.00025
	}

	import Address from './Address.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenValue from './TokenValue.svelte'
</script>


<style>
	.transaction-details {
		--padding-inner: 0.5em;
	}
	.transaction-details > :global(.transaction) {
		font-size: 0.66em;
		justify-self: end;
	}

	.container {
		--padding-inner: 2em;

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr auto 1fr;
		gap: var(--padding-inner);
		align-items: center;
		padding: var(--padding-outer);
		
		font-size: 0.85em;
		font-weight: 300;

		position: relative;
	}
	.container > * {
		display: flex;
		flex-direction: column;
	}
	.sender {
		text-align: right;
	}
	.rate {
		text-align: center;
	}
	.rate :global(div) {
		font-size: 2em;
	}
	.receiver {
		text-align: left;
	}

	/* .card:before {
		content: var(--emoji);

		position: absolute;
		inset: 0;
		display: flex;
		place-content: center;

		font-size: 2em;
		opacity: 0.5;
	} */

	.action-bought {
		color: var(--up-green);
	}
	.action-sold {
		color: var(--down-red);
	}
	.action-none {
		opacity: 0.7;
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
			<p>
				<Address address={fromAddress} format="middle-truncated" />
				<span>sent</span>
				<span style="font-size: {sizeByVolume(value)}em">
					<TokenValue {value} {token} />
					(<TokenValue value={valueQuote} token={quoteToken} />)
				</span>
			</p>
		</div>
		<div class="rate">
			at
			<span>
				<TokenRate rate={rate} {quoteToken} baseToken={token} />
			</span>
			<!-- {actions[tx.aggressor]} -->
		</div>
		<div class="receiver">
			<span>
				to
				<Address address={toAddress} format="middle-truncated" />
			</span>
		</div>
		<div class="fee">
			<span>
				with a fee of
				<TokenValue value={gasValue} {token} />
				(<TokenValue value={gasValueQuote} token={quoteToken} />)
			</span>
		</div>
	</div>
	<EthereumTransaction {transactionID} {blockNumber} />
</div>