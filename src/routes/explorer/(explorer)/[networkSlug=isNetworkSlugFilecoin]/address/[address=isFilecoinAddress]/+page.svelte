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
	let:actor
	let:filecoinTransactionProvider
>
	{#if actor}
		<FilecoinActor
			network={$explorerNetwork}
			displayedAddress={$explorerParams.address}
			{actor}
			{filecoinTransactionProvider}
			headingLevel={2}
		/>
	{/if}
</FilecoinActorDetailsLoader>
