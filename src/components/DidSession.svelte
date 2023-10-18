<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { DIDSession } from 'did-session'
	import type { DidUrl } from '../api/ceramic/did'
	import type { DidProvider } from '../data/didProvider'

	
	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let didProvider: DidProvider
	export let didSession: DIDSession


	// Internal state
	let did: DidUrl
	// (Computed)
	$: did = didSession.did.id as DidUrl


	// Components 
	import Address from './Address.svelte'
	import CapabilityObject from './CapabilityObject.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateComponent from './Date.svelte'
</script>


<Collapsible
	type="label"
	class="column"
	isOpen
>
	<svelte:fragment slot="title">
		<header class="bar wrap">
			<h4><output>{did}</output></h4>
		</header>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">DID Session</span>
	</svelte:fragment>

	<section class="card">
		<dl>
			{#if address}
				<div>
					<dt>Owner ({network.name} Account)</dt>
					<dd><Address {network} {address} /></dd>
				</div>
			{/if}

			<div>
				<dt>Authorization Method</dt>
				<dd>Public Key Hash ({network.name})</dd>
			</div>

			<div>
				<dt>Authorized Resources</dt>
				<dd>
					{#each didSession.authorizations as resource}
						<p><output>{resource}</output></p>
					{/each}
				</dd>
			</div>

			<div>
				<dt>Status</dt>
				<dd>{didSession.isExpired ? 'expired' : didSession.hasSession ? 'authorized' : 'unauthorized'}</dd>
			</div>

			<div>
				<dt>Expires</dt>
				<dd><DateComponent date={Date.now() + 1000 * didSession.expireInSecs} layout="horizontal" /></dd>
			</div>
		</dl>
	</section>

	<hr>

	<section>
		<Collapsible>
			<svelte:fragment slot="title">
				<header class="bar wrap">
					<h4>Capability Object</h4>
				</header>
			</svelte:fragment>

			<CapabilityObject cacao={didSession.cacao} />
		</Collapsible>
	</section>
</Collapsible>


<style>
	dl > div {
		grid-template-columns: minmax(13rem, 0.4fr) 1fr;
		margin: 0;
	}
</style>
