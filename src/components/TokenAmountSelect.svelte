<script lang="ts">
	// Types
	import type { Ethereum } from '../data/networks/types'


	// External state
	export let availableTokens: Ethereum.ERC20Token[]

	export let token: Ethereum.ERC20Token | undefined
	export let amount: bigint

	export let min: bigint | undefined
	export let max: bigint | undefined
	export let stepDecimals = token?.decimals // 3

	export let autoFallback = false
	export let required = false


	// Components
	import BigNumberInput from './BigNumberInput.svelte'
	import TokenSelect from './TokenSelect.svelte'
</script>


<style>
	.row {
		grid-template-columns: 1fr auto;
		--grid-gap: 1em;
	}

	.max {
		justify-self: end;
		align-self: center;
		margin-right: .5rem;
	}
</style>


<div class="row">
	<BigNumberInput
		bind:value={amount}
		{min}
		{max}
		{required}
	/>

	<TokenSelect
		bind:token
		{availableTokens}
		{autoFallback}
		{required}
	/>
</div>
