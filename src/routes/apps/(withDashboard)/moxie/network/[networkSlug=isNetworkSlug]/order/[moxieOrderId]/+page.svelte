<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import {
		network,
	} from '$/routes/apps/_appsContext'

	import {
		moxieOrderId,
	} from '$/routes/apps/_appsParams'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieOrder from '../../../../MoxieOrder.svelte'
	import MoxieOrderLoader from '../../../../MoxieOrderLoader.svelte'
</script>


<MoxieOrderLoader
	{moxieProvider}
	network={$network}
	orderId={$moxieOrderId}
	let:order
>
	{#if order}
		<MoxieOrder
			{moxieProvider}
			network={$network}
			layout="standalone"
			headingLevel={3}
			{order}
		/>
	{/if}
</MoxieOrderLoader>
