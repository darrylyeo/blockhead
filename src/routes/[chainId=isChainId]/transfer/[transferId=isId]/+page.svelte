<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// Components
	import Transfer from '$/views/entities/Transfer.svelte'


	// State
	const { transferId } = page.params
	const chainId = Number(page.params.chainId)

	const transfer = $derived(
		query(
			graphql(`
				query transfer($id: String!, $chainId: Int!) {
					transfer(
						id: $id
						chainId: $chainId
					) {
						...Transfer_Fragment
					}
				}
			`),
			{
				id: transferId,
				chainId
			}
		)
	)
</script>


{#if transfer.fetching}
	<div>Loading transfer...</div>
{:else if transfer.error}
	<div>Error: {transfer.error.message}</div>
{:else if transfer.data?.transfer}
	<Transfer transfer={transfer.data.transfer} />
{:else}
	<div>Transfer not found</div>
{/if} 