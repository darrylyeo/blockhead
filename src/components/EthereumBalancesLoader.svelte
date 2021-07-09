<script context="module">
	import { getTokenAddressBalances } from '../data/analytics/covalent'
	import { memoizedAsync } from '../utils/memoized'

	const memoizedTokenAddressBalances = memoizedAsync(getTokenAddressBalances)
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'


	export let network: Ethereum.Network
	export let address: string
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency

	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isCollapsed: boolean



	export let balances: Covalent.ERC20TokenOrNFTContractWithBalance[] = []

	$: getBalancesPromise = memoizedTokenAddressBalances({address, nft: false, chainID: network.chainId, quoteCurrency})
		.then(_ => balances = _.items)


	import Loader from './Loader.svelte'
</script>


{#if analyticsProvider === 'Covalent'}
	<Loader
		loadingIcon={'/logos/covalent-logomark.svg'}
		loadingIconName={'Covalent'}
		loadingMessage="Retrieving {network.name} balances from {analyticsProvider}..."
		errorMessage="Error retrieving {network.name} balances from {analyticsProvider}"
		fromPromise={() => getBalancesPromise}
		{showIf}
		{isCollapsed}
		let:then={balances}
	>
		<slot name="header" slot="header" {balances}></slot>

		<slot {balances} />
	</Loader>
{/if}