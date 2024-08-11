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


	// Functions
	import { resolveRoute } from '$app/paths'


	// Internal state
	// (Derived)
	$: link = resolveRoute('/apps/eas/network/[networkSlug]/attestation/[attestationId]', {
		networkSlug: network.slug,
		attestationId: attestation.id,
	})

	$: networkLink = resolveRoute('/apps/eas/network/[networkSlug]', {
		networkSlug: network.slug
	})

	$: schemaName = attestation.schema.schemaNames?.[0]?.name


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
	import EasSchema from './EasSchema.svelte'
	import Icon from '$/components/Icon.svelte'
	import IpfsContentDetails from '$/components/IpfsContentDetails.svelte'
	import IpfsContentId from '$/components/IpfsContentId.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import { IpfsIcon } from '$/assets/icons'
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
			<svelte:element this={`h${headingLevel}`} class="row">
				{#if attestation.isOffchain}
					{#if attestation.ipfsHash}
						<IpfsContentId
							ipfsContentId={attestation.ipfsHash}
						>
							<Icon imageSources={[IpfsIcon]} />
						</IpfsContentId>
					{/if}
				{:else}
					<a
						href={networkLink}
						class="row inline"
					>
						<NetworkIcon
							{network}
						/>
					</a>
				{/if}

				<a
					href={link}
				>
					{#if attestation.recipient !== '0x0000000000000000000000000000000000000000'}
						<strong>
							<Address
								{network}
								address={attestation.recipient}
								resolveToEnsName
								format="middle-truncated"
							/>
						</strong>

						<span>received</span>

						<a
							href={resolveRoute('/apps/eas/network/[networkSlug]/schema/[schemaId]', {
								networkSlug: network.slug,
								schemaId: attestation.schema.id,
							})}
						>
							{#if schemaName}
								<strong>{schemaName}</strong>
							{:else}
								<span>an attestation</span>
							{/if}
						</a>

						<span>from</span>

						<strong>
							<Address
								{network}
								address={attestation.attester}
								resolveToEnsName
								format="middle-truncated"
							/>
						</strong>

					{:else}
						<strong>
							<Address
								{network}
								address={attestation.attester}
								resolveToEnsName
								format="middle-truncated"
							/>
						</strong>

						{#if schemaName}
							<span>attested</span>

							<strong>{schemaName}</strong>
						{:else}
							<span>recorded an attestation</span>
						{/if}
					{/if}
				</a>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				EAS Attestation
			</span>
		</svelte:fragment>

		<hr>

		<dl>
			<div>
				<dt>Location</dt>

				<dd>
					{#if attestation.isOffchain}
						{#if attestation.ipfsHash}
							<span class="row inline">
								<IpfsContentId
									ipfsContentId={attestation.ipfsHash}
									let:ipfsContentId
								>
									<span class="row inline">
										<Icon imageSources={[IpfsIcon]} />

										IPFS
									</span>
								</IpfsContentId>

								(Offchain)
							</span>
						{:else}
							Offchain
						{/if}
					{:else}
						<span>
							<a
								href={networkLink}
								class="row inline"
							>
								<NetworkIcon
									{network}
								/>

								{network.name}
							</a>

							(Onchain)
						</span>
					{/if}
				</dd>
			</div>

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
					{#if attestation.recipient !== '0x0000000000000000000000000000000000000000'}
						<Address
							{network}
							resolveToEnsName
							address={attestation.recipient}
						/>
					{:else}
						<span class="not-set"></span>
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

			<div>
				<dt>Expires</dt>

				<dd>
					{#if attestation.expirationTime}
						<DateComponent
							date={attestation.expirationTime * 1000}
						/>
					{:else}
						Never
					{/if}
				</dd>
			</div>
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

				{#if attestation.isOffchain}
					<pre class="card scrollable-list">{JSON.stringify(JSON.parse(attestation.data), null, '\t')}</pre>
				{:else}
					<pre class="card scrollable-list">{attestation.data}</pre>
				{/if}
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
		<a href={link}>
			<span class="date">
				<DateComponent
					date={attestation.timeCreated * 1000}
					format="relative"
					layout="horizontal"
				/>
			</span>
		</a>
	</footer>
</article>


<style>
	.date {
		font-size: 0.75em;
		opacity: 0.8;
	}

	.not-set:after {
		content: '—';
		opacity: 0.3;
	}
</style>
