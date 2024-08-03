<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../../_explorerParams'

	import {
		explorerNetwork,
		navigationContext,
	} from '../../../../_explorerContext'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	$: networkProvider = $preferences.rpcNetwork


	// Components
	import EthereumBlock from '$/components/EthereumBlock.svelte'
	import EthereumBlockHeader from '$/components/EthereumBlockHeader.svelte'
	import EthereumBlockLoader from '$/components/EthereumBlockLoader.svelte'
</script>


<EthereumBlockLoader
	loaderViewOptions={{
		containerClass: 'card',
	}}
	network={$explorerNetwork}
	{networkProvider}
	blockNumber={$explorerParams.blockNumber}
	transactionProvider={$preferences.transactionProvider}
	includeTransactions={true}

	bind:block={$navigationContext.block}
	let:block
	let:status
>
	<svelte:fragment slot="header" let:block>
		{#if block}
			<EthereumBlockHeader
				network={$explorerNetwork}
				{block}
				headingLevel={2}
			/>
		{/if}
	</svelte:fragment>

	{#if status === 'resolved'}
		<hr>

		<EthereumBlock
			network={$explorerNetwork}
			{block}
			headingLevel={2}
		/>
	{/if}
</EthereumBlockLoader>

