<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieAuction } from '$/api/moxie/auction/normalize'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'


	// Context
	import { preferences } from '$/state/preferences'


	// External state
	export let network: Ethereum.Network
	export let moxieProvider: MoxieProvider
	export let auctionId: string

	// (Computed)
	$: moxieProvider = $$props.moxieProvider || $preferences.moxieProvider


	// Outputs
	export let auction: MoxieAuction | undefined

	type SharedSlotProps = {
		auction: typeof auction,
		status: Loader['$$slot_def']['default']['status'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
			toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
		},
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { normalizeAuction } from '$/api/moxie/auction/normalize'


	// Components
	import Loader from '$/components/Loader.svelte'
</script>


<Loader
	{...$$restProps}
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
		...$$restProps.viewOptions,
	}}
	loadingIcon={moxieProviderIcons[moxieProvider]}
	loadingIconName={moxieProvider}
	loadingMessage={`Loading auction from ${moxieProvider}...`}
	errorMessage={`Couldn't load auction from ${moxieProvider}.`}
	fromQuery={createQuery({
		queryKey: ['MoxieAuction', {
			moxieProvider,
			chainId: network.chainId,
			auctionId,
		}],
		queryFn: async ({
			queryKey: [_, {
				chainId,
				auctionId,
			}],
		}) => {
			const { getAuction } = await import('$/api/moxie/auction')

			const result = await getAuction({
				chainId,
				auctionId,
			})

			if(!result?.auctionDetail)
				throw `Auction "${auctionId}" wasn't found.`

			return normalizeAuction(result.auctionDetail, chainId)
		},
		staleTime: 10 * 1000,
	})}
	bind:result={auction}
	let:result={auction}
	let:status
>
	<svelte:fragment slot="header"
		let:result={auction}
		let:status
		let:isOpen
		let:toggle
	>
		<slot name="header"
			{auction}
			{status}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{auction}
		{status}
	/>
</Loader>
