<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'


	// Inputs
	export let availableTokens: Ethereum.ERC20Token[] | undefined

	export let token: Ethereum.ERC20Token | undefined

	export let required = false


	// Components
	import Select from './Select.svelte'
	import TokenName from './TokenName.svelte'
</script>


<Select
	bind:value={token}
	items={(availableTokens ?? []).map(token => ({
		value: token,
		name: token.symbol,
		icon: token.icon,
	}))}
	{required}
	placeholder="Select..."
>
	<svelte:fragment slot="item" let:item>
		{@const token = item.value}

		<span>
			<TokenName {...token} />
		</span>
	</svelte:fragment>
</Select>


<style>
	span {
		font-size: 1.2em;
	}
</style>
