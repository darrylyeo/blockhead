<script lang="ts">
	// Types/constants
	import { page } from '$app/state'
	import type { ChainId } from '$/entities/network'
	import { query } from '$/lib/graphql.svelte'
	import { graphql } from '$/state/graphql'


	// Components
	import Block from '$/views/entities/Block.svelte'


	// State
	const { blockId } = page.params
	const chainId = Number(page.params.chainId)

	const block = $derived(
		query(
			graphql(`
				query block($identifier: String!, $chainId: Int!) {
					block(
						identifier: $identifier
						chainId: $chainId
					) {
						...Block_Fragment
					}
				}
			`),
			{
				identifier: blockId,
				chainId
			}
		)
	)
</script>


{#if block.fetching}
	<div>Loading block...</div>
{:else if block.error}
	<div>Error: {block.error.message}</div>
{:else if block.data?.block}
	<Block block={block.data.block} />
{:else}
	<div>Block not found</div>
{/if}