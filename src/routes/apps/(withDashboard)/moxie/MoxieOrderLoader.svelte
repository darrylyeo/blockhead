<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { MoxieOrder } from '$/api/moxie/auction/normalize'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'

	// External state
	export let network: Ethereum.Network
	export let moxieProvider: MoxieProvider
	export let orderId: string


	// Outputs
	export let order: MoxieOrder | undefined

	type SharedSlotProps = {
		order: typeof order,
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
	import { normalizeOrder } from '$/api/moxie/auction/normalize'


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
	loadingMessage={`Loading order from ${moxieProvider}...`}
	errorMessage={`Couldn't load order from ${moxieProvider}.`}
	fromQuery={createQuery({
		queryKey: ['MoxieOrder', {
			moxieProvider,
			chainId: network.chainId,
			orderId,
		}],
		queryFn: async ({
			queryKey: [_, {
				chainId,
				orderId,
			}],
		}) => {
			const { getOrder } = await import('$/api/moxie/auction')

			const result = await getOrder({
				chainId,
				orderId,
			})

			if(!result?.order)
				throw `Order "${orderId}" wasn't found.`

			return normalizeOrder(result.order, chainId)
		},
		staleTime: 10 * 1000,
	})}
	bind:result={order}
	let:result={order}
	let:status
>
	<svelte:fragment slot="header"
		let:result={order}
		let:status
		let:isOpen
		let:toggle
	>
		<slot name="header"
			{order}
			{status}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{order}
		{status}
	/>
</Loader>
