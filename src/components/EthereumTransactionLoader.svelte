<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { preferredTransactionProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let transactionProvider: Ethereum.TransactionProvider
	export let quoteCurrency: QuoteCurrency

	$: _transactionProvider = transactionProvider || $preferredTransactionProvider
	$: _quoteCurrency = quoteCurrency || $preferredQuoteCurrency


	import { getTransaction as getTransactionCovalent } from '../data/analytics/covalent'
	import { getTransaction as getTransactionEtherspot } from '../data/etherspot/etherspot'


	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	import EthereumTransactionEtherspot from './EthereumTransactionEtherspot.svelte'
	import Loader from './Loader.svelte'
</script>


{#if transactionID}
	<div class="stack">
		{#if _transactionProvider === 'Covalent'}
			<Loader
				loadingIcon="/logos/covalent-logomark.svg"
				loadingMessage="Fetching transaction data via {_transactionProvider}..."
				fromPromise={() =>
					getTransactionCovalent({
						chainID: network.chainId,
						transactionHash: transactionID,
						includeLogs: true
					})
					.then(({items: [transaction]}) => transaction)
				}
				let:then={transaction}
			>
				<EthereumTransactionCovalent
					{network}
					{transaction}
					quoteCurrency={_quoteCurrency}
					detailLevel="exhaustive"
					showValues="both"
					layout="standalone"
				/>
			</Loader>
		{:else if _transactionProvider === 'Etherspot'}
			<Loader
				loadingIcon="/logos/etherspot-icon.png"
				loadingMessage="Fetching transaction data via {_transactionProvider}..."
				fromPromise={() => getTransactionEtherspot({network, transactionID})}
				let:then={transaction}
			>
				<EthereumTransactionEtherspot
					{network}
					{transaction}
					quoteCurrency={_quoteCurrency}
					detailLevel="exhaustive"
					showValues="both"
					layout="standalone"
				/>
			</Loader>
		{/if}
	</div>
{/if}