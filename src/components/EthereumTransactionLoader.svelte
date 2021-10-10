<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { preferences } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let transactionProvider: Ethereum.TransactionProvider
	export let provider: Ethereum.Provider
	export let quoteCurrency: QuoteCurrency


	// View options

	export let contextualAddress: Ethereum.Address
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency


	import { getTransaction as getTransactionCovalent } from '../data/analytics/covalent'
	import { getTransaction as getTransactionEtherspot } from '../data/etherspot/etherspot'


	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	import EthereumTransactionEtherspot from './EthereumTransactionEtherspot.svelte'
	import Loader from './Loader.svelte'
</script>


{#if transactionID}
	<div class="stack">
		{#if transactionProvider === 'Covalent'}
			<Loader
				loadingIcon="/logos/covalent-logomark.svg"
				loadingMessage="Fetching transaction data via {transactionProvider}..."
				fromPromise={() =>
					getTransactionCovalent({
						chainID: network.chainId,
						transactionHash: transactionID,
						includeLogs: true
					})
					.then(({items: [transaction]}) => transaction)
				}
				let:then={transaction}
				let:status
			>
				<slot name="header" slot="header" {status} {transaction} />

				<EthereumTransactionCovalent
					{network}
					{transaction}
					{quoteCurrency}

					{contextualAddress}
					{detailLevel}
					{showValues}
					{showFees}
					
					{layout}
					{innerLayout}
				/>
			</Loader>
		{:else if transactionProvider === 'Etherspot'}
			<Loader
				loadingIcon="/logos/etherspot-icon.png"
				loadingMessage="Fetching transaction data via {transactionProvider}..."
				fromPromise={() => getTransactionEtherspot({network, transactionID})}
				let:then={transaction}
				let:status
			>
				<slot name="header" slot="header" {status} {transaction} />

				<EthereumTransactionEtherspot
					{network}
					{transaction}
					{quoteCurrency}

					{contextualAddress}
					{detailLevel}
					{showValues}
					{showFees}
					
					{layout}
					{innerLayout}
				/>
			</Loader>
		{/if}
	</div>
{/if}