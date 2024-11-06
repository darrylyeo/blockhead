<script lang="ts">
	// Params/Context
	import { explorerParams } from '../../../../_explorerParams.svelte'

	import { explorerContext } from '../../../../_explorerContext.svelte'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	const networkProvider = $derived(
		$preferences.rpcNetwork
	)


	// Components
	import FilecoinTransaction from '$/components/FilecoinTransaction.svelte'
	import FilecoinTransactionLoader from '$/components/FilecoinTransactionLoader.svelte'
</script>


<FilecoinTransactionLoader
	network={explorerContext.network}
	{networkProvider}
	transactionCid={explorerParams.transactionId}
	detailLevel="exhaustive"
	tokenBalanceFormat="both"
	showFees={true}
	layout="standalone"
	bind:transaction={explorerContext.navigationContext.transaction}
	let:transaction
>
	<FilecoinTransaction
		network={explorerContext.network}
		{transaction}
		headingLevel={2}
	/>
</FilecoinTransactionLoader>
