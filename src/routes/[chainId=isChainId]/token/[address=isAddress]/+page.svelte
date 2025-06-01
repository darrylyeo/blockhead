<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// Components
	import Token from '$/views/entities/Token.svelte'


	// State
	const { address } = page.params
	const chainId = Number(page.params.chainId)

	const token = $derived(
		query(
			graphql(`
				query token($address: Address!, $chainId: Int!) {
					token(
						address: $address
						chainId: $chainId
					) {
						...Token_Fragment
					}
				}
			`),
			{
				address: address as `0x${string}`,
				chainId
			}
		)
	)
</script>


{#if token.fetching}
	<div>Loading token...</div>
{:else if token.error}
	<div>Error: {token.error.message}</div>
{:else if token.data?.token}
	<Token token={token.data.token} />
{:else}
	<div>Token not found</div>
{/if}