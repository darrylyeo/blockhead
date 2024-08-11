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


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
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
			<a 
				href={resolveRoute('/apps/eas/network/[networkSlug]/schema/[schemaId]', {
					networkSlug: network.slug,
					schemaId: schema.id,
				})}
			>
				<svelte:element this={`h${headingLevel}`}>
					{schema.schemaNames?.[0]?.name ?? `[Untitled Schema]`}
				</svelte:element>
			</a>
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
						href={`/apps/eas/network/${network.slug}`}
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
					<dt>Resolver</dt>

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
						layout="horizontal"
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
				<dt>Total Attestations</dt>

				<dd>
					<TweenedNumber
						value={schema._count?.attestations}
					/>
				</dd>
			</div>
		</dl>

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
								layout="horizontal"
							/>
						</span>
					</header>

					<EthereumTransaction
						transaction={schema.txid}
					/>
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
									Named by
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
										layout="horizontal"
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
