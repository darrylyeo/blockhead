<script lang="ts">
	// Params/Context
	import { explorerParams } from '../../../../_explorerParams.svelte'

	import { explorerContext } from '../../../../_explorerContext.svelte'


	// Components
	import FilecoinTipset from '$/components/FilecoinTipset.svelte'
	import FilecoinTipsetLoader from '$/components/FilecoinTipsetLoader.svelte'
</script>


<FilecoinTipsetLoader
	network={explorerContext.network}
	tipsetNumber={BigInt(explorerParams.blockNumber)}
	let:tipset
>
	<FilecoinTipset
		network={explorerContext.network}
		{tipset}
		headingLevel={2}
	/>
</FilecoinTipsetLoader>
