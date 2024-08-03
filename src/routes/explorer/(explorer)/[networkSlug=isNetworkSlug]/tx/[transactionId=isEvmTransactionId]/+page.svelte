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
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
</script>


<EthereumTransactionLoader
	network={$explorerNetwork}
	{networkProvider}
	transactionId={$explorerParams.transactionId}
	detailLevel="exhaustive"
	tokenBalanceFormat="both"
	showFees={true}
	layout="standalone"
	bind:transaction={$navigationContext.transaction}
/>
