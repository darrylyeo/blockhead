<script>
	import TokenIcon from './TokenIcon.svelte';

	export let value = 0.0
	export let decimals = 3
	export let token = 'ETH'
</script>

<div>
	<TokenIcon {token} />
	<span>
		{value.toFixed(decimals)}
		{token}
	</span>
</div>

<style>
	div {
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: 0.33em;
	}
</style>