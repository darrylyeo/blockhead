<script lang="ts">
	// Constants/types
	import type { Cacao } from '@didtools/codecs'

	
	// Inputs
	export let cacao: Cacao


	// Components 
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	isOpen
>
	<svelte:fragment slot="title">
		<header class="bar wrap">
			<h4><output>{cacao.p.nonce}</output></h4>
		</header>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">{cacao.s ? 'Signed' : 'Unsigned'} <a href="https://chainagnostic.org/CAIPs/caip-74" target="_blank">Chain Agnostic Capability Object (CAIP-74)</a></span>
	</svelte:fragment>

	<hr>

	<section>
		<Collapsible
			type="label"
			isOpen
		>
			<svelte:fragment slot="title">
				<header class="bar wrap">
					<h4>Header</h4>
				</header>
			</svelte:fragment>

			<dl>
				<div>
					<dt>Format</dt>
					<dd>{cacao.h.t}</dd>
				</div>
			</dl>
		</Collapsible>
	</section>

	<hr>

	<section>
		<Collapsible
			type="label"
			isOpen
		>
			<svelte:fragment slot="title">
				<header class="bar wrap">
					<h4>Payload</h4>
				</header>
			</svelte:fragment>

			<dl>
				<div>
					<dt>Domain</dt>
					<dd>{cacao.p.domain}</dd>
				</div>

				<div>
					<dt>Issuer</dt>
					<dd><output>{cacao.p.iss}</output></dd>
				</div>

				<div>
					<dt>URI</dt>
					<dd><output>{cacao.p.aud}</output></dd>
				</div>

				<div>
					<dt>Version</dt>
					<dd><output>{cacao.p.version}</output></dd>
				</div>

				<div>
					<dt>Nonce</dt>
					<dd><output>{cacao.p.nonce}</output></dd>
				</div>
				
				<div>
					<dt>Issued</dt>
					<dd><DateTime date={cacao.p.iat} /></dd>
				</div>

				{#if cacao.p.nbf}
					<div>
						<dt>Not Before</dt>
						<dd><DateTime date={cacao.p.nbf} /></dd>
					</div>
				{/if}

				{#if cacao.p.exp}
					<div>
						<dt>Expiration</dt>
						<dd><DateTime date={cacao.p.exp} /></dd>
					</div>
				{/if}

				<div>
					<dt>Statement</dt>
					<dd>{cacao.p.statement}</dd>
				</div>

				{#if cacao.p.requestId}
					<div>
						<dt>Request ID</dt>
						<dd>{cacao.p.requestId}</dd>
					</div>
				{/if}

				{#if cacao.p.resources}
					<div>
						<dt>Resources</dt>
						<dd>
							{#each cacao.p.resources as resource}
								<p><output>{resource}</output></p>
							{/each}
						</dd>
					</div>
				{/if}
			</dl>
		</Collapsible>
	</section>

	{#if cacao.s}
		<hr>

		<section>
			<Collapsible
				type="label"
				isOpen
			>
				<svelte:fragment slot="title">
					<header class="bar wrap">
						<h4>Signature</h4>
					</header>
				</svelte:fragment>

				<dl>
					<div>
						<dt>Format</dt>
						<dd>{cacao.s.t}</dd>
					</div>

					<div>
						<dt>Signature (Bytes)</dt>
						<dd><output>{cacao.s.s}</output></dd>
					</div>

					<!-- {#if cacao.s.m}
						<div>
							<dt>Metadata</dt>
							<dd>{cacao.s.m._}</dd>
						</div>
					{/if} -->
				</dl>
			</Collapsible>
		</section>
	{/if}
</Collapsible>


<style>
	dl > div {
		grid-template-columns: minmax(13rem, 0.4fr) 1fr;
		margin: 0;
	}
</style>
