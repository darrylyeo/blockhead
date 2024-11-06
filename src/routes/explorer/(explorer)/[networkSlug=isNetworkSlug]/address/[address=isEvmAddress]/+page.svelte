<script lang="ts">
	// Context
	import { explorerContext } from '../../../../_explorerContext.svelte'
	import { explorerParams } from '../../../../_explorerParams.svelte'


	// External stores
	import { preferences } from '$/state/preferences'

	const networkProvider = $derived(
		$preferences.rpcNetwork
	)


	// Components
	import EthereumAccountOrContract from '$/components/EthereumAccountOrContract.svelte'
</script>


<EthereumAccountOrContract
	network={explorerContext.network}
	{networkProvider}
	accountId={explorerParams.address}
/>
