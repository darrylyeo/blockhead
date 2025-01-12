<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../../_explorerParams'

	import {
		explorerNetwork,
	} from '../../../../_explorerContext'


	// Components
	import FilecoinBlock from '$/components/FilecoinBlock.svelte'
	import FilecoinBlockLoader from '$/components/FilecoinBlockLoader.svelte'
</script>


<FilecoinBlockLoader
	network={$explorerNetwork}
	blockCid={$explorerParams.filecoinBlockCid}
	let:block
>
	{#if block}
		<FilecoinBlock
			network={$explorerNetwork}
			{block}
			headingLevel={2}
			layout="standalone"
		/>
	{/if}
</FilecoinBlockLoader>
