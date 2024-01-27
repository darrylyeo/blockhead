<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { UniswapV3 } from '$/api/uniswap-v3/index'


	// Inputs
	export let network: Ethereum.Network
	export let availableTokens: Ethereum.ERC20Token[] | undefined


	// Internal state
	let fromToken: Ethereum.ERC20Token | undefined = availableTokens?.[0]
	let toToken: Ethereum.ERC20Token | undefined = availableTokens?.[1]


	// Components
	import Collapsible from './Collapsible.svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
</script>


<form class="card">
	<Collapsible
		type="label"
		class="column"
	>
		<h4 slot="title">Swap</h4>

		<hr>

		<section class="with-icon-between">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				<span class="card-annotation">Pay</span>

				<TokenAmountSelect
					bind:token={fromToken}
					{availableTokens}
				/>
			</label>

			<span class="icon" data-after="⇄" />

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				<span class="card-annotation">Receive</span>

				<TokenAmountSelect
					bind:token={toToken}
					{availableTokens}
				/>
			</label>
		</section>
	</Collapsible>
</form>


<style>
	.with-icon-between {
		display: flex;
		place-items: center;
		margin: 0 auto;
		gap: 1.25rem 1.25rem;
	}
	.with-icon-between > label {
		flex: 1;
		display: grid;
		gap: 0.25rem 0.5rem;
	}

	.with-icon-between .icon {
		flex: 0 auto;

		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;

		background-color: var(--card-background-color);
		border-radius: 50%;
	}
	.with-icon-between .icon:after {
		font-size: 1.75em;
	}

	@media (min-width: 50rem) {
		.with-icon-between {
			padding-bottom: 0.75rem;
		}
		.with-icon-between .icon {
			translate: 0 0.5rem;
		}
	}

	@media (max-width: 50rem) {
		.with-icon-between {
			flex-direction: column;
		}

		.with-icon-between .icon {
			rotate: 0.25turn;
		}
	}

	@media (min-width: 25rem) and (max-width: 50rem) {
		.with-icon-between > label {
			grid-auto-flow: column;
			align-items: center;
			text-align: end;
		}
		.with-icon-between > label > span {
			min-width: 9ch;
		}
	}
</style>
