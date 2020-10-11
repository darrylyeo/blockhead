<script>
	export let rate = 0.0
	export let quoteToken = 'BTC'
	export let baseToken = 'ETH'
	export let decimals = 3

	import TokenIcon from './TokenIcon.svelte';
</script>

<style>
	div {
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: 0.33em;

		align-self: baseline;
	}
</style>

<div>
	<!-- <TokenIcon token={quoteToken} /> -->
	<span>
		{rate.toFixed(decimals)}
		{quoteToken}
		<TokenIcon token={quoteToken} />
		/
		{baseToken}
		<TokenIcon token={baseToken} />
	</span>
</div>