<script lang="ts">
	// Props
	let {
		children,
	} = $props()

	// Context / global state
	import { client, graphql } from '$/state/graphql'
	import { setContextClient } from '@urql/svelte'
	setContextClient(client)

	// Components
	import Nav from '$/views/Nav.svelte'
	import Visualization from '$/views/threlte/Visualization.svelte'
	import { Canvas } from '@threlte/core'

	// Styles
	import '$/app.css'
</script>


<div class="app-layout">
	<Nav />

	<div class="visualization">
		<Canvas>
			<Visualization
				compact={true}
				chainId={1}
			/>
		</Canvas>
	</div>
	
	<main>
		{@render children()}
	</main>
</div>


<style>
	.app-layout {
		position: relative;
		min-height: 100vh;
	}
	
	.visualization {
		position: sticky;
		top: 0;
	}
	
	main {
		position: relative;
		min-height: 100vh;
		margin-top: -40vh;
		padding-top: 160px;
	}
	
	/* Progressive blur masking with :before and :after */
	main::before {
		content: '';
		position: fixed;
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
		z-index: 2;
		pointer-events: none;
	}
	
	main::after {
		content: '';
		position: fixed;
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
		z-index: 3;
		pointer-events: none;
	}
	
	:global(nav) {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
		margin-top: -160px;
	}
	
	main {
		position: relative;
		z-index: 4;
		padding-top: 1rem;
		background: white;
	}
	
	@media (max-width: 768px) {
		.visualization-container {
			height: 120px;
		}
		
		main {
			padding-top: 120px;
		}
		
		main::before {
			height: 80px;
		}
		
		main::after {
			top: 20px;
			height: 60px;
		}

		:global(nav) {
			margin-top: -120px;
		}
	}
	
	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		main::before {
			background: linear-gradient(
				to bottom,
				rgba(10, 10, 10, 0) 0%,
				rgba(10, 10, 10, 0.3) 40%,
				rgba(10, 10, 10, 0.7) 70%,
				rgba(10, 10, 10, 0.95) 100%
			);
		}
		
		main::after {
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
		main::before {
			backdrop-filter: blur(4px);
		}
		
		main::after {
			backdrop-filter: blur(12px);
		}
		
		:global(nav) {
			backdrop-filter: blur(25px);
		}
	}
	
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style> 