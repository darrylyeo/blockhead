<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import { UniswapV3 } from '$/api/uniswap-v3/index'


	// Inputs
	export let address: Ethereum.Address
	export let network: Ethereum.Network
	export let availableTokens: Ethereum.ERC20Token[]


	// Internal state
	let pool: Partial<UniswapV3.Pool> = {
		token0: availableTokens?.[0],
		token1: availableTokens?.[1],
		fee: UniswapV3.FeeAmount.MEDIUM,
	}

	let position: Partial<UniswapV3.Position> = {
		pool: pool as UniswapV3.Pool,
		token0Amount: 0n,
		token1Amount: 0n,
		tickLower: 0n,
		tickUpper: 0n,
	}

	let priceConversion = {
		priceLower: 0n,
		priceUpper: 0n,
	}


	// Functions
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


	// Components
	import BigNumberInput from './BigNumberInput.svelte'
	import Collapsible from './Collapsible.svelte'
	import TokenAmountSelect from './TokenAmountSelect.svelte'
</script>


<form class="card">
	<Collapsible
		type="label"
		class="column"
	>
		<h4 slot="title">Add Liquidity</h4>

		<hr>

		<section class="column">
			<header>
				<h5>Pool / Deposit Amounts</h5>
			</header>

			<div class="with-icon-between">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span class="card-annotation">Token A</span>

					<TokenAmountSelect
						bind:token={pool.token0}
						{availableTokens}
					/>
				</label>

				<span class="icon" data-after="＋" />

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span class="card-annotation">Token B</span>

					<TokenAmountSelect
						bind:token={pool.token1}
						{availableTokens}
					/>
				</label>
			</div>

			<div class="row align-center">
				<label>
					<span class="card-annotation">Fee</span>

					<select bind:value={pool.fee}>
						{#each Object.entries(UniswapV3.FeeAmount) as [label, fee]}
							<option value={fee}>
								{formatIdentifierToWords(label, true)} ({UniswapV3.formatFeeAmount(fee)})
							</option>
						{/each}
					</select>
				</label>
			</div>
		</section>

		<hr>

		<section>
			<header>
				<h5>Range</h5>
			</header>

			<div class="with-icon-between">
				<div class="row">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label>
						<span class="card-annotation">Low price</span>

						<BigNumberInput
							bind:value={priceConversion.priceLower}
						/>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="tick-input">
						<span class="card-annotation">Tick</span>

						<BigNumberInput
							bind:value={position.tickLower}
						/>
					</label>
				</div>

				<span class="icon" data-after="↔︎" />

				<div class="row">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label>
						<span class="card-annotation">High price</span>

						<BigNumberInput
							bind:value={priceConversion.priceUpper}
						/>
					</label>

					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="tick-input">
						<span class="card-annotation">Tick</span>

						<BigNumberInput
							bind:value={position.tickUpper}
						/>
					</label>
				</div>
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


	.tick-input {
		width: 12ch;
	}

	@media (min-width: 60rem) {
		header {
			position: absolute;
		}
	}
</style>
