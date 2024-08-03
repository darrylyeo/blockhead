<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../../_explorerParams'

	import {
		explorerNetwork,
	} from '../../../../_explorerContext'


	// External stores
	import { preferences } from '$/state/preferences'

	$: networkProvider = $preferences.rpcNetwork


	// Components
	import EthereumAccountOrContract from '$/components/EthereumAccountOrContract.svelte'
</script>


<EthereumAccountOrContract
	network={$explorerNetwork}
	{networkProvider}
	accountId={$explorerParams.ensName}
/>
