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
	<!-- Sticky blockchain visualization -->
	{#if showVisualization}
		<div class="visualization-container">
			<div class="visualization-layer">
				<Canvas>
					<Visualization
						compact={true}
						chainId={1}
					/>

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
			</div>
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
	
	<!-- Main content with progressive blur overlay -->
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
	
	.visualization-container {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		height: 160px;
		z-index: 10;
		overflow: hidden;
	}
	
	.visualization-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.8;
		pointer-events: none;
	}
	
	.visualization-toggle {
		position: absolute;
		top: 15px;
		right: 15px;
		z-index: 15;
		pointer-events: all;
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.25);
		color: white;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		transition: all 0.3s ease;
		backdrop-filter: blur(12px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	
	.visualization-toggle:hover {
		background: rgba(255, 255, 255, 0.25);
		transform: scale(1.1);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
	}
	
	.visualization-toggle.show {
		position: fixed;
		background: rgba(102, 126, 234, 0.2);
		border: 1px solid rgba(102, 126, 234, 0.5);
	}
	
	.content-layer {
		position: relative;
		z-index: 12;
		min-height: 100vh;
		background: white;
		margin-top: -80px;
		padding-top: 80px;
	}
	
	/* Progressive blur masking with :before and :after */
	.content-layer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 120px;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.3) 40%,
			rgba(255, 255, 255, 0.7) 70%,
			rgba(255, 255, 255, 0.95) 100%
		);
		backdrop-filter: blur(0px);
		z-index: 1;
		pointer-events: none;
	}
	
	.content-layer::after {
		content: '';
		position: absolute;
		top: 40px;
		left: 0;
		right: 0;
		height: 80px;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.1) 30%,
			rgba(255, 255, 255, 0.4) 60%,
			rgba(255, 255, 255, 0.8) 100%
		);
		backdrop-filter: blur(8px);
		z-index: 2;
		pointer-events: none;
	}
	
	:global(nav) {
		position: relative;
		z-index: 20;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
	}
	
	main {
		position: relative;
		z-index: 3;
		padding-top: 1rem;
		background: white;
	}
	
	@media (max-width: 768px) {
		.visualization-container {
			height: 120px;
		}
		
		.content-layer {
			margin-top: -60px;
			padding-top: 60px;
		}
		
		.content-layer::before {
			height: 80px;
		}
		
		.content-layer::after {
			top: 20px;
			height: 60px;
		}
		
		.visualization-toggle {
			width: 28px;
			height: 28px;
			font-size: 14px;
			top: 10px;
			right: 10px;
		}
	}
	
	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.content-layer {
			background: #0a0a0a;
		}
		
		.content-layer::before {
			background: linear-gradient(
				to bottom,
				rgba(10, 10, 10, 0) 0%,
				rgba(10, 10, 10, 0.3) 40%,
				rgba(10, 10, 10, 0.7) 70%,
				rgba(10, 10, 10, 0.95) 100%
			);
		}
		
		.content-layer::after {
			background: linear-gradient(
				to bottom,
				rgba(10, 10, 10, 0) 0%,
				rgba(10, 10, 10, 0.1) 30%,
				rgba(10, 10, 10, 0.4) 60%,
				rgba(10, 10, 10, 0.8) 100%
			);
		}
		
		:global(nav) {
			background: rgba(34, 34, 34, 0.95);
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}
		
		main {
			background: #0a0a0a;
		}
	}
	
	/* Enhanced blur effect for supported browsers */
	@supports (backdrop-filter: blur(20px)) {
		.content-layer::before {
			backdrop-filter: blur(4px);
		}
		
		.content-layer::after {
			backdrop-filter: blur(12px);
		}
		
		:global(nav) {
			backdrop-filter: blur(25px);
		}
	}
</style>
