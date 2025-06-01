<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// Components
	import Transaction from '$/views/entities/Transaction.svelte'


	// State
	const { hash } = page.params
	const chainId = Number(page.params.chainId)

	const transaction = $derived(
		query(graphql(`
			query transaction($hash: Hash!, $chainId: Int!) {
				transaction(
					hash: $hash
					chainId: $chainId
				) {
					...Transaction_Fragment
				}
			}
		`), { hash: hash as `0x${string}`, chainId })
	)
</script>


{#if transaction.fetching}
	<div>Loading transaction...</div>
{:else if transaction.error}
	<div>Error: {transaction.error.message}</div>
{:else if transaction.data?.transaction}
	<Transaction transaction={transaction.data.transaction} />
{:else}
	<div>Transaction not found</div>
{/if} 