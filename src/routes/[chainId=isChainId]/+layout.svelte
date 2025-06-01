<script lang="ts">
	// Types/constants
	import type { ChainId } from '$/entities/network'
	import { networksByChainId } from '$/data/networks'


	// Context
	import { graphql } from '$/state/graphql'


	// Functions
	import { query } from '$/lib/graphql.svelte'

	import { getViemClient } from '$/api/viem/index'
	import { watchBlockNumber } from 'viem/actions'

	
	// Props
	import { page } from '$app/state'
	const { children } = $props()

	// (Derived)
	const chainId = $derived(
		Number(page.params.chainId) as ChainId
	)

	const network = $derived(
		networksByChainId.get(chainId)
	)

	const client = $derived(
		getViemClient(chainId)
	)


	// State
	let latestBlockNumber = $state<bigint | undefined>()

	$effect(() => {
		client && (
			watchBlockNumber(
				client,
				{
					onBlockNumber: (blockNumber) => {
						latestBlockNumber = blockNumber
					},
				}
			)
		)
	})

	const blockQuery = $derived(
		latestBlockNumber !== undefined && (
			query(
				graphql(`
					query block(
						$identifier: String!
						$chainId: Int!
					) {
						block(
							identifier: $identifier
							chainId: $chainId
						) {
							__typename
							... on Block_Canonical {
								...Block_Base_Fragment
								confirmations
								isFinalized
								chainTipDistance
							}
							... on Block_Uncle {
								...Block_Base_Fragment
							}
							... on Block_Orphaned {
								...Block_Base_Fragment
							}
							... on Block_Pending {
								...Block_Base_Fragment
							}
						}
					}

					fragment Block_Base_Fragment on Block_Base {
						chainId
						blockNumber
						blockHash
						role
						status
						timestamp
						parentHash
						size
						gasLimit
						gasUsed
						gasUsedPercentage
						transactionCount
						baseFeePerGas
						difficulty
						minedAt
					}
				`),
				{
					identifier: latestBlockNumber.toString(),
					chainId,
				}
			)
		)
	)

	// Latest 10 blocks query - this one doesn't match fetch.ts operations since it uses Entities
	const latest10BlocksQuery = $derived(
		query(
			graphql(`
				query GetLatest10Blocks($chainId: Int!) {
					Entities(
						chainIds: [$chainId]
						types: [Block]
						limit: 10
					) {
						... on Block_Canonical {
							...Block_Summary_Fragment
						}
						... on Block_Uncle {
							...Block_Summary_Fragment
						}
						... on Block_Orphaned {
							...Block_Summary_Fragment
						}
						... on Block_Pending {
							...Block_Summary_Fragment
						}
					}
				}

				fragment Block_Summary_Fragment on Block_Base {
					__typename
					blockNumber
					blockHash
					chainId
					timestamp
					transactionCount
					gasUsed
					gasLimit
					baseFeePerGas
					size
					difficulty
					minedAt
					status
					role
				}
			`),
			{
				chainId,
			}
		)
	)


	// Components
	import Block from '$/views/entities/Block.svelte'
</script>


{#if latestBlockNumber && network}
	<section>
		<p>{network.name} is {latestBlockNumber.toLocaleString()} blocks long.</p>
	</section>
{/if}

<!-- {#if latest10BlocksQuery}
	<section>
		<h2>Latest 10 Blocks</h2>
		{#if latest10BlocksQuery.data?.Entities && Array.isArray(latest10BlocksQuery.data.Entities)}
			<div class="blocks-grid">
				{#each latest10BlocksQuery.data.Entities as block}
					<Block
						block={block}
					/>
				{/each}
			</div>
		{:else if latest10BlocksQuery.error}
			<p class="error">Error loading blocks: {latest10BlocksQuery.error.message}</p>
		{:else}
			<p>Loading latest blocks...</p>
		{/if}
	</section>
{/if} -->


{@render children()}


<style>
	.blocks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.error {
		color: #dc2626;
		font-weight: 500;
	}

	h2 {
		margin-bottom: 1rem;
		color: #1f2937;
	}
</style>
