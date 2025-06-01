<!-- <script lang="ts">
	import ExampleUsage from '$/state/example-usage.svelte'
</script>


<ExampleUsage /> -->

<script lang="ts">
	import { goto } from '$app/navigation'

	// Sample data for feature examples
	const chainExamples: Record<string, { name: string; sampleAddress: string; sampleTx: string; sampleBlock: string }> = {
		'1': { 
			name: 'Ethereum', 
			sampleAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
			sampleTx: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
			sampleBlock: 22222222
		},
		'137': { 
			name: 'Polygon', 
			sampleAddress: '0x7ceb23fd6f0a6bd3c51e11e3b6c2c4be4e2b6432',
			sampleTx: '0x4b8c9ea7e0d8a234c6789def123456789abcdef123456789abcdef123456789ab',
			sampleBlock: 'latest'
		},
		'42161': { 
			name: 'Arbitrum', 
			sampleAddress: '0x912ce59144191c1204e64559fe8253a0e49e6548',
			sampleTx: '0x3a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
			sampleBlock: 'latest'
		},
		'10': { 
			name: 'Optimism', 
			sampleAddress: '0xa0b86a33e624000cc6634c05c6648e8151c8f50e62',
			sampleTx: '0x7d8e9f0123456789abcdef1234567890abcdef1234567890abcdef1234567890',
			sampleBlock: 'latest'
		},
		'8453': { 
			name: 'Base', 
			sampleAddress: '0x4200000000000000000000000000000000000010',
			sampleTx: '0x9a8b7c6d5e4f3210987654321098765432109876543210987654321098765432',
			sampleBlock: 'latest'
		}
	}

	const features = [
		{
			title: '🌌 Unified Timeline Visualization',
			description: 'Real-time 3D visualization spanning from Genesis block to latest transactions',
			details: [
				'Complete blockchain history access',
				'Interactive 3D environment',
				'Real-time activity updates',
				'Cross-chain entity relationships'
			],
			action: () => goto('/timeline'),
			buttonText: 'Explore Timeline →',
			highlight: true
		},
		{
			title: '🔍 Multi-Chain Explorer',
			description: 'Local-first block explorer with super-slick browsing experience',
			details: [
				'Ethereum, Polygon, Arbitrum, Optimism',
				'Base, BSC, Avalanche, Fantom',
				'Blocks, transactions, addresses',
				'Smart contracts & token analysis'
			],
			action: () => goto('/1/block/latest'),
			buttonText: 'Explore Blocks →'
		},
		{
			title: '👤 Address & Contract Inspector',
			description: 'Deep analysis of addresses, contracts, and their interactions',
			details: [
				'EOA and contract detection',
				'Balance & transaction history',
				'Token holdings & transfers',
				'Contract verification & ABI'
			],
			action: () => goto(`/1/address/${chainExamples['1'].sampleAddress}`),
			buttonText: 'Inspect Address →'
		},
		{
			title: '🔄 Transaction & Trace Analysis',
			description: 'Detailed transaction analysis with execution traces',
			details: [
				'Transaction details & status',
				'Internal transaction traces',
				'Event logs & transfers',
				'Gas analysis & MEV data'
			],
			action: () => goto('/1/transaction/0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060'),
			buttonText: 'Analyze Transactions →'
		},
		{
			title: '🪙 Token & DeFi Analytics',
			description: 'Comprehensive token analysis with DeFi integration',
			details: [
				'ERC20/721/1155 token support',
				'1inch DEX integration',
				'Real-time price data',
				'Swap quotes & execution'
			],
			action: () => goto('/1/token/0xA0b86a33E724000bf6768e3e00a8F69d'),
			buttonText: 'Explore Tokens →'
		},
		{
			title: '⚡ Resilient Data Architecture',
			description: 'Modern GraphQL-powered caching with 40+ data source compatibility',
			details: [
				'urql Graphcache unified data store',
				'Data normalization & caching',
				'Decoupled presentation layer',
				'Novel cross-vertical visualizations'
			],
			action: () => goto('/1'),
			buttonText: 'View Architecture →'
		}
	]

	const quickActions = [
		{ label: 'Latest Block', path: '/1/block/latest' },
		{ label: 'Timeline View', path: '/timeline' },
		{ label: 'Ethereum Chain', path: '/1' },
		{ label: 'Polygon Chain', path: '/137' },
		{ label: 'Arbitrum Chain', path: '/42161' },
		{ label: 'Base Chain', path: '/8453' }
	]
