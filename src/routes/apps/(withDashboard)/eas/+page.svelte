<script lang="ts">
	// Types/constants
	import { EasProvider, easProviderIcons } from '$/api/eas/provider'


	// Context
	import { preferences } from '$/state/preferences'

	$: easProvider = $preferences.easProvider ?? EasProvider.Easscan

	let chainId = 1


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import EasAttestation from './EasAttestation.svelte'
	import EasSchema from './EasSchema.svelte'
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
						chainId,
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
							take: 100,
							skip,
						})
					},
					getNextPageParam: (lastPage, allPages) => allPages.length * 100,
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
		>
			<header class="bar wrap">
				<h3>
					Recent Attestations
					{#if status === 'resolved'}
						(<TweenedNumber value={attestations?.length} />{#if pagination?.hasNextPage}+{/if})
					{/if}
				</h3>

				<span class="card-annotation">
					{easProvider}
				</span>
			</header>
		</svelte:fragment>

		<hr>

		<ScrollContainer
			{pagination}
		>
			{#each attestations as attestation (attestation.id)}
				<EasAttestation
					{attestation}
				/>
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
	<Loader debug
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
						chainId,
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
							orderByTime: 'desc',
							take: 100,
							skip,
						})
					},
					getNextPageParam: (lastPage, allPages) => allPages.length * 100,
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
		>
			<header class="bar wrap">
				<h3>
					Recent Schemas
					{#if status === 'resolved'}
						(<TweenedNumber value={schemas?.length} />{#if pagination?.hasNextPage}+{/if})
					{/if}
				</h3>

				<span class="card-annotation">
					{easProvider}
				</span>
			</header>
		</svelte:fragment>

		<hr>

		<ScrollContainer
			{pagination}
		>
			{#each schemas as schema (schema.id)}
				<EasSchema
					{schema}
				/>
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
