<script lang="ts">
	// Types/constants
	import { MoxieProvider } from '$/api/moxie/provider'


	// Context
	import {
		network,
	} from '$/routes/apps/_appsContext'

	import {
		moxieAuctionId,
	} from '$/routes/apps/_appsParams'

	import { preferences } from '$/state/preferences'

	$: moxieProvider = $preferences.moxieProvider ?? MoxieProvider.TheGraph


	// Components
	import MoxieAuctionLoader from '../../../../MoxieAuctionLoader.svelte'
	import MoxieAuction from '../../../../MoxieAuction.svelte'
</script>


<MoxieAuctionLoader
	{moxieProvider}
	network={$network}
	auctionId={$moxieAuctionId}
	let:auction
>
	{#if auction}
		<MoxieAuction
			{moxieProvider}
			network={$network}
			layout="standalone"
			headingLevel={3}
			{auction}
		/>
	{/if}
</MoxieAuctionLoader>
