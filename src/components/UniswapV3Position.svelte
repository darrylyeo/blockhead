<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import Address from './Address.svelte';


	// Inputs
	export let network: Ethereum.Network
	export let position: UniswapV3.Position


	// Functions
	import { UniswapV3 } from '$/api/uniswap-v3'


	// Components
	import Collapsible from './Collapsible.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import UniswapV3PositionManageForm from './UniswapV3PositionManageForm.svelte'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	showTriggerText={false}
	{...$$restProps}
>
	<h4 slot="title" title={position.pool.contract?.name}>
		<Address
			{network}
			address={position.pool.contract?.address}
		>
			<TokenBalanceWithConversion
				{network}
				balance={Number(position.token0Amount) * 0.1 ** position.pool.token0.decimals}
				erc20Token={position.pool.token0}
				convertedValue={position.token0BalanceUsd}
			/> / <TokenBalanceWithConversion
				{network}
				balance={Number(position.token1Amount) * 0.1 ** position.pool.token1.decimals}
				erc20Token={position.pool.token1}
				convertedValue={position.token1BalanceUsd}
			/> @ {UniswapV3.formatFeeAmount(position.pool.fee)}
		</Address>
	</h4>

	<svelte:fragment slot="header-right">
		<span class="summary">
			<TokenBalance format="fiat" symbol="USD" balance={position.cumulativeWithdrawUSD - position.cumulativeDepositUSD} /> earned
		</span>

		<span class="card-annotation">
			Position{position.hashClosed ? ' (Closed)' : ''}
		</span>
	</svelte:fragment>

	<UniswapV3PositionManageForm
		{network}
		{position}
	/>

	<Collapsible
		type="label"
		containerClass="card"
		class="column"
		{...$$restProps}
	>
		<h5 slot="title">History</h5>

		{#each [position.hashOpened, position.hashClosed] as transactionId}
			<EthereumTransactionLoader
				{network}
				{transactionId}
				detailLevel="exhaustive"
				contextualAddress={position.owner}
			/>
		{/each}
	</Collapsible>
</Collapsible>
