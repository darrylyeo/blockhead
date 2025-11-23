<script module lang="ts">
	export enum IdentityDisplayType {
		Simple = 'Simple',
		Details = 'Details',
	}
</script>


<script lang="ts">
	// Types/constants
	import { IdentityType, type Identity } from '$/schema/Identity'
	import type { EvmNetwork } from '$/schema/EvmNetwork'
	import { EntityType } from '$/schema/_Entity'


	// Props
	let {
		identity,
		displayType = IdentityDisplayType.Simple,
		defaultNetwork = { chainId: 1 },
	}: {
		identity: Identity['$id']
		displayType?: typeof IdentityDisplayType[keyof typeof IdentityDisplayType]
		defaultNetwork?: EvmNetwork['$id']
	} = $props()


	// Components
	import IdentityComponent from './Identity.svelte'
	import IdentityResolver from './IdentityResolver.svelte'
	import TruncatedValue from './TruncatedValue.svelte'
</script>


{#snippet IdentityLabel()}
	<span data-text="font-monospace">
		{#if identity.type === IdentityType.EvmActor}
			<TruncatedValue value={identity.actor.address} />

		{:else if identity.type === IdentityType.EnsDomain}
			{identity.ensDomain.name}

		{:else if identity.type === IdentityType.FarcasterAccount}
			{@const farcasterId = identity.farcasterAccount}
			{@const username = 'username' in farcasterId ? farcasterId.username : ('id' in farcasterId ? `fid:${farcasterId.id}` : null)}

			@{username}
		{/if}
	</span>
{/snippet}


{#if displayType === IdentityDisplayType.Simple}
	{@render IdentityLabel()}

{:else if displayType === IdentityDisplayType.Details}
	<details>
		<summary>
			{@render IdentityLabel()}
		</summary>

		<IdentityResolver
			identity={identity}
			preferredTypes={[IdentityType.EnsDomain, IdentityType.FarcasterAccount, IdentityType.EvmActor]}
			{defaultNetwork}
		>
			{#snippet children({ allResolvedIdentities })}
				{#if allResolvedIdentities.length > 0}
					<ul data-column="gap-1">
						{#each allResolvedIdentities as resolvedIdentity}
							<li>
								<IdentityComponent
									identity={resolvedIdentity.$id}
									displayType={IdentityDisplayType.Details}
									{defaultNetwork}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			{/snippet}
		</IdentityResolver>
	</details>
{/if}
