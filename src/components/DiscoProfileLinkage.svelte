<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { Disco } from '../api/disco/index'

	
	// Inputs
	export let address: Ethereum.Address
	export let linkage: Disco.Linkage
	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 6


	// Components
	import AccountIdResolver from './AccountIdResolver.svelte'
	import Collapsible from './Collapsible.svelte'
	import LensName from './LensName.svelte'
	import LensProfiles from './LensProfiles.svelte'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	isOpen={false}
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`}>
			{#if linkage.type === 'twitter'}
				<a href={`https://twitter.com/${linkage.handle}`} target="_blank">@{linkage.handle}</a>
			{:else if linkage.type === 'discord'}
				@{linkage.discord}
			{:else if linkage.type === 'lens'}
				{@const lensName = linkage.handle}
				<LensName {lensName} />
			{:else if linkage.type === 'domain'}
				<a href={linkage.handle} target="_blank">{linkage.handle}</a>
			{:else}
				{linkage.handle}
			{/if}
		</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">{linkage.type}</span>
	</svelte:fragment>

	{#if linkage.type === 'lens'}
		{@const lensName = linkage.handle}

		<AccountIdResolver
			accountId={address || lensName}
			let:address
		>
			<LensProfiles
				{lensName}
				{address}
				headingLevel={headingLevel + 1}
			/>
		</AccountIdResolver>
	{/if}

	<hr>

	<footer class="row align-center">
		<dl class="row wrap">
			<dt>Owner</dt>
			<dd>{linkage.did}</dd>
		</dl>
	</footer>
</Collapsible>


<style>
	footer {
		font-size: 0.8em;
	}
</style>