</script>

<div class="home">
	<header>
		<h1>Blockhead</h1>
		<p>Modern blockchain explorer with real-time 3D visualization</p>
		<p class="description">
			Browse blocks, transactions, and addresses across multiple chains with unified data sources
		</p>
		<p class="subtitle">✨ Live 3D blockchain visualization above — toggle with 🌌 button ✨</p>
		
		<div class="hero-actions">
			<button class="primary-cta" onclick={() => goto('/timeline')}>
				Explore Timeline
			</button>
		</div>
	</header>

	<section class="chain-showcase">
		<div class="chains-grid">
			{#each Object.entries(chainExamples) as [chainId, chain]}
				<div class="chain-card">
					<h3>{chain.name}</h3>
					<div class="chain-actions">
						<a href="/{chainId}/block" class="chain-link">Latest Blocks</a>
						<a href="/{chainId}/address/{chain.sampleAddress}" class="chain-link">Sample Address</a>
					</div>
				</div>
			{/each}
		</div>
	</section>
	
	<section class="features">
		{#each features as feature}
			<button 
				class="feature-card {feature.highlight ? 'highlight' : ''}" 
				onclick={feature.action}
			>
				<h2>{feature.title}</h2>
				<p>{feature.description}</p>
				<div class="feature-details">
					<ul>
						{#each feature.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>
				<span class="cta">{feature.buttonText}</span>
			</button>
		{/each}
	</section>
	
	<section class="quick-links">
		<h2>Quick Actions</h2>
		<div class="links-grid">
			{#each quickActions as action}
				<a href={action.path} class="quick-link">{action.label}</a>
			{/each}
		</div>
	</section>

	<section class="data-sources">
		<h2>Data Sources</h2>
		<div class="sources-grid">
			<div class="source-card">
				<h3>🏗️ Blockscout</h3>
				<p>Blockchain explorer API with comprehensive entity data</p>
			</div>
			<div class="source-card">
				<h3>⚡ Viem/JSON-RPC</h3>
				<p>Direct blockchain access for real-time data and contract interactions</p>
			</div>
			<div class="source-card">
				<h3>🔄 1inch Protocol</h3>
				<p>DeFi integration for token swaps, prices, and liquidity data</p>
			</div>
			<div class="source-card">
				<h3>📊 GraphQL Caching</h3>
				<p>Unified data store with intelligent caching across multiple sources</p>
			</div>
		</div>
	</section>
</div>

<style>
	.home {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}
	
	header {
		text-align: center;
		margin-bottom: 4rem;
	}
	
	header h1 {
		font-size: 3.5rem;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #00d4ff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		font-weight: 900;
	}
	
	header p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 0.5rem;
	}

	.description {
		font-size: 1.1rem !important;
		color: #555 !important;
		line-height: 1.4;
		max-width: 800px;
		margin: 1rem auto !important;
	}
	
	.subtitle {
		font-size: 1rem !important;
		color: #999 !important;
		margin-top: 1rem !important;
		font-style: italic;
	}

	.hero-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.primary-cta, .secondary-cta {
		padding: 1rem 2rem;
		border: none;
		border-radius: 8px;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-decoration: none;
		display: inline-block;
	}

	.primary-cta {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.secondary-cta {
		background: transparent;
		color: #667eea;
		border: 2px solid #667eea;
	}

	.primary-cta:hover, .secondary-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
	}
	
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}
	
	.feature-card {
		background: #fff;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
		text-align: left;
		width: 100%;
		font-family: inherit;
		position: relative;
		overflow: hidden;
	}

	.feature-card.highlight {
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%);
		border: 2px solid rgba(102, 126, 234, 0.2);
	}

	.feature-card.highlight::before {
		content: '⭐';
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 1.5rem;
	}
	
	.feature-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
	}
	
	.feature-card h2 {
		font-size: 1.5rem;
		margin-bottom: 0.75rem;
		color: #333;
	}
	
	.feature-card > p {
		color: #666;
		margin-bottom: 1.25rem;
		line-height: 1.5;
	}
	
	.feature-details {
		margin-bottom: 1.5rem;
	}
	
	.feature-details ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.feature-details li {
		padding: 0.4rem 0;
		color: #555;
		font-size: 0.9rem;
		padding-left: 1.5rem;
		position: relative;
	}
	
	.feature-details li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #4CAF50;
		font-weight: bold;
	}
	
	.cta {
		display: inline-block;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: opacity 0.2s;
	}
	
	.cta:hover {
		opacity: 0.9;
	}

	.chain-showcase {
		margin-bottom: 3rem;
	}

	.chain-showcase h2 {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 1.75rem;
		color: #333;
	}

	.chains-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
	}

	.chain-card {
		background: #f8f9fa;
		border-radius: 8px;
		padding: 1rem;
		text-align: center;
		border: 1px solid #e9ecef;
	}

	.chain-card h3 {
		margin-bottom: 0.75rem;
		color: #333;
		font-size: 1.125rem;
	}

	.chain-actions {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.chain-link {
		padding: 0.375rem 0.75rem;
		background: #fff;
		border: 1px solid #dee2e6;
		border-radius: 4px;
		text-decoration: none;
		color: #495057;
		font-size: 0.8rem;
		transition: all 0.2s;
		flex: 1;
		min-width: fit-content;
	}

	.chain-link:hover {
		background: #e9ecef;
		border-color: #adb5bd;
	}
	
	.quick-links {
		text-align: center;
		margin-bottom: 4rem;
	}
	
	.quick-links h2 {
		margin-bottom: 1.5rem;
		font-size: 2rem;
		color: #333;
	}
	
	.links-grid {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.quick-link {
		padding: 0.75rem 1.25rem;
		background: #f5f5f5;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		transition: all 0.2s;
		font-weight: 500;
	}
	
	.quick-link:hover {
		background: #e0e0e0;
		transform: translateY(-2px);
	}

	.data-sources {
		text-align: center;
	}

	.data-sources h2 {
		margin-bottom: 2rem;
		font-size: 2rem;
		color: #333;
	}

	.sources-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.source-card {
		background: #fff;
		border: 1px solid #e9ecef;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
	}

	.source-card h3 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
		color: #333;
	}

	.source-card p {
		color: #666;
		line-height: 1.5;
	}
	
	@media (max-width: 768px) {
		.features {
			grid-template-columns: 1fr;
		}
		
		.chains-grid {
			grid-template-columns: 1fr;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}
		
		header h1 {
			font-size: 2.5rem;
		}
	}
	
	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.feature-card, .chain-card, .source-card {
			background: #222;
			border-color: #444;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		}

		.story-card {
			background: rgba(102, 126, 234, 0.05);
			border-color: rgba(102, 126, 234, 0.15);
		}

		.story-card h2, .story-card p {
			color: #ddd;
		}

		.story-card strong {
			color: #8fb3ff;
		}
		
		.feature-card > p, .chain-card h3, .source-card h3, .source-card p {
			color: #aaa;
		}
		
		.feature-details li {
			color: #bbb;
		}
		
		.quick-link, .chain-link {
			background: #333;
			color: #ddd;
			border-color: #555;
		}
		
		.quick-link:hover, .chain-link:hover {
			background: #444;
		}

		.feature-card h2, .chain-showcase h2, .quick-links h2, .data-sources h2 {
			color: #fff;
		}

		.description {
			color: #bbb !important;
		}
	}
</style>
