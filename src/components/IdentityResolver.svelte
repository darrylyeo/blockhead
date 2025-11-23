<script lang="ts">
	// Types/constants
	import type { Identity } from '$/schema/Identity'
	import { IdentityType } from '$/schema/Identity'
	import type { EvmNetwork } from '$/schema/EvmNetwork'
	import { EntityType } from '$/schema/_Entity'
	import { identityResolutionMap } from '$/data/_identityResolvers'


	// Props
	let {
		identity,
		preferredTypes = [
			IdentityType.EnsDomain,
			IdentityType.FarcasterAccount,
			IdentityType.EvmActor,
		],
		defaultNetwork = { chainId: 1 },
		resolvedIdentity = $bindable(),
		children,
	}: {
		identity: Identity['$id']
		preferredTypes?: IdentityType[]
		defaultNetwork?: EvmNetwork['$id']
		resolvedIdentity?: Identity['$id']
		children?: import('svelte').Snippet<[{ 
			preferredIdentity: Identity
			allResolvedIdentities: Identity[]
		}]>
	} = $props()


	// State
	const resolvers = identityResolutionMap[identity.type] ?? {}
	const validTargetTypes = Object.keys(resolvers) as IdentityType[]
	const preferredTypesArray: IdentityType[] = Array.isArray(preferredTypes) ? preferredTypes : []
	const validPreferredTypes = preferredTypesArray.filter(type => validTargetTypes.includes(type))

	const allResolvedIdentities = $derived.by(async () => {
		const results = await Promise.allSettled(
			validTargetTypes.map(type => resolvers[type]?.(identity, defaultNetwork))
		)
		const resolved = results
			.filter((r): r is PromiseFulfilledResult<Identity> => r.status === 'fulfilled' && r.value !== null)
			.map(r => r.value)
		
		return resolved
	})

	const preferredIdentity = $derived.by(async () => {
		const all = await allResolvedIdentities
		return validPreferredTypes
			.map(type => all.find(r => r.$id.type === type))
			.find(Boolean) ?? {
				$type: EntityType.Identity,
				$id: identity,
				$fields: { links: [] }
			}
	})

	$effect(() => {
		preferredIdentity.then(id => {
			resolvedIdentity = id.$id
		})
	})


	// Components
	import Identity from './Identity.svelte'
</script>


<svelte:boundary>
	{#if children}
		{@render children({ 
			preferredIdentity: await preferredIdentity,
			allResolvedIdentities: await allResolvedIdentities
		})}
	{:else}
		<Identity
			identity={(await preferredIdentity).$id}
		/>
	{/if}
</svelte:boundary>
