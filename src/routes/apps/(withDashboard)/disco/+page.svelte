<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../../../../data/networks/types'
	import type { AccountConnection } from '../../../../state/account'
	import { VerifiedCredentialProvider } from '../../../../data/verifiedCredentialProvider'


	// Context
	import { discoCredentialId, didUrl } from '../../_appsParams'


	// Inputs
	export let network: Ethereum.Network | undefined
	export let address: Ethereum.Address | undefined
	export let accountConnection: AccountConnection | undefined


	// Internal state
	let verifiedCredentialProvider = VerifiedCredentialProvider.Disco


	// Components
	import DiscoProfile from '../../../../components/DiscoProfile.svelte'
	import DiscoProfileLoader from '../../../../components/DiscoProfileLoader.svelte'
	import VerifiableCredentialLoader from '../../../../components/VerifiableCredentialLoader.svelte'
</script>


{#if $discoCredentialId}
	<VerifiableCredentialLoader
		{verifiedCredentialProvider}
		credentialId={$discoCredentialId}
	/>
{:else if $didUrl}
	<DiscoProfileLoader
		didUrl={$didUrl}
		let:profile
	>
		<DiscoProfile
			didUrl={$didUrl}
			{profile}
		/>
	</DiscoProfileLoader>
{:else if address}
	<DiscoProfileLoader
		{address}
		let:profile
	>
		<DiscoProfile
			{address}
			{profile}
		/>
	</DiscoProfileLoader>
{/if}
