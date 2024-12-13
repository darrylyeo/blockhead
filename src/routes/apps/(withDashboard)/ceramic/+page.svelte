<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { AccountConnection } from '$/state/account.svelte'
	import { DidProvider } from '$/data/didProvider'


	// Inputs
	export let network: Ethereum.Network | undefined
	export let address: Ethereum.Address | undefined
	export let accountConnection: AccountConnection | undefined


	// Components
	import DidSessionLoader from '$/components/DidSessionLoader.svelte'
	import DidSession from '$/components/DidSession.svelte'
</script>


{#if network && address && accountConnection}
	<DidSessionLoader
		didProvider={DidProvider.Ceramic}
		{network}
		{address}
		{accountConnection}
		let:didSession
	>
		<DidSession
			didProvider={DidProvider.Ceramic}
			{network}
			{address}
			{accountConnection}
			{didSession}
		/>
	</DidSessionLoader>
{:else}
	<div class="card">
		Connect an account to authenticate with Ceramic DIDs.
	</div>
{/if}
