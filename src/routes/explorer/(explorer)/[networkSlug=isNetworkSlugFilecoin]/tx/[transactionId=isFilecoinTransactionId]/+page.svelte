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
	import FilecoinTransaction from '$/components/FilecoinTransaction.svelte'
	import FilecoinTransactionLoader from '$/components/FilecoinTransactionLoader.svelte'
</script>


<FilecoinTransactionLoader
	network={$explorerNetwork}
	{networkProvider}
	transactionCid={$explorerParams.transactionId}
	detailLevel="exhaustive"
	tokenBalanceFormat="both"
	showFees={true}
	layout="standalone"
	bind:transaction={$navigationContext.transaction}
	let:transaction
>
	<FilecoinTransaction
		network={$explorerNetwork}
		{transaction}
		headingLevel={2}
	/>
</FilecoinTransactionLoader>
