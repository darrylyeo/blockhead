<script lang="ts">
	// Context
	import { explorerContext } from '../../../../_explorerContext.svelte'
	import { explorerParams } from '../../../../_explorerParams.svelte'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	const networkProvider = $derived(
		$preferences.rpcNetwork
	)


	// Components
	import EthereumBlock from '$/components/EthereumBlock.svelte'
	import EthereumBlockHeader from '$/components/EthereumBlockHeader.svelte'
	import EthereumBlockLoader from '$/components/EthereumBlockLoader.svelte'
</script>


<EthereumBlockLoader
	loaderViewOptions={{
		containerClass: 'card',
	}}
	network={explorerContext.network}
	{networkProvider}
	blockNumber={explorerParams.blockNumber}
	transactionProvider={$preferences.transactionProvider}
	includeTransactions={true}

	bind:block={explorerContext.navigationContext.block}
	let:block
	let:status
>
	<svelte:fragment slot="header" let:block>
		{#if block}
			<EthereumBlockHeader
				network={explorerContext.network}
				{block}
				headingLevel={2}
			/>
		{/if}
	</svelte:fragment>

	{#if status === 'resolved'}
		<hr>

		<EthereumBlock
			network={explorerContext.network}
			{block}
			headingLevel={2}
		/>
	{/if}
</EthereumBlockLoader>

