<script context="module">
	import { getTokenAddressBalances } from '../data/analytics/covalent'
	import { memoizedAsync } from '../utils/memoized'

	const memoizedTokenAddressBalances = memoizedAsync(getTokenAddressBalances)
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { QuoteCurrency } from '../data/currency/currency'


	export let network: Ethereum.Network
	export let address: string
	export let tokenBalancesProvider
	export let quoteCurrency: QuoteCurrency

	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isCollapsed: boolean


	export let balances: {
		type: Covalent.ERC20TokenOrNFTContractWithBalance['type'],
		token: Ethereum.ERC20Token,
		balance: Covalent.ERC20TokenOrNFTContractWithBalance['balance'],
		value: Covalent.ERC20TokenOrNFTContractWithBalance['quote'],
		rate: Covalent.ERC20TokenOrNFTContractWithBalance['quote_rate'],
	}[] = []


	import Loader from './Loader.svelte'
</script>


{#if tokenBalancesProvider === 'Covalent'}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={'Covalent'}
		loadingMessage="Retrieving {network.name} balances from {tokenBalancesProvider}..."
		errorMessage="Error retrieving {network.name} balances from {tokenBalancesProvider}"
		fromPromise={async () =>
			(await memoizedTokenAddressBalances({
				address,
				nft: false,
				chainID: network.chainId,
				quoteCurrency
			}))
			.items
			.map(({
				type,
				balance, quote, quote_rate,
				contract_name, contract_address, contract_decimals, contract_ticker_symbol, logo_url, contract_logo_url,
			}) => ({
				type,
				token: {
					symbol: contract_ticker_symbol || contract_name,
					address: contract_address,
					name: contract_name,
					icon: contract_logo_url || logo_url,
					decimals: contract_decimals,
				},
				balance,
				value: quote,
				rate: quote_rate
			}))
		}
		{showIf}
		{isCollapsed}
		bind:balances
		let:then={balances}
	>
		<slot name="header" slot="header" {balances}></slot>

		<slot {balances} />
	</Loader>
{/if}