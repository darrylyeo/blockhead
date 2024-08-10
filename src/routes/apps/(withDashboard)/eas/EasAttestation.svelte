<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { getAttestation } from '$/api/eas/easscan'
	import { EasProvider } from '$/api/eas/provider'
	import { IpfsGatewayProvider, ipfsGatewaysByProvider } from '$/data/ipfsGateways'
	
	
	// Inputs
	export let network: Ethereum.Network
	export let attestation: NonNullable<NonNullable<Awaited<ReturnType<typeof getAttestation>>>['attestation']>
	export let easProvider: EasProvider
	export let ipfsGatewayProvider = IpfsGatewayProvider.InfuraEas

	// (View options)
	export let layout: 'standalone' | 'inline' = 'inline'
	export let isOpen = layout === 'standalone'
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
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
	import EasSchema from './EasSchema.svelte'
	import IpfsContentDetails from '$/components/IpfsContentDetails.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
</script>


<article
	class="column"
	class:card={layout === 'standalone'}
>
	<Collapsible
		type="label"
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
						resolveToEnsName
						format="middle-truncated"
					/>

					<span>received</span>

					<span>{schemaName ? ` "${schemaName}"` : ''}</span>

					<span>from</span>

					<Address
						{network}
						address={attestation.attester}
						resolveToEnsName
						format="middle-truncated"
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
						resolveToEnsName
						address={attestation.attester}
					/>
				</dd>
			</div>

			<div>
				<dt>Recipient</dt>

				<dd>
					<Address
						{network}
						resolveToEnsName
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
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Schema
					</svelte:element>
				</svelte:fragment>

				<div class="card">
					<EasSchema
						{network}
						schema={attestation.schema}
						headingLevel={headingLevel + 1}
						isOpen
					/>
				</div>
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
						Data (Indexed)
					</svelte:element>
				</svelte:fragment>

				<svelte:fragment slot="header-right">
					<span class="card-annotation">
						{easProvider}
					</span>
				</svelte:fragment>

				<pre class="card scrollable-list">{JSON.stringify(JSON.parse(attestation.data), null, '\t')}</pre>
			</Collapsible>
		</section>

		{#if attestation.ipfsHash}
			<hr>

			<section>
				<Collapsible
					showTriggerText={false}
					isOpen={layout === 'standalone'}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Data (IPFS)
						</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="card-annotation">
							{ipfsGatewaysByProvider[ipfsGatewayProvider].name}
						</span>
					</svelte:fragment>

					<IpfsContentDetails
						ipfsContentId={attestation.ipfsHash}
						ipfsGateway={ipfsGatewaysByProvider[ipfsGatewayProvider]}
					/>
				</Collapsible>
			</section>
		{/if}

		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
				showTriggerText={false}
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Timeline
					</svelte:element>
				</svelte:fragment>

				<section class="card">
					<Collapsible
						type="label"
						class="column"
						showTriggerText={false}
						canToggle={Boolean(attestation.txid)}
						isOpen={Boolean(attestation.txid)}
					>
						<svelte:fragment slot="title">
							<svelte:element this={`h${headingLevel + 2}`}>
								Created
							</svelte:element>
						</svelte:fragment>

						<svelte:fragment slot="header-right">
							<span class="date">
								<DateComponent
									date={attestation.timeCreated * 1000}
									layout="horizontal"
								/>
							</span>
						</svelte:fragment>

						{#if attestation.txid}
							<hr>
				
							<section>
								<Collapsible
									type="label"
									showTriggerText={false}
									isOpen={layout === 'standalone'}
								>
									<svelte:fragment slot="title">
										<svelte:element this={`h${headingLevel + 2}`}>
											Transaction
										</svelte:element>
									</svelte:fragment>

									<svelte:fragment slot="header-right">
										<span class="card-annotation">
											{network.name}
										</span>
									</svelte:fragment>

									<EthereumTransactionLoader
										{network}
										transactionId={attestation.txid}
										let:transaction
									>
										<EthereumTransaction
											{network}
											{transaction}
											layout="standalone"
											detailLevel="exhaustive"
										/>
									</EthereumTransactionLoader>
								</Collapsible>
							</section>
						{/if}
					</Collapsible>
				</section>

				{#if attestation.revocationTime}
					<section class="card row wrap">
						<svelte:element this={`h${headingLevel + 2}`}>
							Revoked
						</svelte:element>

						<span class="date">
							<DateComponent
								date={attestation.revocationTime * 1000}
								layout="horizontal"
							/>
						</span>
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
	</Collapsible>

	<footer class="row wrap">
		<span class="date">
			<DateComponent
				date={attestation.timeCreated * 1000}
				format="relative"
				layout="horizontal"
			/>
		</span>
	</footer>
</article>


<style>
	.date {
		font-size: 0.75em;
		opacity: 0.8;
	}
</style>
