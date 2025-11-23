<script lang="ts">
	// Types/constants
	import type { Identity } from '$/schema/Identity'
	import { IdentityType } from '$/schema/Identity'
	import type { EvmNetwork } from '$/schema/EvmNetwork'


	// Props
	let {
		identity,
	}: {
		identity: Identity['$id']
	} = $props()


	// State
	const displayIdentity = $derived(
		identity
	)


	// Components
	import TruncatedValue from './TruncatedValue.svelte'
</script>


{#if displayIdentity.type === IdentityType.EnsDomain}
	<span>{displayIdentity.ensDomain.name}</span>
{:else if displayIdentity.type === IdentityType.FarcasterAccount}
	{@const farcasterId = displayIdentity.farcasterAccount}
	{@const username = 'username' in farcasterId ? farcasterId.username : ('id' in farcasterId ? `fid:${farcasterId.id}` : null)}
	<span>@{username}</span>
{:else if displayIdentity.type === IdentityType.EvmActor}
	<span data-text="font-monospace">
		<TruncatedValue value={displayIdentity.actor.address} />
	</span>
{/if}
