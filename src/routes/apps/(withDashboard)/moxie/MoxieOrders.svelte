<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'
	import type { MoxieOrder as _MoxieOrder } from '$/api/moxie/auction/normalize'


	// Inputs
	export let moxieProvider: MoxieProvider
	export let network: Ethereum.Network
	export let orders: _MoxieOrder[]

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3
	export let showFormattedNames = true
	export let showFormattedTokenSymbols = true


	// Events
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import AnchorLink from '$/components/AnchorLink.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import Loader from '$/components/Loader.svelte'
	import Loading from '$/components/Loading.svelte'
	import ScrollContainer from '$/components/ScrollContainer.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
	import MoxieOrder from './MoxieOrder.svelte'
</script>


<Collapsible
	type="label"
	class="column"
	{...$$restProps}
>
	<svelte:fragment slot="header"
		let:isOpen let:toggle
	>
		<header class="bar wrap">
			<svelte:element this={`h${headingLevel}`}>
				<slot name="title">
					Orders
				</slot>

				(<TweenedNumber value={orders?.length} />{#if pagination?.hasNextPage}+{/if})
			</svelte:element>

			<span class="card-annotation">
				{moxieProvider}
			</span>

			<button
				class="small"
				data-after={isOpen ? '⏶' : '⏷'}
				on:click={toggle}
			>{isOpen ? 'Hide' : 'Show'}</button>
		</header>
	</svelte:fragment>

	<hr />

	<ScrollContainer
		{pagination}
	>
		{#each orders as order (order.id)}
			<AnchorLink
				base={`/apps/moxie/network/${network.slug}`}
				link={`/order/${order.id}`}
			>
				<MoxieOrder
					{network}
					{order}
					{showFormattedNames}
					{showFormattedTokenSymbols}
				/>
			</AnchorLink>
		{/each}

		<svelte:fragment slot="after">
			{#if pagination?.isFetchingNextPage}
				<Loading
					icon={{
						src: moxieProviderIcons[moxieProvider],
						name: moxieProvider,
					}}
					iconAnimation="hover"
				>
					Loading more orders via {moxieProvider}...
				</Loading>
			{/if}
		</svelte:fragment>
	</ScrollContainer>
</Collapsible>
