<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from 'src/data/currency/currency'
	import { preferences } from '../data/ethereum/preferences'

	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let provider: Ethereum.Provider

	export let erc20Token: Ethereum.ERC20Token

	export let quoteCurrency: TickerSymbol
	export let transactionProvider

	$: quoteCurrency ||= $preferences.quoteCurrency
	$: transactionProvider ||= $preferences.transactionProvider


	import { getERC20TokenTransfers } from '../data/analytics/covalent'


	import Loader from './Loader.svelte'
</script>


{#if $preferences.transactionProvider === 'Covalent'}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={transactionProvider}
		loadingMessage="Retrieving ERC-20 transactions from {transactionProvider}..."
		errorMessage="Error retrieving ERC-20 transactions from {transactionProvider}"
		fromPromise={async () => 
			(await getERC20TokenTransfers({
				chainID: network.chainId,
				address,
				contractAddress: erc20Token.address,
				quoteCurrency
			}))
				.items
		}
		let:then={transactions}
		let:status
	>
		<slot name="header" slot="header" {status} {transactions} />
		<slot {transactions} />
	</Loader>
{/if}