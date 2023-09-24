<script lang="ts">
	// Params
	import { accountId } from '../../_appsParams'


	// Context
	import { network } from '../../_appsContext'


	// Components
	import AccountIdResolver from '../../../../components/AccountIdResolver.svelte'
	import UniswapV3SwapForm from '../../../../components/UniswapV3SwapForm.svelte'
	import UniswapV3PositionManageForm from '../../../../components/UniswapV3PositionManageForm.svelte'
	import UniswapV3PositionCreateForm from '../../../../components/UniswapV3PositionCreateForm.svelte'
	import UniswapV3PositionsLoader from '../../../../components/UniswapV3PositionsLoader.svelte'
	import TokenListLoader from '../../../../components/TokenListLoader.svelte'
</script>


<AccountIdResolver
	accountId={$accountId}
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
			network={$network}
			{availableTokens}
		/>

		<UniswapV3PositionCreateForm
			network={$network}
			{availableTokens}
		/>

		{#if address}
			<UniswapV3PositionsLoader
				network={$network}
				{address}
				let:positions
			>
				{#each positions as position}
					<UniswapV3PositionManageForm
						network={$network}
						{position}
					/>
				{/each}
			</UniswapV3PositionsLoader>
		{/if}
	</TokenListLoader>
</AccountIdResolver>
