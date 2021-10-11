<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let domain: ENS.Domain
	export let registrations


	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showTransactions = false


	let sortSubdomains


	import { formatTransactionHash } from '../utils/formatTransactionHash'


	import Address from './Address.svelte'
	import EnsName from './EnsName.svelte'
	import EnsDomainEvent from './EnsDomainEvent.svelte'
	import EnsResolver from './EnsResolver.svelte'


	import { scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
</script>


<style>
	.status {
		justify-content: space-between;
	}

	.columns {
		/* display: flex;
		flex-wrap: wrap; */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		align-items: stretch;
		gap: var(--padding-inner);
	}
	.columns > * {
		flex: 1 16rem;
		padding: var(--padding-outer);
	}

	.subdomains {
		--padding-inner: 1em;
		font-size: 0.8em;

		display: flex;
		flex-wrap: wrap;
		/* margin: calc(-0.5 * var(--padding-inner)); */
		justify-content: space-evenly;
	}
	.subdomain {
		/* padding: calc(0.5 * var(--padding-inner)); */
		flex: 0 auto;
		max-width: 20em;
	    overflow: hidden;
		text-overflow: ellipsis;
	}

	h4 {
		display: inline-block;
	}
</style>


<div class="card domain">
	<div class="bar">
		<h2><EnsName {network} ensName={domain.name} /></h2>
		<span class="card-annotation">ENS Domain{domain.isMigrated ? ` (ERC721)` : ''}</span>
	</div>

	<hr>

	<div class="bar">
		<h3>Current Status</h3>

		<span class="card-annotation">
			<a href="/apps/ens#subgraph">ENS Subgraph</a> › {domain.__typename.replace(/[A-Z]/g, m => ` ${m}`).trim()} › <output>{formatTransactionHash(domain.id, 'middle-truncated')}</output>
		</span>
	</div>

	<div class="status card row">
		{#if domain.parent}
			{#if domain.parent.name}
				<span>
					<h4><abbr title={`ENS operates on a system of dot-separated hierarchical names called domains, with the owner of a domain having full control over subdomains. Because of the hierarchical nature of ENS, anyone who owns a domain at any level may configure subdomains - for themselves or others - as desired.\n\nSource: https://docs.ens.domains`}>Subdomain</abbr> of</h4>
					<EnsName {network} ensName={domain.parent.name || domain.parent.id} />
				</span>
			{:else if domain.parent.id === '0x0000000000000000000000000000000000000000000000000000000000000000'}
				<h4><abbr title={`Top-level domains, like ‘.eth’ and ‘.test’, are owned by smart contracts called registrars, which specify rules governing the allocation of their subdomains.\n\nSource: https://docs.ens.domains`}>Top-level domain</abbr></h4>
			{/if}
		{/if}

		{#if domain.labelName}
			<span>
				<h4><abbr title={`An individual component of a name, such as "${domain.labelName}". Names may consist of multiple parts, called labels, separated by dots.\n\nSource: https://docs.ens.domains/terminology`}>labeled</abbr></h4>
				<abbr title={`Label: ${domain.labelName}\nHash: ${domain.labelhash}`}><output>{domain.labelName}</output></abbr>
			</span>
		{/if}

		{#if domain.owner}
			<span>
				<h4><abbr title={`The owner of a name is the entity referenced in the ENS registry's owner field. An owner may transfer ownership, set a resolver or TTL, and create or reassign subdomains.\n\nSource: https://docs.ens.domains/terminology`}>owned by</abbr></h4>
				<span class="owner">
					{#if domain.owner.id === '0x0000000000000000000000000000000000000000'}
						no one
						<small>(<Address {network} address={domain.owner.id} format="middle-truncated" />)</small>
					{:else}
						<Address {network} address={domain.owner.id} format="middle-truncated" />
					{/if}
				</span>
			</span>
		{/if}

		{#if domain.resolvedAddress}
			<span>
				<h4><abbr title={`Resolver Contract: ${domain.resolver.address}`}>resolving to address</abbr></h4>
				<span class="resolved-address"><Address {network} address={domain.resolvedAddress.id} format="middle-truncated" /></span>
			</span>
		{/if}
	</div>

	<!-- <div class="columns">
		{#if domain.resolvedAddress}
			<div class="card">
				<h4>Resolved Ethereum Address</h4>
				<Address {network} address={domain.resolvedAddress.id} />
			</div>
		{/if}
		{#if domain.owner}
			<div class="card">
				<h4>Owned by</h4>
				<Address {network} address={domain.owner.id} />
			</div>
		{/if}
		{#if domain.resolver}
			<div class="card">
				<h4>Resolver Contract</h4>
				<Address {network} address={domain.resolver.address} />
			</div>
		{/if}
		{#if domain.parent}
			<div class="card">
				<h4>Subdomain of</h4>
				<EnsName {network} ensName={domain.parent.name || domain.parent.id} />
			</div>
		{/if}
	</div> -->

	{#if domain.subdomains && domain.subdomains.length}
		<hr>

		<div class="bar">
			<h3>Subdomains ({domain.subdomains.length}{domain.subdomains.length === 100 ? '+' : ''})</h3>

			<label>
				<span>Sort</span>
				<select bind:value={sortSubdomains}>
					<option value={(subdomain1, subdomain2) => subdomain1.name.localeCompare(subdomain2.name)} selected>Alphabetical</option>
					<option value={(subdomain1, subdomain2) => subdomain1.name.length - subdomain2.name.length}>Shortest</option>
					<option value={(subdomain1, subdomain2) => subdomain2.name.length - subdomain1.name.length}>Longest</option>
				</select>
			</label>
		</div>

		<div class="card">
			<div class="subdomains">
				{#each domain.subdomains.sort(sortSubdomains) || domain.subdomains.sort(sortSubdomains) as subdomain, i (subdomain.name)}
					<span class="subdomain" animate:flip|local={{duration: 500, delay: Math.random() * domain.subdomains.length * 5, easing: quintOut}}>
						<EnsName {network} ensName={subdomain.name} />
					</span>
				{/each}
			</div>
		</div>
	{/if}

	{#if domain.events}
		<hr>

		<div class="bar">
			<div class="row">
				<h3>
					Transaction History
					({domain.events.length}{domain.events.length === 100 ? '+' : ''})
				</h3>

				{#if showTransactions}
					<button class="small" on:click={() => showTransactions = false} transition:scale>Hide</button>
				{/if}
			</div>

			{#if showTransactions}
				<label transition:scale>
					<input type="checkbox" bind:checked={showFees}>
					<span>Show Fees</span>
				</label>
				<label transition:scale>
					<span>View</span>
					<select bind:value={detailLevel}>
						<option value="summary">Summary</option>
						<option value="detailed">Detailed</option>
						<option value="exhaustive">Exhaustive</option>
					</select>
				</label>
			{:else}
				<button class="small" on:click={() => showTransactions = true} transition:scale>Show</button>
			{/if}
			<!-- <button class="small" on:click={() => showTransactions = !showTransactions}>{showTransactions ? 'Hide' : 'Show'} transactions</button> -->
		</div>

		{#if showTransactions}
			<div class="column" class:scrollable-list={domain.events.length > 4}>
				{#each [...domain.events].reverse() as event (event.id)}
					<EnsDomainEvent
						{network}
						{event}

						{detailLevel}
					/>
				{/each}
			</div>
		{/if}
	{/if}

	<!-- <hr>

	<div class="footer bar">
		{#if domain.labelName}
			<span>Label: {domain.labelName}</span>
		{/if}
		{#if domain.labelhash}
			<span>Label hash: <output>{formatTransactionHash(domain.labelhash, 'middle-truncated')}</output></span>
		{/if}
	</div> -->
</div>