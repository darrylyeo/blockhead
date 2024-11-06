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
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
</script>


<EthereumTransactionLoader
	network={explorerContext.network}
	{networkProvider}
	transactionId={explorerParams.transactionId}
	detailLevel="exhaustive"
	tokenBalanceFormat="both"
	showFees={true}
	layout="standalone"
	bind:transaction={explorerContext.navigationContext.transaction}
/>
