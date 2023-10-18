<script lang="ts">
	// Constants/types
	import type { DidUrl } from '../api/ceramic/did'
	import type { JsonSchema } from '../data/jsonSchema'
	import type { Disco } from '../api/disco'
	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'
	

	// Inputs
	export let credential: Disco.VerifiableCredentialResponse
	// (View options)
	export let contextualDid: DidUrl
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 5
	export let isOpen = false


	// Internal state
	let jsonSchema: JsonSchema | undefined
	// (Computed)
	$: credentialType = jsonSchema?.title ?? credential.vc.type.find(type => type !== 'VerifiableCredential') ?? credential.vc.type[0]
	$: console.log({jsonSchema}, jsonSchema?.title, credentialType)


	// Components 
	import Collapsible from './Collapsible.svelte'
	import DateComponent from './Date.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import JsonSchemaLoader from './JsonSchemaLoader.svelte'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	{isOpen}
>
	<svelte:fragment slot="title">
		<header>
			<!-- <svelte:element this={`h${headingLevel}`}>{formatIdentifierToWords(credentialType, true)}</svelte:element> -->
			<svelte:element this={`h${headingLevel}`}><InlineTransition key={credentialType}>{credentialType}</InlineTransition></svelte:element>
		</header>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation"><a href={credential.vc['@context'][0]} target="_blank">Verifiable Credential</a></span>
	</svelte:fragment>

	<section class="card">
		<dl>
			<div>
				<dt>Subject</dt>
				<dd><output class:mark={contextualDid === credential.vc.credentialSubject.id}>{credential.vc.credentialSubject.id}</output></dd>
			</div>

			<div>
				<dt>Issued by</dt>
				<dd><output>{credential.vc.issuer.id}</output></dd>
			</div>

			<div>
				<dt>Issued</dt>
				<dd><DateComponent date={credential.vc.issuanceDate} layout="horizontal" /></dd>
			</div>

			{#if credential.vc.expirationDate}
				<div>
					<dt>Expires</dt>
					<dd>
						{#if credential.vc.expirationDate === '9999-12-31T23:59:59.000Z'}
							never
						{:else}
							<DateComponent date={credential.vc.expirationDate} layout="horizontal" />
						{/if}
					</dd>
				</div>
			{/if}

			<!-- <div>
				<dt>Context</dt>
				<dd>
					{#each credential.vc['@context'] as context}
						<p><output>{context}</output></p>
					{/each}
				</dd>
			</div> -->
		</dl>
	</section>

	{#if credential.vc.credentialSchema}
		<hr>

		<section>
			<Collapsible
				type="label"
				class="column"
			>
				<svelte:fragment slot="title">
					<header>
						<svelte:element this={`h${headingLevel + 1}`}>Schema</svelte:element>
					</header>
				</svelte:fragment>

				<svelte:fragment slot="header-right">
					<span class="card-annotation">
						{formatIdentifierToWords(credential.vc.credentialSchema.type)}
					</span>
				</svelte:fragment>

				<div class="card">
					<JsonSchemaLoader
						schemaUrl={credential.vc.credentialSchema.id}
						bind:jsonSchema
						let:jsonSchema
					>
						<pre class="scrollable-list" style="--resizeVertical-defaultHeight: 12rem;"><code>{JSON.stringify(jsonSchema, null, 4)}</code></pre>

						<hr>
		
						<footer class="align-end">
							<a href={credential.vc.credentialSchema.id} target="_blank">View schema ({new URL(credential.vc.credentialSchema.id).hostname})</a>
						</footer>
					</JsonSchemaLoader>
				</div>
			</Collapsible>
		</section>
	{/if}

	{#if credential.vc.proof}
		<hr>

		<section>
			<Collapsible
				type="label"
			>
				<svelte:fragment slot="title">
					<header>
						<svelte:element this={`h${headingLevel + 1}`}>Proof</svelte:element>
					</header>
				</svelte:fragment>

				<svelte:fragment slot="header-right">
					<span class="card-annotation">
						{formatIdentifierToWords(credential.vc.proof.type)}
					</span>
				</svelte:fragment>

				<dl class="card">
					<div>
						<dt>Type</dt>
						<dd><output>{credential.vc.proof.type}</output></dd>
					</div>

					<div>
						<dt>Verification Method</dt>
						<dd><output>{credential.vc.proof.verificationMethod}</output></dd>
					</div>

					<div>
						<dt>EIP-712 Domain</dt>
						<dd><output>{credential.vc.proof.eip712Domain.domain.name} (<output>{credential.vc.proof.eip712Domain.primaryType})</output></dd>
						<!-- <dd><output>{credential.vc.proof.eip712Domain.domain.name}</output></dd>
						<dd><output>{credential.vc.proof.eip712Domain.primaryType}</output></dd>
						<dd><output>{credential.vc.proof.eip712Domain.domain.chainId}</output></dd>
						<dd><output>{credential.vc.proof.eip712Domain.domain.version}</output></dd>
						<dd><output>{credential.vc.proof.eip712Domain.messageSchema}</output></dd> -->
					</div>

					<div>
						<dt>Purpose</dt>
						<dd><output>{credential.vc.proof.proofPurpose}</output></dd>
					</div>

					<div>
						<dt>Proof Value</dt>
						<dd><output>{credential.vc.proof.proofValue}</output></dd>
					</div>

					<div>
						<dt>Created</dt>
						<dd><DateComponent date={credential.vc.proof.created} layout="horizontal" /></dd>
					</div>
				</dl>
			</Collapsible>
		</section>
	{/if}

	{#if credential.history.length}
		<hr>

		<section>
			<Collapsible
				type="label"
			>
				<svelte:fragment slot="title">
					<header class="bar wrap">
						<svelte:element this={`h${headingLevel + 1}`}>History</svelte:element>
					</header>
				</svelte:fragment>

				<div class:scrollable-list={credential.history.length > 4}>
					{#each credential.history as itemStringified}
						{@const item = JSON.parse(itemStringified)}

						<div class="card column">
							<dl class="row wrap">
								<dt>{item.field}</dt>
								<dd data-type={item.field}><output>{item.newValue}</output></dd>
							</dl>

							<footer class="align-end">
								<DateComponent date={item.updatedAt} layout="horizontal" />
							</footer>
						</div>

					{/each}
				</div>
			</Collapsible>
		</section>
	{/if}
</Collapsible>


<style>
	dl {
		font-size: 0.8em;
	}

	dl > div {
		grid-template-columns: minmax(13rem, 0.2fr) 1fr;
		margin: 0;
	}

	dd[data-type="jwt"] {
		font-size: 0.66em;
	}

	footer {
		font-size: 0.8em;
	}
</style>
