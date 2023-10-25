<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import type { TickerSymbol } from '../data/currencies'
	import { preferences } from '../state/preferences'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import type { Transaction } from '../api/covalent'


	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let address: Ethereum.Address

	export let erc20Token: Ethereum.ERC20Token

	export let quoteCurrency: TickerSymbol
	export let transactionProvider: TransactionProvider
	export let includeLogs = true

	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	$: loadingMessage = `Retrieving ERC-20 transactions from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve ERC-20 transactions from ${transactionProvider}.`


	// Outputs
	export let transactions: Transaction[]

	type SharedSlotProps = {
		transactions: typeof transactions
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { getERC20TokenTransfers, normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent'


	import Loader from './Loader.svelte'
</script>


<!-- {#if transactionProvider === TransactionProvider.Covalent} -->
	<Loader
		loadingIcon={transactionProviderIcons[transactionProvider]}
		loadingIconName={transactionProvider}
		{loadingMessage}
		{errorMessage}
		fromInfiniteQuery={createInfiniteQuery({
			queryKey: ['TransactionsERC20Transfer', {
				transactionProvider,
				chainID: network.chainId,
				address,
				quoteCurrency,
			}],
			queryFn: async ({ pageParam: pageNumber }) => (
				await getERC20TokenTransfers({
					chainID: network.chainId,
					address,
					contractAddress: erc20Token.address,
					quoteCurrency,
					pageNumber: pageNumber ?? 0,
					pageSize: 100,
				})
			),
			getPreviousPageParam: (firstPage, allPages) => firstPage.pagination?.page_number > 0 ? firstPage.pagination.page_number - 1 : undefined,
			getNextPageParam: (lastPage, allPages) => lastPage.pagination?.has_more ? lastPage.pagination.page_number + 1 : undefined
		})}
		then={result => (
			(result?.pages?.flatMap(page => page.items) ?? [])
				.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
		)}
		bind:result={transactions}
		let:result={transactions}
		let:status
		let:pagination
	>
		<svelte:fragment slot="header"
			let:result={transactions}
			let:status
			let:pagination
		>
			<slot name="header" {transactions} {status} {pagination} />
		</svelte:fragment>
		<slot {transactions} {status} {pagination} />
	</Loader>
<!-- {/if} -->
