<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import { appsContext } from '$/routes/apps/_appsContext.svelte'

	import { appsParams } from '$/routes/apps/_appsParams.svelte'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieOrder from '../../../../MoxieOrder.svelte'
	import MoxieOrderLoader from '../../../../MoxieOrderLoader.svelte'
</script>


<MoxieOrderLoader
	{moxieProvider}
	network={appsContext.network}
	orderId={appsParams.moxieOrderId}
	let:order
>
	{#if order}
		<MoxieOrder
			{moxieProvider}
			network={appsContext.network}
			layout="standalone"
			headingLevel={3}
			{order}
		/>
	{/if}
</MoxieOrderLoader>
