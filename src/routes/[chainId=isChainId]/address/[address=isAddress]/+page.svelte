<script lang="ts">
	// Params
	import { page } from '$app/state'
	const address = page.params.address as Address
	const chainId = Number(page.params.chainId) as ChainId


	// Context
	import { graphql } from '$/state/graphql'


	// Functions
	import { query } from '$/lib/graphql.svelte'


	// State
	const actor = $derived(
		query(
			graphql(`
				query actor(
					$address: Address!
					$chainId: Int!
				) {
					actor(
						address: $address
						chainId: $chainId
					) {
						...Actor_Fragment
					}
				}
			`),
			{
				address: address as `0x${string}`,
				chainId,
			}
		)
	)

	$inspect(actor)

	// Debug logging
	$effect(() => {
		console.log('Query result:', {
			fetching: actor.fetching,
			error: actor.error,
			data: actor.data,
			hasActor: !!actor.data?.actor
		})
	})


	// Components
	import Actor from '$/views/entities/Actor.svelte'
	import type { Address } from 'viem'
	import type { ChainId } from '$/entities/network'
</script>


{#if actor.fetching}
	<div>Loading actor...</div>
{:else if actor.error}
	<div>Error: {actor.error.message}</div>
{:else if actor.data?.actor}
	<Actor actor={actor.data.actor} />
{:else}
	<div>Actor not found</div>
{/if}
