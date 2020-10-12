<script>
	export let value = 0.0
	export let token = 'ETH'
	export let decimals = 3
	
	import TokenIcon from './TokenIcon.svelte';
</script>

<style>
	div {
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: var(--inner-padding);

		line-height: 1;
		align-self: baseline;
	}

	div {
		--inner-padding: 0.33em;
	}

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
</style>

<div>
	<TokenIcon {token} />
	<span>
		{value.toFixed(decimals)}
		<span class="token-name">{token}</span>
	</span>
</div>