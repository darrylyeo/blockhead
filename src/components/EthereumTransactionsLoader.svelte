<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from 'src/data/currency/currency'
	import { preferences } from '../data/ethereum/preferences'

	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let provider: Ethereum.Provider

	export let quoteCurrency: TickerSymbol
	export let transactionProvider

	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	import { getTransactionsByAddress } from '../data/analytics/covalent'


	import Loader from './Loader.svelte'
</script>


{#if $preferences.transactionProvider === 'Covalent'}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={transactionProvider}
		loadingMessage="Retrieving {network.name} transactions from {transactionProvider}..."
		errorMessage="Error retrieving {network.name} transactions from {transactionProvider}"
		fromPromise={async () => 
			(await getTransactionsByAddress({
				chainID: network.chainId,
				address,
				includeLogs: true,
				quoteCurrency
			}))
				.items
		}
		let:then={transactions}
		let:status
	>
		<slot name="header" slot="header" {status} {transactions} />
		{#if transactions}
			<slot {transactions} />
		{/if}
	</Loader>
{/if}