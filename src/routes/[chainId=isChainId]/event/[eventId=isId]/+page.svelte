<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// State
	const { eventId } = page.params
	const chainId = Number(page.params.chainId)

	const event = $derived(
		query(
			graphql(`
				query event($id: String!, $chainId: Int!) {
					event(
						id: $id
						chainId: $chainId
					) {
						...Event_Fragment
					}
				}
			`),
			{
				id: eventId,
				chainId
			}
		)
	)


	// Components
	import Event from '$/views/entities/Event.svelte'
</script>


{#if event.fetching}
	<div>Loading event...</div>
{:else if event.error}
	<div>Error: {event.error.message}</div>
{:else if event.data?.event}
	<Event event={event.data.event} />
{:else}
	<div>Event not found</div>
{/if}
