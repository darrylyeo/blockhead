<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import { preferences } from '../state/preferences'


	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let provider: Ethereum.Provider

	export let erc20Token: Ethereum.ERC20Token

	export let quoteCurrency: TickerSymbol
	export let transactionProvider
	export let includeLogs = true

	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	import { useInfiniteQuery } from '@sveltestack/svelte-query'

	import { getERC20TokenTransfers } from '../api/covalent'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api'


	import Loader from './Loader.svelte'


	import { CovalentIcon } from '../assets/icons'
</script>


<!-- {#if transactionProvider === 'Covalent'} -->
	<Loader
		loadingIcon={CovalentIcon}
		loadingIconName={transactionProvider}
		loadingMessage="Retrieving ERC-20 transactions from {transactionProvider}..."
		errorMessage="Error retrieving ERC-20 transactions from {transactionProvider}"
		fromUseInfiniteQuery={useInfiniteQuery({
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
		let:result
		let:status
		let:pagination
	>
		<slot name="header" slot="header" {status} />
		<slot transactions={result?.pages?.flatMap(page => page.items) ?? []} {pagination} />
	</Loader>
<!-- {/if} -->