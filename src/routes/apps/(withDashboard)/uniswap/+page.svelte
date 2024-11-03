<script lang="ts">
	// Constants/types
	import { UniswapV3 } from '$/api/uniswap-v3'


	// Params
	import { appsParams } from '../../_appsParams.svelte'


	// Context
	import { appsContext } from '../../_appsContext.svelte'


	// Internal state
	let dataProvider = UniswapV3.DataProvider.TheGraph


	// Components
	import AccountIdResolver from '$/components/AccountIdResolver.svelte'
	import UniswapV3SwapForm from '$/components/UniswapV3SwapForm.svelte'
	import UniswapV3Position from '$/components/UniswapV3Position.svelte'
	import UniswapV3PositionCreateForm from '$/components/UniswapV3PositionCreateForm.svelte'
	import UniswapV3PositionsLoader from '$/components/UniswapV3PositionsLoader.svelte'
	import TokenListLoader from '$/components/TokenListLoader.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
</script>


<AccountIdResolver
	accountId={appsParams.accountId}
	passiveResolveToAddress
	passiveResolveToName
	let:address
>
	<TokenListLoader
		containerClass="card"
		let:tokenlist
	>
		{@const availableTokens = (tokenlist?.tokens ?? []).map(({ logoURI, ...props }) => ({ icon: logoURI, ...props }))}

		<UniswapV3SwapForm
			network={appsContext.network}
			{availableTokens}
		/>

		<UniswapV3PositionCreateForm
			network={appsContext.network}
			{availableTokens}
		/>

		{#if address}
			<UniswapV3PositionsLoader
				loaderViewOptions={{
					layout: 'collapsible',
					collapsibleType: 'label',
					containerClass: 'card',
				}}
				{address}
				{dataProvider}
				network={appsContext.network}
				let:positions
			>
				<svelte:fragment slot="header"
					let:positions
					let:isOpen let:toggle
				>
					<header class="bar">
						<h4>Positions</h4>

						<div class="row">
							<div class="summary">
								{#if positions?.length}
									<span><TweenedNumber value={positions.length} /> positions</span>
								{/if}
							</div>

							<button
								class="small"
								data-after={isOpen ? '⏶' : '⏷'}
								on:click={toggle}
							>{isOpen ? 'Hide' : 'Show'}</button>
						</div>
					</header>
				</svelte:fragment>

				<div class="scrollable-list column">
					{#each positions as position}
						<UniswapV3Position
							network={appsContext.network}
							{position}
						/>
					{/each}
				</div>
			</UniswapV3PositionsLoader>
		{/if}
	</TokenListLoader>
</AccountIdResolver>
