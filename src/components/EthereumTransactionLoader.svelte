<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let quoteCurrency: QuoteCurrency = $preferredQuoteCurrency


	import { getTransaction } from '../data/analytics/covalent'


	import EthereumTransaction from './EthereumTransaction.svelte'
	import Loader from './Loader.svelte'
</script>


{#if transactionID}
	<Loader
		loadingIcon="/logos/covalent-logomark.svg"
		loadingMessage="Fetching transaction data via Covalent..."
		fromPromise={() =>
			getTransaction({
				chainID: network.chainId,
				transactionHash: transactionID,
				includeLogs: true
			})
			.then(({items: [transaction]}) => transaction)
		}
		let:then={transaction}
	>
		<EthereumTransaction
			{network}
			{transaction}
			{quoteCurrency}
			detailLevel="exhaustive"
			showValues="both"
			layout="standalone"
		/>
	</Loader>
{/if}