<script lang="ts">
	// Types/constants
	import type { QuoteCurrency } from '$/data/currencies'
	import { quoteCurrencies } from '$/data/currencies'


	// Inputs
	export let type: 'select' | 'checkboxes' = 'select'
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'

	// (Derived)
	$: symbol = quoteCurrencies[quoteCurrency]?.symbol ?? quoteCurrency
</script>


{#if type ==='select'}
	<select bind:value={tokenBalanceFormat}>
		<option value="original">Amount</option>
		<option value="converted">Value ({symbol})</option>
		<option value="both">Amount + Value ({symbol})</option>
		<!-- <option value="original">Balances</option>
		<option value="converted">Quotes</option>
		<option value="both">Balances + Quotes</option> -->
		<!-- <option value="original">Token Amounts</option>
		<option value="converted">Quote Values</option>
		<option value="both">Amounts and Values</option> -->
	</select>
{:else if type === 'checkboxes'}
	<label>
		<input
			type="checkbox"
			checked={tokenBalanceFormat === 'original' || tokenBalanceFormat === 'both'}
			on:change={e =>
				tokenBalanceFormat = e.target.checked
					? {
						'converted': 'both',
						'both': 'original',
					}[tokenBalanceFormat]
					: 'converted'
			}
		/>
		<span>Amounts</span>
	</label>

	<label>
		<input
			type="checkbox"
			checked={tokenBalanceFormat === 'converted' || tokenBalanceFormat === 'both'}
			on:change={e =>
				tokenBalanceFormat = e.target.checked
					? {
						'original': 'both',
						'both': 'converted',
					}[tokenBalanceFormat]
					: 'original'
			}
		/>
		<span>{symbol}</span>
	</label>
{/if}