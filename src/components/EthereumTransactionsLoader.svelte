<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import { preferences } from '../data/ethereum/preferences'

	export let network: Ethereum.Network
	export let address: Ethereum.Address | undefined
	export let provider: Ethereum.Provider

	export let quoteCurrency: TickerSymbol
	export let transactionProvider

	export let includeLogs = true

	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	import { getTransactionsByAddress } from '../data/analytics/covalent'
	import { getTransactions as getTransactionsEtherspot } from '../data/etherspot/etherspot'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../data/moralis/moralis-web3-api'


	import Loader from './Loader.svelte'
</script>


{#if transactionProvider === 'Covalent'}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={transactionProvider}
		loadingMessage="Retrieving {network.name} transactions from {transactionProvider}..."
		errorMessage="Error retrieving {network.name} transactions from {transactionProvider}"
		fromPromise={async () => 
			(await getTransactionsByAddress({
				chainID: network.chainId,
				address,
				includeLogs,
				quoteCurrency
			}))
				.items
		}
		let:result={transactions}
		let:status
	>
		<slot name="header" slot="header" {status} {transactions} />
		{#if transactions}
			<slot {transactions} />
		{/if}
	</Loader>
{:else if transactionProvider === 'Etherspot'}
	<Loader
		loadingIcon="/logos/etherspot-icon.png"
		loadingMessage="Retrieving {network.name} transactions from {transactionProvider}..."
		errorMessage="Error retrieving {network.name} transactions from {transactionProvider}"
		fromPromise={async () =>
			await getTransactionsEtherspot({network, address})
		}
		let:result={transactions}
	>
		<slot name="header" slot="header" {status} {transactions} />
		{#if transactions}
			<slot {transactions} />
		{/if}	
	</Loader>
{:else if transactionProvider === 'Moralis'}
	<Loader
		loadingIcon={'/logos/moralis-icon.svg'}
		loadingIconName={transactionProvider}
		loadingMessage="Retrieving {network.name} transactions from {transactionProvider}..."
		errorMessage="Error retrieving {network.name} transactions from {transactionProvider}"
		fromPromise={async () => {
			const {result: transactions, total, page_size, page} = (await MoralisWeb3Api.address.getTransactions({
				chain: chainCodeFromNetwork(network),
				from_block: 0,
				// to_block: ,
				// offset,
				limit: 100,
				address
			}))

			// const logs = (await MoralisWeb3Api.address.getLogsByAddress({
			// 	chain: chainCodeFromNetwork(network),
			// 	from_block: 0,
			// 	address: transactions[0].hash
			// }))

			// console.log(transactions[0], logs)

			return (
				includeLogs
					? await Promise.all(transactions.map(transaction => (
						MoralisWeb3Api.transaction.getTransaction({
							chain: chainCodeFromNetwork(network),
							transactionHash: transaction.hash
						})
					)))
					: transactions
			).reverse()
		}}
		let:result={transactions}
		let:status
	>
		<slot name="header" slot="header" {status} {transactions} />
		{#if transactions}
			<slot {transactions} />
		{/if}
	</Loader>
{/if}