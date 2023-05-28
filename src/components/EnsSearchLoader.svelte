<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let searchQuery: string


	// import { queryENSDomain, queryENSDomainsContaining } from '../api/ens'

	import { graphql } from '$houdini'

	/* @type { import('./$houdini')._ENSDomainQueryVariables } */
	export const _ENSDomainQueryVariables = ({ props: { searchQuery } }) => ({
		name: searchQuery
	})
	const ensDomainQuery = graphql(`
		query ENSDomainQuery($name: String!) @load {
			domains(where: {name: $name}) {
				__typename
				id
				name
				labelName
				labelhash
				parent { id name }
				subdomains { id name }
				resolvedAddress {
					__typename
					id
				}
				owner {
					__typename
					id
				}
				resolver {
					__typename
					id
					domain { id }
					address
					addr { id }
					texts
					coinTypes
					events { id blockNumber transactionID }
				}
				ttl
				isMigrated
				events {
					__typename
					id
					blockNumber
					transactionID
					... on Transfer {
						owner { id }
					}
					... on NewOwner {
						owner { id }
					}
					... on NewResolver {
						resolver { id address }
					}
					... on NewTTL {
						ttl
					}
				}
			}
		}
	`)

	/* @type { import('./$houdini')._ENSDomainsContainingQueryVariables } */
	export const _ENSDomainsContainingQueryVariables = ({ props: { searchQuery } }) => ({
		query: searchQuery
	})
	const ensDomainsContainingQuery = graphql(`
		query ENSDomainsContainingQuery($query: String!) @load {
			domains(where: {name_contains: $query, name_not: $query}) {
				__typename
				id
				name
				labelName
				labelhash
				parent { id name }
				subdomains { id name }
				resolvedAddress {
					__typename
					id
				}
				owner {
					__typename
					id
				}
				resolver {
					__typename
					id
					domain { id }
					address
					addr { id }
					texts
					coinTypes
					events { id blockNumber transactionID }
				}
				ttl
				isMigrated
				events {
					__typename
					id
					blockNumber
					transactionID
					... on Transfer {
						owner { id }
					}
					... on NewOwner {
						owner { id }
					}
					... on NewResolver {
						resolver { id address }
					}
					... on NewTTL {
						ttl
					}
				}
			}
		}
	`)


	const sortByLength = (a, b) => a.name.length - b.name.length


	import EnsName from './EnsName.svelte'
	import EnsDomain from './EnsDomain.svelte'
	import Loader from './Loader.svelte'


	import { ENSIcon } from '../assets/icons'
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


	<!-- fromHoudiniQuery={searchQuery && (() => queryENSDomain({name: searchQuery}))} -->
<Loader
	fromHoudiniQuery={searchQuery && (() => ensDomainQuery)}
	loadingIcon={ENSIcon}
	loadingIconName="The Graph"
	loadingMessage='Searching for "{searchQuery}" in the Ethereum Name Service subgraph...'
	let:result={result}
>
	<div class="ens-query column">
		{#each result.domains.sort(sortByLength) as domain (domain.id)}
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
					<a href="https://app.ens.domains/name/{searchQuery}" target="_blank"><button class="medium">Register On ENS</button></a>
				</div>
			</div>
		{/each}

			<!-- fromHoudiniQuery={() => queryENSDomainsContaining({query: searchQuery})} -->
		<Loader
			fromHoudiniQuery={() => ensDomainsContainingQuery}
			loadingIcon={ENSIcon}
			loadingIconName="The Graph"
			loadingMessage="Searching the Ethereum Name Service subgraph for similar names..."
			let:result={result}
			showIf={result => result?.domains.length}
		>
			<svelte:fragment slot="header" let:status>
				{#if status === 'resolved' && result?.domains.length}
					<hr>
					<h2>Similar ENS Names</h2>
				{/if}
			</svelte:fragment>

			<div class="similar column scrollable-list">
				{#each result.domains.sort(sortByLength) as domain (domain.id)}
					<EnsDomain {network} {domain} />
				{/each}
			</div>
		</Loader>
	</div>
</Loader>
