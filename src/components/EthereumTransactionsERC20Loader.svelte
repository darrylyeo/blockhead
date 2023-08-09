<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { TickerSymbol } from '../data/currencies'
	import { preferences } from '../state/preferences'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let provider: Ethereum.Provider

	export let erc20Token: Ethereum.ERC20Token

	export let quoteCurrency: TickerSymbol
	export let transactionProvider: TransactionProvider
	export let includeLogs = true

	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	$: loadingMessage = `Retrieving ERC-20 transactions from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve ERC-20 transactions from ${transactionProvider}.`


	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { getERC20TokenTransfers } from '../api/covalent'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api'


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
		then={result => result?.pages?.flatMap(page => page.items) ?? []}
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
