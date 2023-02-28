<script lang="ts">
	import type { QuoteCurrency } from '../data/currencies'


	import { fiatQuoteCurrencies } from '../data/currencies'


	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let quoteCurrency: QuoteCurrency
</script>


<select bind:value={tokenBalanceFormat}>
	<option value="original">Amount</option>
	<option value="converted">Value ({fiatQuoteCurrencies[quoteCurrency].symbol})</option>
	<option value="both">Amount + Value ({fiatQuoteCurrencies[quoteCurrency].symbol})</option>
	<!-- <option value="original">Balances</option>
	<option value="converted">Quotes</option>
	<option value="both">Balances + Quotes</option> -->
	<!-- <option value="original">Token Amounts</option>
	<option value="converted">Quote Values</option>
	<option value="both">Amounts and Values</option> -->
</select>
