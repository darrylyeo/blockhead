<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'
	import type { QuoteCurrency } from '$/data/currencies'
	import { preferences } from '$/state/preferences'
	import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'


	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let address: Ethereum.Address

	export let erc20Token: Ethereum.ERC20Token

	export let quoteCurrency: QuoteCurrency
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
	export let transactions: Ethereum.Transaction[] | undefined

	type SharedSlotProps = {
		transactions: typeof transactions,
		status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
		pagination: Loader<any, any, any, any, any>['$$slot_def']['default']['pagination'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { getErc20TransfersForWalletAddress } from '$/api/covalent/index'
	import { normalizeTransaction as normalizeTransactionCovalent } from '$/api/covalent/normalize'


	import Loader from './Loader.svelte'
</script>


<!-- {#if transactionProvider === TransactionProvider.Covalent} -->
	<Loader
		loadingIcon={transactionProviderIcons[transactionProvider]}
		loadingIconName={transactionProvider}
		{loadingMessage}
		{errorMessage}
		fromInfiniteQuery={createInfiniteQuery({
			queryKey: ['TransactionsErc20', {
				transactionProvider,
				chainId: network.chainId,
				contractAddress: erc20Token.address,
				address,
				quoteCurrency,
			}],
			initialPageParam: 0,
			queryFn: async ({ pageParam: pageNumber }) => (
				await getErc20TransfersForWalletAddress({
					chainName: network.chainId,
					walletAddress: address,
					quoteCurrency,
					contractAddress: erc20Token.address,
					pageSize: 100,
					pageNumber,
				})
			),
			getPreviousPageParam: (firstPage, allPages) => firstPage.pagination?.page_number > 0 ? firstPage.pagination.page_number - 1 : undefined,
			getNextPageParam: (lastPage, allPages) => lastPage.pagination?.has_more ? lastPage.pagination.page_number + 1 : undefined,
			select: result => (
				(result?.pages?.flatMap(page => page.items) ?? [])
					.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
			),
		})}
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
