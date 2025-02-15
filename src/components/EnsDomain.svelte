<script lang="ts">
	import type { ENS } from '$/api/ens'
	import type { Ethereum } from '$/data/networks/types'


	export let network: Ethereum.Network
	export let domain: ENS.Domain
	// export let registrations


	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let showGraph = false

	export let showRecordResolver = false
	export let showRecords = false


	$: hasSetResolver = domain.resolver?.address !== '0x0000000000000000000000000000000000000000'


	let sortSubdomains: (d1: ENS.Domain['subdomains'], d2: ENS.Domain['subdomains']) => number


	import { formatAddress } from '$/utils/formatAddress'
	import { formatTransactionHash } from '$/utils/formatTransactionHash'
	import { isTruthy } from '$/utils/isTruthy'
	import { withProps } from '$/utils/withProps'


	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import EnsName from './EnsName.svelte'
	import EnsDomainEvent from './EnsDomainEvent.svelte'
	import EnsRecords from './EnsRecords.svelte'
	import EnsResolver from './EnsResolver.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import Svelvet from './Svelvet.svelte'


	import { fade, scale } from 'svelte/transition'
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
		grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
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

	.entity-id {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>


<div class="card domain">
	<div class="bar wrap">
		<h2><EnsName {network} ensName={domain.name} /></h2>
		<span class="card-annotation">ENS Domain{domain.isMigrated ? ` (ERC721)` : ''}</span>
	</div>

	{#if showGraph}
		<Svelvet
			defaultNode={{
				className: 'card',
				bgColor: 'var(--card-background-color)',
				borderRadius: 5,
				borderColor: 'transparent',
				width: 180,
				height: 58,
			}}
			defaultEdge={{
				labelBgColor: 'rgba(var(--rgb-light-dark), 0.3)',
				labelTextColor: 'rgba(var(--rgb-light-dark-inverse), 0.8)',
				edgeColor: 'rgba(var(--rgb-light-dark-inverse), 0.3)',
				arrow: true,
				arrowHeadSize: 20,
				noHandle: true,
				// animate: true,
			}}
			nodes={[
				domain.parent && {
					id: 'domain.parent',
					position: { x: -320, y: -80 },
					data: {
						label: domain.parent.name
					},
				},
				{
					id: 'domain',
					position: { x: 0, y: 0 },
					data: {
						label: domain.name
					},
					childNodes: [
						domain.resolver && 'domain.resolver',
						domain.owner && 'domain.owner',
						domain.parent && 'domain.parent',
						domain.resolvedAddress && 'domain.resolvedAddress',
					].filter(isTruthy),
				},
				...(domain.subdomains ?? []).map((subdomain, i, { length }) => ({
					id: `domain.subdomain.${i}`,
					position: { x: 320 - i * 320 / 3, y: 80 + i * 70 },
					data: {
						label: subdomain.name,
					},
				})),
				domain.owner && {
					id: 'domain.owner',
					position: { x: 0, y: -150 },
					data: {
						custom: withProps(Address, {
							address: domain.owner.id,
							format: 'middle-truncated',
						})
					},
				},
				domain.resolver && {
					id: 'domain.resolver', // domain.resolver.address
					position: { x: -320, y: 80 },
					data: {
						custom: withProps(Address, {
							address: domain.resolver.address,
							format: 'middle-truncated',
						})
						// html: `
						// 	<h4>Resolver</h4>
						// 	<br>
						// 	<p>${formatAddress(domain.resolver.address, 'middle-truncated')}</p>
						// `,
					},
				},
				domain.resolvedAddress && {
					id: 'domain.resolvedAddress',
					position: { x: 320, y: -80 },
					data: {
						custom: withProps(Address, {
							address: domain.resolvedAddress.id,
							format: 'middle-truncated',
						})
					},
				},
			].filter(isTruthy)}

			edges={[
				domain.parent && {
					id: "domain|domain.parent",
					source: 'domain',
					target: 'domain.parent',
					label: 'subdomain of',
				},
				domain.resolver && {
					id: "domain|domain.resolver",
					source: 'domain',
					target: 'domain.resolver',
					label: 'resolves records via',
				},
				domain.resolvedAddress && {
					id: "domain|domain.resolvedAddress",
					source: 'domain',
					target: 'domain.resolvedAddress',
					label: 'resolves to',
				},
				domain.owner && {
					id: "domain|domain.owner",
					source: 'domain',
					target: 'domain.owner',
					label: 'owned by',
				},
				...(domain.subdomains ?? []).map((subdomain, i, { length }) => ({
					id: `domain|domain.subdomain.${i}`,
					source: 'domain',
					target: `domain.subdomain.${i}`,
					label: 'subdomain',
				})),
			].filter(isTruthy)}

			initialLocation={domain.subdomains?.length > 2 ? { x: 90, y: 80 } : { x: 90, y: 0 }}
			initialZoom={domain.subdomains?.length > 2 ? 0.8 : 1}
		/>
	{/if}

	<hr>

	<div class="bar wrap">
		<h3>Current Status</h3>

		<span class="card-annotation">
			<a href="/apps/ens#subgraph">The Graph › ENS</a> › {domain.__typename.replace(/[A-Z]/g, m => ` ${m}`).trim()} › <span class="entity-id" title="Entity ID {domain.id}">{formatTransactionHash(domain.id, 'middle-truncated')}</span>
		</span>
	</div>

	<div class="status card row wrap">
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

	{#if domain.resolver}
		<hr>

		<Collapsible
			type="details"
			class="column"
			bind:isOpen={showRecordResolver}
			let:isOpen
		>
			<h3 slot="title">Record Resolver</h3>

			<svelte:fragment slot="header-right">
				<span class="card-annotation" transition:scale>
					<a href="/apps/ens#subgraph">The Graph › ENS</a> › {domain.resolver.__typename.replace(/[A-Z]/g, m => ` ${m}`).trim()} › <span class="emtity-id">{formatTransactionHash(domain.resolver.id, 'middle-truncated')}</span>
				</span>
			</svelte:fragment>

			{#if isOpen}
				{#if hasSetResolver}
					<EnsResolver {network} resolver={domain.resolver} />
				{:else}
					<div class="card">
						<p><EnsName ensName={domain.name} /> isn't currently associated with a record resolver.</p>
					</div>
				{/if}
			{/if}
		</Collapsible>

		{#if hasSetResolver}
			<hr>

			<EnsRecords
				{network}
				resolver={domain.resolver}
				ensName={domain.name}
				isOpen={showRecords}
			>
				<header slot="header" class="bar wrap" let:networkProvider>
					<h3>Records</h3>

					<div class="row">
						<span class="card-annotation">{networkProvider}</span>

						<button
							class="small"
							data-after={showRecords ? '⏶' : '⏷'}
							on:click={() => showRecords = !showRecords}
						>{showRecords ? 'Hide' : 'Show'}</button>
					</div>
				</header>
			</EnsRecords>
		{/if}
	{/if}
	

	{#if domain.subdomains?.length}
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
				{#each domain.subdomains.sort(sortSubdomains) as subdomain, i (subdomain.name)}
					<span class="subdomain" animate:flip|local={{duration: 500, delay: Math.random() * domain.subdomains.length * 5, easing: quintOut}}>
						<EnsName {network} ensName={subdomain.name} />
					</span>
				{/each}
			</div>
		</div>
	{/if}

	{#if domain.events}
		<hr>

		<Collapsible let:isOpen>
			<h3 slot="title">
				History
				({domain.events.length}{domain.events.length === 100 ? '+' : ''})
			</h3>

			<svelte:fragment slot="toolbar-items" let:isOpen>
				{#if isOpen}
					<div class="row wrap align-end" transition:scale={{ start: 0.8, duration: 250 }}>
						<label>
							<input type="checkbox" bind:checked={showFees}>
							<span>Fees</span>
						</label>

						<label>
							<span>View</span>
							<select bind:value={detailLevel}>
								<option value="summary">Summary</option>
								<option value="detailed">Detailed</option>
								<option value="exhaustive">Exhaustive</option>
							</select>
						</label>
					</div>
				{/if}
			</svelte:fragment>

			{#if isOpen}
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
		</Collapsible>
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
