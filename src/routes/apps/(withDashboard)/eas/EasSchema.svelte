<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { getSchema, getAttestation } from '$/api/eas/easscan'
	
	
	// Inputs
	export let network: Ethereum.Network
	export let schema: NonNullable<NonNullable<Awaited<ReturnType<typeof getSchema>>>['schema']>
	export let schemaNames: NonNullable<NonNullable<Awaited<ReturnType<typeof getAttestation>>>['attestation']>['schemaNames']

	// (View options)
	export let isOpen = false
	export let headingLevel = 4


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Address from '$/components/Address.svelte'
	import Collapsible from '$/components/Collapsible.svelte'
	import DateComponent from '$/components/Date.svelte'
	import EthereumTransaction from '$/components/EthereumTransaction.svelte'
	import TweenedNumber from '$/components/TweenedNumber.svelte'
</script>


<article class="card">
	<Collapsible
		class="column"
		showTriggerText={false}
	>
		<svelte:fragment slot="title">
			<a 
				href={resolveRoute('/apps/eas/schema/[schemaId]', {
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

		<dl>
			{#if schema.resolver !== '0x0000000000000000000000000000000000000000'}
				<div>
					<dt>Resolver</dt>

					<dd>
						<Address
							{network}
							address={schema.resolver}
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

						<DateComponent
							date={schema.time * 1000}
							layout="horizontal"
						/>
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
						>
							<svelte:fragment slot="title">
								<svelte:element this={`h${headingLevel + 2}`}>
									Named by
									<Address
										{network}
										address={nameAttestation.attesterAddress}
									/>
								</svelte:element>
							</svelte:fragment>

							<svelte:fragment slot="header-right">
								<DateComponent
									date={nameAttestation.time * 1000}
									layout="horizontal"
								/>
							</svelte:fragment>

							<hr>

							<section>
								<Collapsible
									type="label"
									class="column"
									showTriggerText={false}
								>
									<svelte:fragment slot="title">
										<svelte:element this={`h${headingLevel + 3}`}>
											Name Schema
										</svelte:element>
									</svelte:fragment>
		
									<svelte:self
										{network}
										schema={nameAttestation.schema}
										isOpen
										headingLevel={headingLevel + 3}
									/>
								</Collapsible>
							</section>
						</Collapsible>
					</section>
				{/each}
			</Collapsible>
		</section>
	</Collapsible>
</article>
