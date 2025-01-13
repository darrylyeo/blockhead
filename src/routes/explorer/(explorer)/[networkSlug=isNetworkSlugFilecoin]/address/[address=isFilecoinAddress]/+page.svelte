<script lang="ts">
	// Params/Context
	import {
		explorerParams,
	} from '../../../../_explorerParams'

	import {
		explorerNetwork,
	} from '../../../../_explorerContext'


	// Components
	import FilecoinActorDetailsLoader from '$/components/FilecoinActorDetailsLoader.svelte'
	import FilecoinActor from '$/components/FilecoinActor.svelte'
</script>


<FilecoinActorDetailsLoader
	network={$explorerNetwork}
	address={$explorerParams.address}
	let:account
>
	{#if account}
		<FilecoinActor
			network={$explorerNetwork}
			{account}
			headingLevel={2}
		/>
	{/if}
</FilecoinActorDetailsLoader>
