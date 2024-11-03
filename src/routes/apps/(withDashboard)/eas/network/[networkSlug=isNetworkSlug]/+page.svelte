<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { EasProvider, easProviderIcons } from '$/api/eas/provider'


	// Context
	import { appsContext } from '$/routes/apps/_appsContext.svelte'

	import { preferences } from '$/state/preferences'
	const easProvider = $derived(
		$preferences.easProvider ?? EasProvider.Easscan
	)


	// <Web3AppDashboard> embed
	let {
		network: _network,
	} = $props()

	const network: Ethereum.Network | undefined = $derived(
		_network ?? appsContext.network
	)


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import AnchorLink from '$/components/AnchorLink.svelte'
	import EasAttestation from '../../EasAttestation.svelte'
	import EasSchema from '../../EasSchema.svelte'
	import Loader from '$/components/Loader.svelte'
	import Loading from '$/components/Loading.svelte'
	import ScrollContainer from '$/components/ScrollContainer.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
</script>


<section class="column">
	<Loader
		viewOptions={{
			layout: 'collapsible',
			collapsibleType: 'label',
			containerClass: 'card',
		}}
		loadingMessage={`Loading attestations from ${easProvider}...`}
		loadingIcon={easProviderIcons[easProvider]}
		{...{
			[EasProvider.Easscan]: {
				fromInfiniteQuery: createInfiniteQuery({
					queryKey: ['EasAttestations', {
						easProvider,
						chainId: network?.chainId,
					}],
					initialPageParam: 0,
					queryFn: async ({
						queryKey: [_, {
							chainId,
						}],
						pageParam: skip,
					}) => {
						const { getAttestations } = await import('$/api/eas/easscan')

						return await getAttestations({
							chainId,
							orderByTime: 'desc',
							take: 20,
							skip,
						})
					},
					getNextPageParam: (lastPage, allPages) => allPages.length * 20,
					select: result => (
						result.pages
							.filter(isTruthy)
							.flatMap(page => (
								page
									.attestations
							))
							.filter(isTruthy)
					),
					staleTime: 10 * 1000,
				}),
			},
		}[easProvider]}
		let:result={attestations}
		let:pagination
	>
		<svelte:fragment
			slot="header"
			let:result={attestations}
			let:status
			let:pagination
			let:isOpen
			let:toggle
		>
			<header class="bar wrap">
				<h4>
					Recent Attestations
					{#if status === 'resolved'}
						(<TweenedNumber value={attestations?.length} />{#if pagination?.hasNextPage}+{/if})
					{/if}
				</h4>

				<span class="card-annotation">
					{easProvider}
				</span>

				<button
					class="small"
					data-after={isOpen ? '⏶' : '⏷'}
					on:click={toggle}
				>{isOpen ? 'Hide' : 'Show'}</button>
			</header>
		</svelte:fragment>

		<hr>

		<ScrollContainer
			{pagination}
		>
			{#each attestations ?? [] as attestation (attestation.id)}
				<AnchorLink
					base={`/apps/eas/network/${network.slug}`}
					link={`/attestation/${attestation.id}`}
				>
					<EasAttestation
						{easProvider}
						{network}
						{attestation}
					/>
				</AnchorLink>
			{/each}
			
			<svelte:fragment slot="after">
				{#if pagination?.isFetchingNextPage}
					<Loading
						icon={{
							src: easProviderIcons[easProvider],
							name: easProvider,
						}}
						iconAnimation="hover"
					>
						Loading more attestations via {easProvider}...
					</Loading>
				{/if}
			</svelte:fragment>
		</ScrollContainer>
	</Loader>
</section>


<section class="column">
	<Loader
		viewOptions={{
			layout: 'collapsible',
			collapsibleType: 'label',
			containerClass: 'card',
		}}
		loadingMessage={`Loading schemas from ${easProvider}...`}
		loadingIcon={easProviderIcons[easProvider]}
		{...{
			[EasProvider.Easscan]: {
				fromInfiniteQuery: createInfiniteQuery({
					queryKey: ['EasSchemas', {
						easProvider,
						chainId: network?.chainId,
					}],
					initialPageParam: 0,
					queryFn: async ({
						queryKey: [_, {
							chainId,
						}],
						pageParam: skip,
					}) => {
						const { getSchemas } = await import('$/api/eas/easscan')

						return await getSchemas({
							chainId,
							orderByTime: 'asc',
							take: 20,
							skip,
						})
					},
					getNextPageParam: (lastPage, allPages) => allPages.length * 20,
					select: result => (
						result.pages
							.filter(isTruthy)
							.flatMap(page => (
								page
									.schemata
							))
							.filter(isTruthy)
					),
					staleTime: 10 * 1000,
				}),
			},
		}[easProvider]}
		let:result={schemas}
		let:pagination
	>
		<svelte:fragment
			slot="header"
			let:result={schemas}
			let:status
			let:pagination
			let:isOpen
			let:toggle
		>
			<header class="bar wrap">
				<h4>
					Schemas
					{#if status === 'resolved'}
						(<TweenedNumber value={schemas?.length} />{#if pagination?.hasNextPage}+{/if})
					{/if}
				</h4>

				<span class="card-annotation">
					{easProvider}
				</span>

				<button
					class="small"
					data-after={isOpen ? '⏶' : '⏷'}
					on:click={toggle}
				>{isOpen ? 'Hide' : 'Show'}</button>
			</header>
		</svelte:fragment>

		<hr>

		<ScrollContainer
			{pagination}
		>
			{#each schemas ?? [] as schema (schema.id)}
				<AnchorLink
					base={`/apps/eas/network/${network.slug}`}
					link={`/schema/${schema.id}`}
				>
					<EasSchema
						{network}
						{schema}
					/>
				</AnchorLink>
			{/each}
			
			<svelte:fragment slot="after">
				{#if pagination?.isFetchingNextPage}
					<Loading
						icon={{
							src: easProviderIcons[easProvider],
							name: easProvider,
						}}
						iconAnimation="hover"
					>
						Loading more schemas via {easProvider}...
					</Loading>
				{/if}
			</svelte:fragment>
		</ScrollContainer>
	</Loader>
</section>
