<script lang="ts">
	import { erc20Tokens, erc20TokensBySymbol, type ERC20Token } from '$lib/tokens'


	export let availableTokens: ERC20Token[] = erc20Tokens

	export let token: ERC20Token = erc20TokensBySymbol['DAI']

	export let autoFallback = false
	export let required = false


	import Select from '../components/Select.svelte'
    import Icon from './Icon.svelte'


	import { scale } from 'svelte/transition'
</script>


<Select
	bind:value={token}
	values={availableTokens ?? []}
	{autoFallback}
	{required}

	let:value
>
	<!-- <div class="stack">
		{#key value}
			<div class="row" transition:scale> -->
				<img src={value?.icon} alt={value?.symbol} />
                <!-- <Icon {token} /> -->
                <!-- <Icon icon={value?.icon} /> -->
				{value?.symbol}
			<!-- </div>
		{/key}
	</div> -->
</Select>


<style>
	/* .row {
		--grid-gap: 0.66em;
	} */
	/* img {
		width: 1em;
		height: 1em;
	} */
</style>
