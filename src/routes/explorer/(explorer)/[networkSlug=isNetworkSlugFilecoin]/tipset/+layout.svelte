<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../_explorerParams'

	import {
		explorerNetwork,
	} from '../../../_explorerContext'


	// Components
	import FilecoinTipset from '$/components/FilecoinTipset.svelte'
	import FilecoinTipsetLoader from '$/components/FilecoinTipsetLoader.svelte'
</script>


<FilecoinTipsetLoader
	network={$explorerNetwork}
	query={
		$explorerParams.filecoinTipsetCid ?
			{
				tipsetCid: $explorerParams.filecoinTipsetCid,
			}
		:
			{
				tipsetNumber: $explorerParams.blockNumber,
			}
	}
	let:tipset
>
	{#if tipset}
		<FilecoinTipset
			network={$explorerNetwork}
			{tipset}
			headingLevel={2}
		/>
	{/if}
</FilecoinTipsetLoader>
