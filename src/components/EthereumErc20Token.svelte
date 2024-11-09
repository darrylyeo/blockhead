<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { PriceProvider } from '$/data/priceProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { Erc20TokenProvider } from '$/data/erc20TokenProvider'
	import type { TokenBalancesProvider } from '$/data/tokenBalancesProvider'


	// Inputs
	export let network: Ethereum.Network
	export let erc20Token: Ethereum.Erc20Token

	export let view: 'Dashboard' | 'Account' = 'Dashboard'
	export let address: Ethereum.Address | undefined

	export let quoteCurrency: QuoteCurrency
	export let networkProvider: NetworkProvider
	export let erc20TokenProvider: Erc20TokenProvider
	export let currentPriceProvider: PriceProvider
	export let tokenBalancesProvider: TokenBalancesProvider


	// (View options)
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'both'


	// Components
	import Collapsible from './Collapsible.svelte'
	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import EthereumContractExplorer from './EthereumContractExplorer.svelte'
	import EthereumErc20TokenLoader from './EthereumErc20TokenLoader.svelte'
	import CurrentPrice from './CurrentPrice.svelte'
	import HistoricalPriceChart from './HistoricalPriceChart.svelte'
	import TokenName from './TokenName.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions/animations
	import BlockTransition from './BlockTransition.svelte'
	import { fly } from 'svelte/transition'
</script>


<Collapsible
	type="label"
	containerClass="card erc20-token"
	class="column"
	showTriggerText={false}
>
	<svelte:fragment slot="title">
		<h4>
			<TokenName
				token={{
					chainId: network.chainId,
					...erc20Token
				}}
				layout="name-and-symbol"
			/>
		</h4>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<div class="card-annotation">ERC-20 Token</div>
	</svelte:fragment>

	<!--
	<svelte:fragment slot="title">
		<h4>
			<TokenName
				token={{
					chainId: network.chainId,
					...erc20Token
				}}
			/>
			({erc20Token.name})
		</h4>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<div class="card-annotation">ERC-20 Token</div>
	</svelte:fragment>
	-->

	<hr>

	<BlockTransition
		key={
			view === 'Dashboard' ? 1 :
			view === 'Account' && address ? 2 :
			0
		}
		contentTransition={{
			in: [fly, { x: 20, duration: 300 }],
			out: [fly, { x: -20, duration: 300 }],
		}}
	>
		{#if view === 'Dashboard'}
			<EthereumErc20TokenLoader
				{network}
				address={erc20Token.address}
				{erc20TokenProvider}
				{networkProvider}
				let:erc20Token
			>
				{#if erc20Token}
					<dl>
						{#if erc20Token.name}
							<dt>Name</dt>
							<dd>{erc20Token.name}</dd>
						{/if}

						{#if erc20Token.symbol}
							<dt>Symbol</dt>
							<dd>{erc20Token.symbol}</dd>
						{/if}

						{#if erc20Token.decimals !== undefined}
							<dt>Decimals</dt>
							<dd>{erc20Token.decimals}</dd>
						{/if}

						{#if erc20Token.totalSupply !== undefined}
							<dt>Total Supply</dt>
							<dd>
								<TokenBalanceWithConversion
									{tokenBalanceFormat}
									token={erc20Token}
									balance={erc20Token.totalSupply}
									conversionCurrency={quoteCurrency}
									convertedValue={erc20Token.conversion?.value}
									conversionRate={erc20Token.conversion?.rate}
								/>
							</dd>
						{/if}
					</dl>
				{/if}
			</EthereumErc20TokenLoader>

			<hr>

			<div class="column">
				<CurrentPrice
					layout="collapsible"
					{currentPriceProvider}
					query={{
						erc20Token,
					}}
					{quoteCurrency}
					{network}
				>
				<!-- blockNumber={$blockNumber} -->
					<h4 slot="title">
						Current Price
					</h4>
				</CurrentPrice>

				<hr>

				<HistoricalPriceChart
					query={{
						coins: [
							{
								erc20Token,
							},
						],
					}}
					{quoteCurrency}
				>
					<h4 slot="title">
						<!-- {erc20Token.name}
						(<TokenName
							token={{
								chainId: network.chainId,
								...erc20Token
							}}
						/>)
						- Historical Price -->
						Historical Price
					</h4>
				</HistoricalPriceChart>

				<hr>

				<EthereumContractExplorer
					{network}
					address={erc20Token.address}
					headingLevel={4}
				/>
			</div>

		{:else if view === 'Account' && address}
			<div class="card">
				<EthereumBalancesLoader
					{network}
					{address}
					{tokenBalancesProvider}
					{quoteCurrency}
					showIf={balances => balances}
					let:balances
				>
					<svelte:fragment slot="header">
						<div class="bar wrap">
							<h4>Current Balance</h4>
							<div class="card-annotation">{tokenBalancesProvider}</div>
						</div>

						<hr>
					</svelte:fragment>

					{#each
						[
							balances?.find(balance => balance.token.address.toLowerCase() === erc20Token.address.toLowerCase())
						].filter(_ => _)
						as {type, token, balance, value, rate},
						i (i)
					}
						<TokenBalanceWithConversion
							{tokenBalanceFormat}

							{token}

							{balance}
							conversionCurrency={quoteCurrency}
							convertedValue={value}
							conversionRate={rate}
						/>
					{:else}
						<TokenBalanceWithConversion

							token={erc20Token}

							balance={0n}
							conversionCurrency={quoteCurrency}
							convertedValue={0}
							conversionRate={0}
						/>
					{/each}
				</EthereumBalancesLoader>
			</div>
		{/if}
	</BlockTransition>
</Collapsible>

