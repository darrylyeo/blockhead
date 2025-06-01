<script lang="ts">
	// Props
	let {
		children,
	} = $props()


	// Context / global state
	import { client, graphql } from '$/state/graphql'
	import { setContextClient } from '@urql/svelte'
	setContextClient(client)


	// State
	let showVisualization = $state(true)


	// Components
	import Nav from '$/views/Nav.svelte'
	import { Canvas } from '@threlte/core'
	import Visualization from '$/views/threlte/Visualization.svelte'


	// Styles
	import '$/app.css'
</script>


<div class="app-layout">
	<!-- Blockchain visualization background -->
	{#if showVisualization}
		<div class="visualization-layer">
			<Canvas>
				<!-- <Visualization
					compact={true}
					chainId={1}
					entitiesQuery={graphql(`
						query GetEntities(
							$chainIds: [Int!]!
							$types: [EntityType!]!
							$limit: Int
						) {
							entities(
								chainIds: $chainIds
								types: $types
								limit: $limit
							) {
								... on Block {
									blockNumber
									blockHash
									chainId
									timestamp
									transactionCount
									gasUsed
									gasLimit
									miner
								}
								... on Transaction {
									id
									chainId
									hash
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
								... on TransferEvent {
									id
									chainId
									blockNumber
									timestamp
									transactionHash
									transferType
									from
									to
									tokenAddress
									amount
									valueUsd
								}
								... on Contract {
									address
									chainId
									name
									standards
									categories
									verificationDate
								}
							}
						}
					`)}
					entitiesVariables={{ 
						chainIds: [1], 
						types: ["Block", "Transaction", "Transfer"], 
						limit: 50 
					}}
				/> -->
			</Canvas>
			<button
				class="visualization-toggle"
				onclick={() => showVisualization = false}
				title="Hide blockchain visualization"
			>
				×
			</button>
		</div>
	{:else}
		<button
			class="visualization-toggle show"
			onclick={() => showVisualization = true}
			title="Show blockchain visualization"
		>
			🌌
		</button>
	{/if}
	
	<!-- Main content -->
	<div class="content-layer">
		<Nav />
		
		<main>
			{@render children()}
		</main>
	</div>
</div>


<style>
	.app-layout {
		position: relative;
		min-height: 100vh;
	}
	
	.visualization-layer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 120px;
		z-index: 10;
		opacity: 0.4;
		pointer-events: none;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.95) 0%,
			rgba(0, 0, 0, 0.7) 50%,
			transparent 100%
		);
		transition: opacity 0.3s ease;
	}
	
	.visualization-layer:hover {
		opacity: 0.6;
	}
	
	.visualization-toggle {
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 11;
		pointer-events: all;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: white;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		transition: all 0.2s ease;
		backdrop-filter: blur(10px);
	}
	
	.visualization-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: scale(1.1);
	}
	
	.visualization-toggle.show {
		background: rgba(102, 126, 234, 0.2);
		border: 1px solid rgba(102, 126, 234, 0.5);
	}
	
	.content-layer {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		background: white;
	}
	
	:global(nav) {
		position: relative;
		z-index: 20;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	
	main {
		padding-top: 1rem;
	}
	
	@media (max-width: 768px) {
		.visualization-layer {
			height: 80px;
		}
		
		.visualization-toggle {
			width: 24px;
			height: 24px;
			font-size: 14px;
		}
	}
	
	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.content-layer {
			background: #111;
		}
		
		:global(nav) {
			background: #222;
		}
		
		.visualization-layer {
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.8) 0%,
				rgba(0, 0, 0, 0.5) 50%,
				transparent 100%
			);
		}
	}
</style>
