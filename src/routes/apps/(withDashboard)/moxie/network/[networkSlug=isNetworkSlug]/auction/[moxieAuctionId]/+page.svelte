<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import { appsContext } from '$/routes/apps/_appsContext.svelte'

	import { appsParams } from '$/routes/apps/_appsParams.svelte'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieAuctionLoader from '../../../../MoxieAuctionLoader.svelte'
	import MoxieAuction from '../../../../MoxieAuction.svelte'
</script>


<MoxieAuctionLoader
	{moxieProvider}
	network={appsContext.network}
	auctionId={appsParams.moxieAuctionId}
	let:auction
>
	{#if auction}
		<MoxieAuction
			{moxieProvider}
			network={appsContext.network}
			layout="standalone"
			headingLevel={3}
			{auction}
		/>
	{/if}
</MoxieAuctionLoader>
