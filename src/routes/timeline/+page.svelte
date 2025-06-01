<script lang="ts">
	import { EntityType } from '$/entities'
	import { graphql } from '$/state/graphql'
	import { query } from '$/lib/graphql.svelte'
	
	// State
	let chainId = $state(1)

	// Real entities query that reads from cache
	// Note: This uses Entities root field which doesn't have a corresponding operation in fetch.ts
	const entitiesResult = $derived(
		query(
			graphql(`
				query GetEntities(
					$chainIds: [Int!]!
					$types: [EntityType!]!
					$limit: Int
					$offset: Int
				) {
					Entities(
						chainIds: $chainIds
						types: $types
						limit: $limit
						offset: $offset
					) {
						__typename
						... on Block_Canonical {
							blockNumber
							blockHash
							chainId
							timestamp
							transactionCount
							gasUsed
							gasLimit
							baseFeePerGas
						}
						... on Block_Uncle {
							blockNumber
							blockHash
							chainId
							timestamp
							transactionCount
							gasUsed
							gasLimit
							baseFeePerGas
						}
						... on Block_Orphaned {
							blockNumber
							blockHash
							chainId
							timestamp
							transactionCount
							gasUsed
							gasLimit
							baseFeePerGas
						}
						... on Block_Pending {
							blockNumber
							blockHash
							chainId
							timestamp
							transactionCount
							gasUsed
							gasLimit
							baseFeePerGas
						}
						... on Transaction {
							__typename
							id
							chainId
							blockNumber
							timestamp
							from
							to
							value
							gasUsed
							gasPrice
							status
						}
						... on Transfer {
							__typename
							id
							chainId
							blockNumber
							timestamp
							transactionHash
							from
							to
							standard
							tokenData {
								tokenAddress
								amount
								symbol
								name
							}
						}
						... on Actor_Contract {
							__typename
							type
							address
							chainId
							bytecode
							creationTransaction
							contractTags
						}
						... on Actor_Eoa {
							__typename
							type
							address
							chainId
							ensName
							ensAvatar
						}
						... on Token_Erc20 {
							__typename
							address
							chainId
							standard
							name
							symbol
							decimals
						}
						... on Token_Native {
							__typename
							address
							chainId
							standard
							networkName
							consensusType
						}
					}
				}
			`),
			{
				chainIds: [chainId],
				types: [EntityType.Block, EntityType.Transaction, EntityType.Transfer, EntityType.Actor, EntityType.Token],
				limit: 50,
				offset: 0
			}
		)
	)

	// Components
	import { Canvas } from '@threlte/core'
	import Visualization from '$/views/threlte/Visualization.svelte'
	import VisualizationOld from '$/views/threlte/VisualizationOld.svelte'
</script>

<div class="timeline-page">
	<header>
		<h1>Blockchain Timeline</h1>
		<p>Real-time visualization of blockchain entities from cached data</p>
		
		<div class="controls">
			<label>
				Chain ID:
				<select bind:value={chainId}>
					<option value={1}>Ethereum (1)</option>
					<option value={137}>Polygon (137)</option>
					<option value={42161}>Arbitrum (42161)</option>
					<option value={10}>Optimism (10)</option>
					<option value={8453}>Base (8453)</option>
				</select>
			</label>
		</div>
	</header>

	<main>
		{#if entitiesResult.fetching}
			<div class="loading">Loading cached entities...</div>
		{:else if entitiesResult.error}
			<div class="error">Error: {entitiesResult.error.message}</div>
		{:else}
			<div class="stats">
				<p>Showing {Array.isArray(entitiesResult.data?.Entities) ? entitiesResult.data.Entities.length : 0} cached entities</p>
			</div>
			
			<div class="visualization">
				<Canvas>
					<Visualization
						{chainId}
						compact={false}
						entities={Array.isArray(entitiesResult.data?.Entities) ? entitiesResult.data.Entities : []}
					/>
				</Canvas>
			</div>

			<div class="visualization-old">
				<Canvas>
					<VisualizationOld
						{chainId}
						compact={false}
						entities={Array.isArray(entitiesResult.data?.Entities) ? entitiesResult.data.Entities : []}
					/>
				</Canvas>
			</div>
		{/if}
	</main>
</div>

<style>
	.timeline-page {
		min-height: 100vh;
		background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
		color: white;
	}

	header {
		padding: 2rem;
		text-align: center;
		border-bottom: 1px solid #333;
	}

	h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		background: linear-gradient(45deg, #00d4ff, #ff00d4);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.controls {
		margin-top: 1rem;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 1rem;
	}

	select {
		padding: 0.5rem;
		border: 1px solid #444;
		background: #222;
		color: white;
		border-radius: 4px;
	}

	main {
		padding: 2rem;
	}

	.loading, .error {
		text-align: center;
		padding: 2rem;
		font-size: 1.2rem;
	}

	.error {
		color: #ff6b6b;
	}

	.stats {
		text-align: center;
		margin-bottom: 1rem;
		opacity: 0.8;
	}

	.visualization {
		height: 70vh;
		border: 1px solid #333;
		border-radius: 8px;
		overflow: hidden;
	}
</style> 