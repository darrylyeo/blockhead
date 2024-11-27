<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'


	export let network: Ethereum.Network
	export let searchQuery: string


	import { createQuery } from '@tanstack/svelte-query'


	const sortByLength = (a, b) => a.name.length - b.name.length


	import EnsName from './EnsName.svelte'
	import EnsDomain from './EnsDomain.svelte'
	import Loader from './Loader.svelte'


	import { ENSIcon } from '$/assets/icons'
</script>


<style>
	.ens-query {
		gap: 1.5em;
	}

	.similar {
		display: flex;
		font-size: 0.8em;
		flex-wrap: wrap;
	}
	.similar > :global(*) {
		flex: 1 25rem;
	}
	/* .similar {
		font-size: 0.8em;
	} */
</style>


<Loader
	fromQuery={createQuery({
		queryKey: ['EnsName', {
			name: searchQuery,
		}],
		queryFn: async () => {
			const { getEnsName } = await import('$/api/ens')

			return await getEnsName({
				name: searchQuery,
			})
		},
		select: result => (
			result?.domains[0] ?? null
		),
	})}
	loadingIcon={ENSIcon}
	loadingIconName="The Graph"
	loadingMessage='Searching for "{searchQuery}" in the Ethereum Name Service subgraph...'
	let:result={domain}
>
	<div class="ens-query column">
		{#if domain}
			<EnsDomain
				{network}
				{domain}
				showGraph
				showRecordResolver
				showRecords
			/>
		{:else}
			<div class="card">
				<div class="bar">
					<h2><EnsName {network} ensName={searchQuery} showAvatar showName /></h2>
					<span class="card-annotation">ENS Name</span>
				</div>
				<div class="bar">
					<p>The ENS name "{searchQuery}" hasn't been registered by anyone. Perhaps you could claim it for yourself!</p>

					<a
						href="https://app.ens.domains/name/{searchQuery}"
						target="_blank"
						class="button medium"
					>
						Register On ENS
					</a>
				</div>
			</div>
		{/if}

		<Loader
			viewOptions={{
				showIf: domains => domains?.length
			}}
			fromQuery={createQuery({
				queryKey: ['EnsDomain', {
					domain: searchQuery,
				}],
				queryFn: async () => {
					const { getEnsDomainsContaining } = await import('$/api/ens')

					return await getEnsDomainsContaining({
						query: searchQuery,
					})
				},
				select: result => (
					result?.domains
				),
			})}
			loadingIcon={ENSIcon}
			loadingIconName="The Graph"
			loadingMessage="Searching the Ethereum Name Service subgraph for similar names..."
			let:result={domains}
		>
			<svelte:fragment slot="header"
				let:result={domains}
				let:status
			>
				{#if status === 'resolved' && domains?.length}
					<hr>
					<h2>Similar ENS Names</h2>
				{/if}
			</svelte:fragment>

			<div class="similar column scrollable-list">
				{#each domains?.sort(sortByLength) ?? [] as domain (domain.id)}
					<EnsDomain {network} {domain} />
				{/each}
			</div>
		</Loader>
	</div>
</Loader>
