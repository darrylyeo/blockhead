<script>
	export let value = 0.0
	export let token = 'ETH'
	export let decimals = 3

	const formatValue = value =>
		typeof value === 'number' ? value.toFixed(decimals) :
		typeof value === 'string' ? value :
		value.toString()
	
	import TokenIcon from './TokenIcon.svelte'
</script>

<style>
	div {
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: var(--padding-inner);

		line-height: 1;
		align-self: baseline;
	}

	div {
		--padding-inner: 0.33em;
	}

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
</style>

<div>
	<TokenIcon {token} />
	<span>
		{formatValue(value)}
		<span class="token-name">{token}</span>
	</span>
</div>