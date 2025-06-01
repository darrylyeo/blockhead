<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import type { Balance as BalanceType } from '$/entities/balance'
	import { networksByChainId } from '$/data/networks'


	// Params
	const { balanceId } = page.params
	const chainId = Number(page.params.chainId)


	// Context
	import { graphql } from '$/state/graphql'


	// Functions
	import { query } from '$/lib/graphql.svelte'


	// State
	const balance = $derived(
		query(
			graphql(`
				query balance($id: String!, $chainId: Int!) {
					balance(
						address: $id
						chainId: $chainId
					) {
						...Balance_Fragment
					}
				}
			`),
			{
				id: balanceId,
				chainId,
			}
		)
	)


	// Components
	import BalanceComponent from '$/views/entities/Balance.svelte'
</script>


{#if balance.fetching}
	<div>Loading balance...</div>
{:else if balance.error}
	<div>Error: {balance.error.message}</div>
{:else if balance.data?.balance}
	<BalanceComponent balance={balance.data.balance} />
{:else}
	<div>Balance not found</div>
{/if}
