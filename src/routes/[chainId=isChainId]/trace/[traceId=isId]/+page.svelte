<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// Components
	import Trace from '$/views/entities/Trace.svelte'


	// State
	const { traceId } = page.params
	const chainId = Number(page.params.chainId)

	const trace = $derived(
		query(
			graphql(`
				query trace($id: String!, $chainId: Int!) {
					trace(
						id: $id
						chainId: $chainId
					) {
						...Trace_Fragment
					}
				}
			`),
			{
				id: traceId,
				chainId
			}
		)
	)
</script>


{#if trace.fetching}
	<div>Loading trace...</div>
{:else if trace.error}
	<div>Error: {trace.error.message}</div>
{:else if trace.data?.trace}
	<Trace trace={trace.data.trace} />
{:else}
	<div>Trace not found</div>
{/if} 