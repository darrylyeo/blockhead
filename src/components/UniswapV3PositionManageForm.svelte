<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { UniswapV3 } from '../api/uniswap-v3/index'


	// Inputs
	export let network: Ethereum.Network
	export let position: UniswapV3.Position


	// Internal state
	let newToken0Amount: bigint = position.token0Amount
	let newToken1Amount: bigint = position.token1Amount


	// Components
	import Collapsible from './Collapsible.svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
</script>


<form class="card">
	<Collapsible
		type="label"
		class="column"
	>
		<h5 slot="title">Manage Position</h5>

		<hr>

		<section>
			<div class="with-icon-between">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span class="card-annotation">Token A</span>

					<TokenAmountSelect
						token={position.pool.token0}
						availableTokens={[position.pool.token0]}
						bind:amount={newToken0Amount}
					/>
				</label>

				<span class="icon" data-after="＋" />

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span class="card-annotation">Token B</span>

					<TokenAmountSelect
						token={position.pool.token1}
						availableTokens={[position.pool.token1]}
						bind:amount={newToken1Amount}
					/>
				</label>
			</div>
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
