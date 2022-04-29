<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let searchQuery: string


	import type { ENSDomains, ENSDomains$input, ENSDomainsContaining, ENSDomainsContaining$input } from '$houdini'
	import { query, graphql } from '$houdini'

	const queryENSDomain = (variables: ENSDomains$input) => {
		const ENSDomainsVariables = () => variables

		return query<ENSDomains>(graphql`
			query ENSDomains($name: String!) {
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
	}

	const queryENSDomainsContaining = (variables: ENSDomainsContaining$input) => {
		const ENSDomainsContainingVariables = () => variables

		return query<ENSDomainsContaining>(graphql`
			query ENSDomainsContaining($query: String!) {
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
	}


	const sortByLength = (a, b) => a.name.length - b.name.length


	import EnsName from './EnsName.svelte'
	import EnsDomain from './EnsDomain.svelte'
	import Loader from './Loader.svelte'
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
	fromHoudiniQuery={searchQuery && (() => queryENSDomain({name: searchQuery}))}
	loadingIcon="/logos/ens.svg"
	loadingIconName="The Graph"
	loadingMessage='Searching for "{searchQuery}" in the Ethereum Name Service subgraph...'
	let:result={result}
>
	<div class="ens-query column">
		{#each result.domains.sort(sortByLength) as domain (domain.id)}
			<EnsDomain {network} {domain} />
		{:else}
			<div class="card">
				<div class="bar">
					<h2><EnsName {network} ensName={searchQuery} /></h2>
					<span class="card-annotation">ENS Name</span>
				</div>
				<div class="bar">
					<p>The ENS name "{searchQuery}" hasn't been registered by anyone. Perhaps you could claim it for yourself!</p>
					<a href="https://app.ens.domains/name/{searchQuery}" target="_blank"><button class="medium">Register On ENS</button></a>
				</div>
			</div>
		{/each}

		<Loader
			fromHoudiniQuery={() => queryENSDomainsContaining({query: searchQuery})}
			loadingIcon="/logos/ens.svg"
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