<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { getAttestation } from '$/api/eas/easscan'
	
	
	// Inputs
	export let network: Ethereum.Network
	export let attestation: NonNullable<NonNullable<Awaited<ReturnType<typeof getAttestation>>>['attestation']>

	// (View options)
	export let isOpen = false
	export let headingLevel = 4

	// (Derived)
	$: schemaName = attestation.schema.schemaNames?.[0]?.name


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import EasSchema from './EasSchema.svelte'
	import IpfsContentDetails from '$/components/IpfsContentDetails.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
</script>


<article class="card">
	<Collapsible
		class="column"
		showTriggerText={false}
		{isOpen}
	>
		<svelte:fragment slot="title">
			<a
				href={resolveRoute('/apps/eas/network/[networkSlug]/attestation/[attestationId]', {
					networkSlug: network.slug,
					attestationId: attestation.id,
				})}
			>
				<svelte:element this={`h${headingLevel}`}>
					<Address
						{network}
						address={attestation.recipient}
						format="middle-truncated"
					/>

					<span>received</span>

					<span>{schemaName ? ` "${schemaName}"` : ''}</span>

					<span>from</span>

					<Address
						{network}
						address={attestation.attester}
						format="middle-truncated"
					/>

					<DateComponent
						date={attestation.timeCreated * 1000}
						format="relative"
						layout="horizontal"
					/>
				</svelte:element>
			</a>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				EAS Attestation
			</span>
		</svelte:fragment>

		<dl>
			<div>
				<dt>Attester</dt>

				<dd>
					<Address
						{network}
						address={attestation.attester}
					/>
				</dd>
			</div>

			<div>
				<dt>Recipient</dt>

				<dd>
					<Address
						{network}
						address={attestation.recipient}
					/>
				</dd>
			</div>

			<div>
				<dt>Location</dt>

				<dd>
					{#if attestation.isOffchain}
						Offchain
					{:else}
						<span class="row inline">
							<NetworkIcon
								{network}
							/>
							{network.name}
						</span>
					{/if}
				</dd>
			</div>

			{#if attestation.schema.revocable}
				<div>
					<dt>Revoked?</dt>

					<dd>
						{attestation.revoked ? 'Yes' : 'No'}
					</dd>
				</div>
			{/if}

			{#if attestation.expirationTime}
				<div>
					<dt>Expires</dt>

					<dd>
						<DateComponent
							date={attestation.expirationTime * 1000}
						/>
					</dd>
				</div>
			{/if}
		</dl>

		<hr>

		<section>
			<Collapsible
				type="label"
				showTriggerText={false}
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Schema
					</svelte:element>
				</svelte:fragment>

				<EasSchema
					schema={attestation.schema}
					headingLevel={headingLevel + 1}
					isOpen
				/>
			</Collapsible>
		</section>

		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
				showTriggerText={false}
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Timeline
					</svelte:element>
				</svelte:fragment>

				<section class="card row wrap">
					<svelte:element this={`h${headingLevel + 2}`}>
						Created
					</svelte:element>

					<DateComponent
						date={attestation.timeCreated * 1000}
						layout="horizontal"
					/>
				</section>

				{#if attestation.revocationTime}
					<section class="card row wrap">
						<svelte:element this={`h${headingLevel + 2}`}>
							Revoked
						</svelte:element>

						<DateComponent
							date={attestation.revocationTime * 1000}
							layout="horizontal"
						/>
					</section>
				{/if}

				{#if attestation.expirationTime}
					{@const expirationTime = attestation.expirationTime * 1000}

					<section class="card row wrap">
						<svelte:element this={`h${headingLevel + 2}`}>
							{expirationTime < Date.now() ? 'Will expire' : 'Expired'}
						</svelte:element>

						<DateComponent
							date={expirationTime}
							layout="horizontal"
						/>
					</section>
				{/if}
			</Collapsible>
		</section>

		<hr>

		<section>
			<Collapsible
				type="label"
				showTriggerText={false}
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Raw Data
					</svelte:element>
				</svelte:fragment>

				<pre class="card scrollable-list">{JSON.stringify(JSON.parse(attestation.data), null, '\t')}</pre>
			</Collapsible>
		</section>

		{#if attestation.txid}
			<hr>

			<section>
				<Collapsible
					type="label"
					showTriggerText={false}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Transaction
						</svelte:element>
					</svelte:fragment>

					<EthereumTransaction
						transaction={attestation.txid}
					/>
				</Collapsible>
			</section>
		{/if}

		{#if attestation.ipfsHash}
			<hr>

			<section>
				<Collapsible
					showTriggerText={false}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							{attestation.ipfsHash}
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="card-annotation">
							IPFS Hash
						</span>
					</svelte:fragment>

					<IpfsContentDetails
						ipfsContentId={attestation.ipfsHash}
					/>
				</Collapsible>
			</section>
		{/if}
	</Collapsible>
</article>
