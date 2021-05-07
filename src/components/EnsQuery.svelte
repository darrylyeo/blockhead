<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { queryENSDomain, queryENSDomainsContaining } from '../data/ens'

	export let network: Ethereum.Network
	export let query: string
	
	const sortByLength = (a, b) => a.name.length - b.name.length
	
	import Address from './Address.svelte'
	import EnsDomain from './EnsDomain.svelte'
	import Loader from './Loader.svelte'
</script>

<style>
	.ens-query {
		gap: 1.5em;
	}
</style>

<Loader
	fromStore={() => queryENSDomain(query)}
	loadingIcon="/logos/ens.svg"
	loadingIconName="The Graph"
	loadingMessage="Querying the Ethereum Name Service..."
	result={{}}
	let:then={{domains}}
>
	<div class="ens-query column">
		{#each domains.sort(sortByLength) as domain (domain.id)}
			<EnsDomain {network} {domain}/>
		{:else}
			<div class="card">
				<div class="bar">
					<h2><Address {network} address={query} /></h2>
					<span class="card-annotation">ENS Name</span>
				</div>
				<div class="bar">
					<p>The ENS name "{query}" hasn't been registered by anyone. Perhaps you could claim it for yourself!</p>
					<a href="https://app.ens.domains/name/{query}" target="_blank"><button class="medium">Register On ENS</button></a>
				</div>
			</div>
		{/each}

		<Loader
			fromStore={() => queryENSDomainsContaining(query)}
			loadingIcon="/logos/ens.svg"
			loadingIconName="The Graph"
			loadingMessage="Querying the Ethereum Name Service for similar names..."
			result={{}}
			let:then={{domains}}
			showIf={({domains} = {}) => domains.length}
		>
			<svelte:fragment slot="header" let:status>
				{#if status === 'resolved'}
					<hr>
					<h2>Similar ENS Names</h2>
				{/if}
			</svelte:fragment>

			{#each domains.sort(sortByLength) as domain (domain.id)}
				<EnsDomain {network} {domain}/>
			{/each}
		</Loader>
	</div>
</Loader>