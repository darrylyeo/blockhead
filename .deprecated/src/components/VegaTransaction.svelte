<script lang="ts">
	import type { Vega } from '$/api/vega'
	import { makerAction, takerAction } from '$/api/vega'

	export let tx: Vega.Transaction

	const actions: Record<Vega.Side, string> = {
		SIDE_BUY: 'BUY',
		SIDE_SELL: 'SELL',
		NONE: 'TRADE'
	}

	const actionPreposition: Record<Vega.Side, string> = {
		SIDE_BUY: 'from',
		SIDE_SELL: 'to',
		NONE: 'with'
	}
	
	function sizeByVolume(size) {
		return 1 + size * 0.00025
		return 0.8 + Math.log2(size) * 0.15
	}
	
	function emojiForTransactionSize(size) {
		const m = Math.log2(size)
		if (m > 10) return '🐳' 
		if (m > 9) return '🦈'
		if (m > 8) return '🐬' 
		if (m > 7) return '🐡'
		if (m > 6) return '🐟'
		if (m > 5) return '🦐'
		return '🦠'
	}

	import Address from '$/src/components/Address.svelte'
	import TokenBalance from '$/src/components/TokenBalance.svelte'
	import TokenRate from '$/src/components/TokenRate.svelte'
</script>

<style>
	.card {
		--padding-inner: 2em;

		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr auto 1fr;
		gap: var(--padding-inner);
		align-items: center;
		padding: var(--padding-outer);
		
		font-size: 0.85em;
		font-weight: 300;

		position: relative;
	}
	.card > * {
		display: flex;
		flex-direction: column;
	}
	.maker {
		text-align: right;
	}
	.rate {
		text-align: center;
	}
	.rate :global(div) {
		font-size: 2em;
	}
	.taker {
		text-align: left;
	}

	/* .card:before {
		content: var(--emoji);

		position: absolute;
		inset: 0;
		display: flex;
		place-content: center;

		font-size: 2em;
		opacity: 0.5;
	} */

	.action-bought {
		color: var(--up-green);
	}
	.action-sold {
		color: var(--down-red);
	}
	.action-none {
		opacity: 0.7;
	}

	:global(.token-rate) {
		font-weight: 500;
	}
	:global(.address) {
		font-weight: 600;
	}
</style>

{#if tx}
	{#each [tx] as {market: {tradableInstrument: {instrument: {quoteName, baseName}}}, price, size, aggressor, takerId}}
	<div class="card" style="--emoji: '{emojiForTransactionSize(tx.size)}'">
		<div class="maker">
			{#each tx.trades as {id, size, makerId} (id)}
				<p>
					<Address address={makerId} format="middle-truncated" linked={false} />
					<span class="action-{makerAction[tx.aggressor]}">{makerAction[tx.aggressor]}</span>
					<span style="font-size: {sizeByVolume(size)}em">
						<TokenBalance
							token={{ symbol: quoteName }}
							balance={size}
						/>
					</span>
				</p>
			{/each}
		</div>
		<div class="rate">
			at
			<span>
				<TokenRate
					rate={price}
					quoteToken={{ symbol: quoteName }}
					baseToken={{ symbol: baseName }}
				/>
			</span>
			<!-- {actions[tx.aggressor]} -->
		</div>
		<div class="taker">
			<span>
				{actionPreposition[aggressor]}
				<Address address={takerId} format="middle-truncated" linked={false} />,
				who
				<span class="action-{takerAction[aggressor]}">{takerAction[aggressor]}</span>
			</span>
			<span>
				<span style="font-size: {sizeByVolume(size)}em">
					<TokenBalance
						token={{ symbol: quoteName }}
						balance={size}
					/>
				</span>
			</span>
		</div>
	</div>
	{/each}
{:else}
	<p>No trade</p>
{/if}