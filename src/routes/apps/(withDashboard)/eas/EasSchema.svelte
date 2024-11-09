<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { getSchema, getAttestation } from '$/api/eas/easscan'
	
	
	// Inputs
	export let network: Ethereum.Network
	export let schema: NonNullable<NonNullable<Awaited<ReturnType<typeof getSchema>>>['schema']>
	export let schemaNames: NonNullable<NonNullable<Awaited<ReturnType<typeof getAttestation>>>['attestation']>['schemaNames']

	// (View options)
	export let layout: 'standalone' | 'inline' = 'inline'
	export let isOpen = layout === 'standalone'
	export let headingLevel = 4
	export let showFormattedNames = true


	// Functions
	import { resolveRoute } from '$app/paths'
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'
	import { parseAbiParameters } from 'abitype'

	const parseSchema = (schema: string) => {
		try {
			return parseAbiParameters(schema)
		} catch (error) {
			console.error(error, schema)

			return schema
				?.split(',')
				.map(item => item.split(' '))
				.map(([type, name]) => ({
					type,
					name,
				}))
		}
	}


	// Internal state
	// (Computed)
	$: link = resolveRoute('/apps/eas/network/[networkSlug]/schema/[schemaId]', {
		networkSlug: network.slug,
		schemaId: schema.id,
	})

	$: networkLink = resolveRoute('/apps/eas/network/[networkSlug]', {
		networkSlug: network.slug
	})

	$: schemaName = schema.schemaNames?.[0]?.name

	let decodedSchema = schema.schema && parseSchema(schema.schema)


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumAccountOrContract from '$/components/EthereumAccountOrContract.svelte'
	import EthereumTransactionLoader from '$/components/EthereumTransactionLoader.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
</script>


<article
	class="column"
	class:card={layout === 'standalone'}
>
	<Collapsible
		type="label"
		class="column"
		showTriggerText={false}
		isOpen={layout === 'standalone'}
	>
		<svelte:fragment slot="title">
			<svelte:element this={`h${headingLevel}`} class="row">
				<a
					href={networkLink}
					class="row inline"
				>
					<NetworkIcon
						{network}
					/>
				</a>

				<span>
					<a href={link}>
						{#if schemaName}
							<strong>
								{schemaName}
							</strong>
						{:else}
							<span>[Untitled schema]</span>
						{/if}
					</a>

					<small>
						by

						<strong>
							<Address
								{network}
								address={schema.creator}
								resolveToEnsName
								format="middle-truncated"
							/>
						</strong>
					</small>
				</span>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				EAS Schema
			</span>
		</svelte:fragment>

		<hr>

		<dl>
			<div>
				<dt>Location</dt>

				<dd>
					<a
						href={networkLink}
						class="row inline"
					>
						<NetworkIcon
							{network}
						/>
						{network.name}
					</a>
				</dd>
			</div>

			{#if schema.resolver !== '0x0000000000000000000000000000000000000000'}
				<div>
					<dt>Resolver Contract</dt>

					<dd>
						<Address
							{network}
							address={schema.resolver}
							resolveToEnsName
						/>
					</dd>
				</div>
			{/if}

			<div>
				<dt>Creator</dt>

				<dd>
					<Address
						{network}
						address={schema.creator}
						resolveToEnsName
					/>
				</dd>
			</div>

			<div>
				<dt>Created</dt>

				<dd>
					<DateComponent
						date={schema.time * 1000}
					/>
				</dd>
			</div>

			<!-- {#if schema.schemaNames?.[0]?.attesterAddress}
				<div>
					<dt>Name Attester</dt>

					<dd>
						<Address
							{network}
							address={schema.schemaNames[0].attesterAddress}
							resolveToEnsName
						/>
					</dd>
				</div>
			{/if} -->

			<div>
				<dt>Revocable?</dt>

				<dd>
					{schema.revocable ? 'Yes' : 'No'}
				</dd>
			</div>

			<div>
				<dt>Index</dt>

				<dd>
					#{schema.index}
				</dd>
			</div>

			<div>
				<dt>Total Attestations</dt>

				<dd>
					<TweenedNumber
						value={schema._count?.attestations}
					/>
				</dd>
			</div>
		</dl>

		{#if schema.resolver !== '0x0000000000000000000000000000000000000000'}
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
							Resolver Contract
						</svelte:element>
					</svelte:fragment>

					<EthereumAccountOrContract
						{network}
						accountId={schema.resolver}
						layout="inline"
						isOpen={false}
						headingLevel={headingLevel + 2}
					/>
				</Collapsible>
			</section>
		{/if}

		{#if decodedSchema?.length}
			<hr>

			<section>
				<Collapsible
					type="label"
					showTriggerText={false}
					isOpen
					showContentsOnly={layout === 'inline'}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>
							Properties
						</svelte:element>
					</svelte:fragment>

					<dl class="decoded-data">
						{#each decodedSchema as item}
							<div>
								<dt>
									{#if showFormattedNames && item.name}
										{`${formatIdentifierToWords(item.name, true)}${item.type === 'bool' ? '?' : ''}`}
									{:else}
										{item.name}
									{/if}
								</dt>

								<dd>
									<span class="card-annotation">
										{item.type}
									</span>
								</dd>
							</div>
						{/each}
					</dl>
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

				<section class="card column wrap">
					<header class="row wrap">
						<svelte:element this={`h${headingLevel + 2}`}>
							Created
						</svelte:element>

						<span class="date">
							<DateComponent
								date={schema.time * 1000}
							/>
						</span>
					</header>

					<EthereumTransactionLoader
						{network}
						transactionId={schema.txid}
						let:transaction
					>
						<EthereumTransaction
							{network}
							{transaction}
							layout="standalone"
							detailLevel="exhaustive"
						/>
					</EthereumTransactionLoader>
				</section>

				{#each schema.schemaNames as nameAttestation}
					<section class="card column wrap">
						<Collapsible
							type="label"
							class="column"
							showTriggerText={false}
							canToggle={false}
							isOpen={layout === 'standalone'}
						>
							<svelte:fragment slot="title">
								<svelte:element this={`h${headingLevel + 2}`}>
									Named
									"{nameAttestation.name}"
									by
									<Address
										{network}
										address={nameAttestation.attesterAddress}
										resolveToEnsName
									/>
								</svelte:element>
							</svelte:fragment>

							<svelte:fragment slot="header-right">
								<span class="date">
									<DateComponent
										date={nameAttestation.time * 1000}
									/>
								</span>
							</svelte:fragment>
						</Collapsible>
					</section>
				{/each}
			</Collapsible>
		</section>
	</Collapsible>
</article>


<style>
	.date {
		font-size: 0.75em;
		opacity: 0.8;
	}
</style>
