<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { Disco } from '$/api/disco/index'
	import type { DidUrl } from '$/api/ceramic/did'
	import { VerifiableCredentialProvider } from '$/data/verifiableCredentialProvider'

	
	// Inputs
	export let address: Ethereum.Address | undefined
	export let didUrl: DidUrl | undefined
	export let profile: Disco.Profile
	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	// (Computed)
	$: didUrl = profile.did


	// Internal state
	let verifiableCredentialProvider = VerifiableCredentialProvider.Disco


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Collapsible from './Collapsible.svelte'
	import DiscoProfileLinkage from './DiscoProfileLinkage.svelte'
	import VerifiableCredentials from './VerifiableCredentials.svelte'
	import VerifiableCredentialsLoader from './VerifiableCredentialsLoader.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<article class="card">
	<Collapsible
		type="label"
		class="column"
		isOpen
	>
		<svelte:fragment slot="title">
			<a href={resolveRoute(`/apps/[web3AppSlug]/account/[accountId]`, { web3AppSlug: 'disco', accountId: profile.profile.name })}>
				<svelte:element this={`h${headingLevel}`} class="row">
					<img class="avatar" src={profile.profile.avatar} />
					<output>{profile.profile.name}</output>
				</svelte:element>
			</a>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">{verifiableCredentialProvider} Profile</span>
		</svelte:fragment>

		{#if profile.profile.bio}
			<p class="bio">{profile.profile.bio}</p>
		{/if}

		<hr>

		<section>
			<Collapsible
				type="label"
				isOpen
				class="column"
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>Links (<TweenedNumber value={profile.profile.linkages.length} />)</svelte:element>		
				</svelte:fragment>

				{#each profile.profile.linkages as linkage}
					<DiscoProfileLinkage
						{linkage}
						{address}
					/>
				{/each}
			</Collapsible>
		</section>

		<hr>

		<section>
			<VerifiableCredentialsLoader
				{verifiableCredentialProvider}
				{address}
				did={didUrl}
				let:credentials
			>
				<VerifiableCredentials
					{credentials}
					headingLevel={headingLevel + 1}
				/>
			</VerifiableCredentialsLoader>
		</section>
	</Collapsible>
</article>


<style>
	.avatar {
		border-radius: 0.2rem;
		width: auto;
		height: 1.75em;
	}

	.bio {
		font-size: 0.85em;
		opacity: 0.75;
		white-space: pre-line;
		line-height: 1.2;
	}
	.card:not(:hover) .bio {
		line-clamp: 2;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
