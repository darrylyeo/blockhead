<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { AccountConnection } from '$/state/account'
	import { VerifiableCredentialProvider } from '$/data/verifiableCredentialProviders'


	// Context
	import { discoCredentialId, didUrl } from '../../_appsParams'


	// Inputs
	export let network: Ethereum.Network | undefined
	export let address: Ethereum.Address | undefined
	export let accountConnection: AccountConnection | undefined


	// Internal state
	let verifiableCredentialProvider = VerifiableCredentialProvider.Disco


	// Components
	import DiscoProfile from '$/components/DiscoProfile.svelte'
	import DiscoProfileLoader from '$/components/DiscoProfileLoader.svelte'
	import VerifiableCredentialLoader from '$/components/VerifiableCredentialLoader.svelte'
</script>


{#if $discoCredentialId}
	<VerifiableCredentialLoader
		{verifiableCredentialProvider}
		credentialId={$discoCredentialId}
	/>
{:else if $didUrl}
	<DiscoProfileLoader
		didUrl={$didUrl}
		let:profile
	>
		{#if profile}
			<DiscoProfile
				didUrl={$didUrl}
				{profile}
			/>
		{/if}
	</DiscoProfileLoader>
{:else if address}
	<DiscoProfileLoader
		{address}
		let:profile
	>
		{#if profile}
			<DiscoProfile
				{address}
				{profile}
			/>
		{/if}
	</DiscoProfileLoader>
{:else}
	Enter an address to view verified credentials on Disco!
{/if}
