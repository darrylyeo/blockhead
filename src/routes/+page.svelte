<!-- <script lang="ts">
	import ExampleUsage from '$/state/example-usage.svelte'
</script>


<ExampleUsage /> -->

<script lang="ts">
	import { goto } from '$app/navigation'
</script>


<div class="home">
	<header>
		<h1>Blockhead Vision</h1>
		<p>Explore blockchain data with powerful visualizations and insights</p>
		<p class="subtitle">✨ Live blockchain activity visualization above ✨</p>
	</header>
	
	<section class="features">
		<button class="feature-card" onclick={() => goto('/1/block/latest')}>
			<h2>🔍 Block Explorer</h2>
			<p>Deep dive into blocks, transactions, and addresses</p>
			<div class="feature-details">
				<ul>
					<li>Comprehensive entity views</li>
					<li>Transaction traces and events</li>
					<li>Token transfers and balances</li>
					<li>Smart contract interactions</li>
				</ul>
			</div>
			<span class="cta">Explore Blocks →</span>
		</button>
		
		<button class="feature-card" onclick={() => goto('/1/address/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}>
			<h2>👤 Address Inspector</h2>
			<p>Analyze addresses, contracts, and their activities</p>
			<div class="feature-details">
				<ul>
					<li>EOA and contract details</li>
					<li>Balance history</li>
					<li>Transaction history</li>
					<li>Token holdings</li>
				</ul>
			</div>
			<span class="cta">View Addresses →</span>
		</button>
		
		<button class="feature-card" onclick={() => goto('/network/1')}>
			<h2>🌐 Networks & Chains</h2>
			<p>Explore different blockchain networks and their configurations</p>
			<div class="feature-details">
				<ul>
					<li>Network parameters</li>
					<li>RPC endpoints</li>
					<li>System contracts</li>
					<li>Network statistics</li>
				</ul>
			</div>
			<span class="cta">View Networks →</span>
		</button>
	</section>
	
	<section class="quick-links">
		<h2>Quick Links</h2>
		<div class="links-grid">
			<a href="/nft">NFTs</a>
			<a href="/ens">ENS Domains</a>
			<a href="/validator">Validators</a>
			<a href="/network">Networks</a>
			<a href="/datasource">Data Sources</a>
		</div>
	</section>
</div>


<style>
	.home {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}
	
	header {
		text-align: center;
		margin-bottom: 3rem;
	}
	
	header h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	
	header p {
		font-size: 1.25rem;
		color: #666;
	}
	
	.subtitle {
		font-size: 1rem !important;
		color: #999 !important;
		margin-top: 0.5rem;
		font-style: italic;
	}
	
	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}
	
	.feature-card {
		background: #fff;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
		text-align: left;
		width: 100%;
		font-family: inherit;
	}
	
	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
	}
	
	.feature-card h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}
	
	.feature-card > p {
		color: #666;
		margin-bottom: 1rem;
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
		padding: 0.25rem 0;
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
	}
	
	.cta {
		display: inline-block;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-size: 1rem;
		cursor: pointer;
		transition: opacity 0.2s;
	}
	
	.cta:hover {
		opacity: 0.9;
	}
	
	.quick-links {
		text-align: center;
	}
	
	.quick-links h2 {
		margin-bottom: 1.5rem;
	}
	
	.links-grid {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.links-grid a {
		padding: 0.5rem 1rem;
		background: #f5f5f5;
		border-radius: 6px;
		text-decoration: none;
		color: #333;
		transition: all 0.2s;
	}
	
	.links-grid a:hover {
		background: #e0e0e0;
		transform: translateY(-2px);
	}
	
	@media (max-width: 768px) {
		.features {
			grid-template-columns: 1fr;
		}
		
		header h1 {
			font-size: 2rem;
		}
	}
	
	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.feature-card {
			background: #222;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		}
		
		.feature-card > p {
			color: #aaa;
		}
		
		.feature-details li {
			color: #bbb;
		}
		
		.links-grid a {
			background: #333;
			color: #ddd;
		}
		
		.links-grid a:hover {
			background: #444;
		}
	}
</style>
