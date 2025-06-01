<script lang="ts">
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { route, routes } from '$/ROUTES'
	import type { Routes } from '$/ROUTES'

	// Components
	import DatasourcePicker from '$/components/DatasourcePicker.svelte'

	// Chain name mapping
	const chainNames: Record<string, string> = {
		'1': 'Ethereum',
		'137': 'Polygon',
		'42161': 'Arbitrum',
		'10': 'Optimism',
		'8453': 'Base',
		'56': 'BSC',
		'43114': 'Avalanche',
		'250': 'Fantom'
	}

	// Entity type display names
	const entityTypeNames: Record<string, string> = {
		home: 'Home',
		address: 'Address',
		transaction: 'Transaction',
		block: 'Block',
		token: 'Token',
		event: 'Event',
		trace: 'Trace',
		balance: 'Balance',
		transfer: 'Transfer',
		timeline: 'Timeline',
		tx: 'Transaction'
	}

	type RouteSegment = {
		type: 'static' | 'param'
		name: string
		paramType?: string
		value?: string
		suggestions?: string[]
	}

	// State
	let pathSegments = $state<RouteSegment[]>([])
	let autocompleteInput = $state('')
	let autocompleteVisible = $state(false)
	let autocompleteSuggestions = $state<Routes[]>([])
	let selectedSuggestionIndex = $state(-1)
	let chainsDropdownVisible = $state(false)

	// Parse current URL into segments using the route patterns
	const parseCurrentPath = (pathname: string): RouteSegment[] => {
		const segments = pathname.split('/').filter(Boolean)
		const result: RouteSegment[] = []
		
		// Try to match against known routes
		const matchingRoute = routes.find(routePath => {
			const routeSegments = routePath.split('/').filter(Boolean)
			if (routeSegments.length !== segments.length) return false
			
			return routeSegments.every((segment, i) => {
				if (segment.includes('${')) {
					// This is a dynamic segment - accept any value
					return true
				} else {
					// Static segment must match exactly
					return segment === segments[i]
				}
			})
		})
		
		if (matchingRoute) {
			const routeSegments = matchingRoute.split('/').filter(Boolean)
			routeSegments.forEach((segment, i) => {
				if (segment.includes('${')) {
					// Dynamic parameter segment
					let paramName = 'param'
					let paramType = 'string'
					
					// Infer parameter type from position and route structure
					if (i === 0) {
						paramName = 'chainId'
						paramType = 'chainId'
					} else if (segment.includes('address')) {
						paramName = 'address'
						paramType = 'address'
					} else if (segment.includes('hash')) {
						paramName = 'hash'
						paramType = 'hash'
					} else if (segment.includes('Id')) {
						paramName = segment.replace('${string}', '').replace('/', '') + 'Id'
						paramType = 'id'
					}
					
					result.push({
						type: 'param',
						name: paramName,
						paramType,
						value: segments[i],
						suggestions: getSegmentSuggestions(paramType)
					})
				} else {
					result.push({
						type: 'static',
						name: segment,
						value: segments[i]
					})
				}
			})
		}
		
		return result
	}

	// Update path segments when page changes
	$effect(() => {
		pathSegments = parseCurrentPath($page.url.pathname)
	})

	// Generate possible completions for a partial path
	const getPathCompletions = (partialPath: string): Routes[] => {
		const normalizedInput = partialPath.toLowerCase().trim()
		if (!normalizedInput) return []
		
		return routes.filter(routePath => 
			routePath.toLowerCase().includes(normalizedInput) ||
			routePath.toLowerCase().startsWith(normalizedInput)
		).slice(0, 10) // Limit to 10 suggestions
	}

	// Update autocomplete suggestions when input changes
	$effect(() => {
		if (autocompleteInput.trim()) {
			autocompleteSuggestions = getPathCompletions(autocompleteInput)
			autocompleteVisible = autocompleteSuggestions.length > 0
			selectedSuggestionIndex = -1
		} else {
			autocompleteVisible = false
			autocompleteSuggestions = []
		}
	})

	// Navigate to path segment
	const navigateToSegment = (segmentIndex: number) => {
		const pathParts = pathSegments.slice(0, segmentIndex + 1).map(s => s.value).filter(Boolean)
		const newPath = '/' + pathParts.join('/')
		goto(newPath)
	}

	// Update segment value and navigate
	const updateSegment = (segmentIndex: number, newValue: string) => {
		const updatedSegments = [...pathSegments]
		updatedSegments[segmentIndex].value = newValue
		
		// Build route path based on the updated segments
		try {
			const pathParts = updatedSegments.slice(0, segmentIndex + 1).map(s => s.value).filter((v): v is string => Boolean(v))
			
			// For dynamic routes, we need to construct the path manually
			let newPath = '/' + pathParts.join('/')
			
			// If this looks like a known route pattern, try to use the route function
			const routePattern = findMatchingRoutePattern(pathParts)
			if (routePattern) {
				newPath = buildRouteFromPattern(routePattern, pathParts)
			}
			
			goto(newPath)
		} catch (error) {
			console.warn('Failed to navigate with route function, falling back to string path:', error)
			const pathParts = updatedSegments.slice(0, segmentIndex + 1).map(s => s.value).filter((v): v is string => Boolean(v))
			const newPath = '/' + pathParts.join('/')
			goto(newPath)
		}
	}

	// Find matching route pattern for path parts
	const findMatchingRoutePattern = (pathParts: string[]): string | null => {
		// Simple heuristic to match common patterns
		if (pathParts.length === 1) {
			// Could be chainId
			if (chainNames[pathParts[0]]) {
				return '/[chainId=isChainId]'
			}
		} else if (pathParts.length === 3) {
			// Could be /:chainId/:type/:param
			const [chainId, type, param] = pathParts
			if (chainNames[chainId]) {
				switch (type) {
					case 'address':
						return '/[chainId=isChainId]/address/[address=isAddress]'
					case 'transaction':
						return '/[chainId=isChainId]/transaction/[hash=isHash]'
					case 'block':
						return '/[chainId=isChainId]/block/[blockId=isBlockId]'
					case 'token':
						return '/[chainId=isChainId]/token/[address=isAddress]'
					case 'event':
						return '/[chainId=isChainId]/event/[eventId=isId]'
					case 'trace':
						return '/[chainId=isChainId]/trace/[traceId=isId]'
					case 'balance':
						return '/[chainId=isChainId]/balance/[balanceId=isId]'
					case 'transfer':
						return '/[chainId=isChainId]/transfer/[transferId=isId]'
					case 'tx':
						return '/[chainId=isChainId]/tx/[transactionId=isTransactionId]'
				}
			}
		}
		return null
	}

	// Build route using the route function
	const buildRouteFromPattern = (pattern: string, pathParts: string[]): string => {
		// Extract parameter names from pattern
		const matches = pattern.match(/\[([^\]]+)\]/g)
		if (!matches) return '/' + pathParts.join('/')
		
		const params: Record<string, string> = {}
		let partIndex = 0
		
		pattern.split('/').forEach(segment => {
			if (segment.startsWith('[') && segment.endsWith(']')) {
				const paramName = segment.slice(1, -1).split('=')[0]
				if (partIndex < pathParts.length) {
					params[paramName] = pathParts[partIndex]
				}
				partIndex++
			} else if (segment && partIndex < pathParts.length) {
				partIndex++
			}
		})
		
		try {
			return route(pattern as any, params as any)
		} catch {
			return '/' + pathParts.join('/')
		}
	}

	// Handle autocomplete navigation
	const navigateToAutocomplete = (path: Routes) => {
		autocompleteInput = ''
		autocompleteVisible = false
		goto(path)
	}

	// Handle keyboard navigation in autocomplete
	const handleAutocompleteKeydown = (event: KeyboardEvent) => {
		if (!autocompleteVisible) return

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, autocompleteSuggestions.length - 1)
				break
			case 'ArrowUp':
				event.preventDefault()
				selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1)
				break
			case 'Enter':
				event.preventDefault()
				if (selectedSuggestionIndex >= 0) {
					navigateToAutocomplete(autocompleteSuggestions[selectedSuggestionIndex])
				} else if (autocompleteSuggestions.length > 0) {
					navigateToAutocomplete(autocompleteSuggestions[0])
				}
				break
			case 'Escape':
				event.preventDefault()
				autocompleteVisible = false
				autocompleteInput = ''
				break
		}
	}

	// Get display name for segment
	const getSegmentDisplayName = (segment: RouteSegment): string => {
		if (segment.type === 'static') {
			return entityTypeNames[segment.name] || segment.name
		}
		
		if (segment.name === 'chainId' && segment.value) {
			return chainNames[segment.value] || `Chain ${segment.value}`
		}
		
		if (segment.value) {
			if (segment.value.length > 20) {
				return `${segment.value.slice(0, 8)}...${segment.value.slice(-8)}`
			}
			return segment.value
		}
		
		return segment.name
	}

	// Get suggestions for a segment type
	const getSegmentSuggestions = (paramType?: string): string[] => {
		switch (paramType) {
			case 'chainId':
				return ['1', '137', '42161', '10', '8453', '56', '43114', '250']
			case 'address':
				return [
					'0x742d35Cc6634C0532925a3b8D',
					'0xA0b86a33E6724000bf6768e3e00a8F69d',
					'0xdAC17F958D2ee523a2206206994597C13D831ec7'
				]
			case 'hash':
				return [
					'0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
					'0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
				]
			case 'blockId':
				return ['18500000', '18600000', 'latest', 'earliest', 'pending']
			case 'id':
				return ['evt_123', 'log_456', 'trace_789', 'bal_123', 'txf_456']
			default:
				return []
		}
	}

	// Validate segment value using basic validation
	const isValidSegmentValue = (segment: RouteSegment, value: string): boolean => {
		if (!segment.paramType || !value) return true
		
		switch (segment.paramType) {
			case 'chainId':
				return /^\d+$/.test(value)
			case 'address':
				return /^0x[a-fA-F0-9]{40}$/.test(value)
			case 'hash':
				return /^0x[a-fA-F0-9]{64}$/.test(value)
			case 'blockId':
				return /^\d+$/.test(value) || ['latest', 'earliest', 'pending'].includes(value)
			case 'id':
				return value.length > 0
			default:
				return true
		}
	}
</script>


<nav class="breadcrumb-nav">
	<a href="/">
		<!-- <img src="/logo.svg" alt="Blockhead" class="logo" /> -->
		<span class="logo">
			Blockhead
			<small>Vision</small>
		</span>
	</a>

	<div class="breadcrumb-segments">
		{#each pathSegments as segment, index}
			{#if segment.type === 'static'}
				<span class="static-segment">
					<button
						onclick={() => navigateToSegment(index)}
						class="segment-button"
					>
						{getSegmentDisplayName(segment)}
					</button>
				</span>
			{:else}
				<span class="param-segment">
					<select
						value={segment.value || ''}
						onchange={(e) => updateSegment(index, e.currentTarget.value)}
						class="segment-select"
						class:invalid={!isValidSegmentValue(segment, segment.value || '')}
					>
						<option value="" disabled>
							Select {segment.name}
						</option>
						{#each getSegmentSuggestions(segment.paramType) as suggestion}
							<option value={suggestion}>
								{segment.name === 'chainId' && chainNames[suggestion]
									? `${chainNames[suggestion]} (${suggestion})`
									: suggestion.length > 30
										? `${suggestion.slice(0, 12)}...${suggestion.slice(-12)}`
										: suggestion
								}
							</option>
						{/each}
					</select>
				</span>
			{/if}
			
			{#if index < pathSegments.length - 1}
				<span class="separator">/</span>
			{/if}
		{/each}
	</div>

	<div class="autocomplete-container">
		<input
			bind:value={autocompleteInput}
			onkeydown={handleAutocompleteKeydown}
			onfocus={() => autocompleteVisible = autocompleteSuggestions.length > 0}
			onblur={() => setTimeout(() => autocompleteVisible = false, 200)}
			placeholder="Navigate to path... (e.g., /1/address/0x...)"
			class="autocomplete-input"
		>
		
		{#if autocompleteVisible}
			<div class="autocomplete-dropdown">
				{#each autocompleteSuggestions as suggestion, index}
					<button
						onclick={() => navigateToAutocomplete(suggestion)}
						class="autocomplete-item"
						class:selected={index === selectedSuggestionIndex}
					>
						{suggestion}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<div class="static-links">
		<DatasourcePicker />
		<a href="/timeline" class="nav-link">Timeline</a>
		
		<div class="chains-dropdown">
			<button 
				class="chains-button"
				onmouseenter={() => chainsDropdownVisible = true}
				onmouseleave={() => chainsDropdownVisible = false}
				onclick={() => chainsDropdownVisible = !chainsDropdownVisible}
			>
				Chains
			</button>
			{#if chainsDropdownVisible}
				<div 
					class="chains-menu"
					role="menu"
					tabindex="0"
					onmouseenter={() => chainsDropdownVisible = true}
					onmouseleave={() => chainsDropdownVisible = false}
				>
					{#each Object.entries(chainNames) as [chainId, chainName]}
						<a href="/{chainId}" class="chain-link">
							{chainName}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</nav>


<style>
	.logo {
		display: inline-flex;
		gap: 0.25em;
		align-items: center;

		text-transform: uppercase;
		font-weight: 900;
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		text-decoration: none;
		transition: color 0.3s ease;

		small {
			font-size: 0.5em;
			font-weight: 400;
			opacity: 0.5;
			background-color: light-dark(rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.7));
			color: light-dark(#fff, #000);
			padding: 0.25em 0.5em;
			border-radius: 0.25em;
		}
	}

	.breadcrumb-nav {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.5rem;
		border-bottom: 1px solid;
		font-size: 0.875rem;
		position: sticky;
		top: 0;
		background: white;
		z-index: 100;
	}

	.breadcrumb-segments {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.segment-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		text-decoration: underline;
	}

	.segment-button:hover {
		opacity: 0.7;
	}

	.segment-select {
		padding: 0.25rem;
		border: 1px solid;
		font-size: 0.875rem;
		min-width: 120px;
		max-width: 200px;
	}

	.segment-select.invalid {
		border-style: dashed;
	}

	.separator {
		margin: 0 0.25rem;
	}

	.autocomplete-container {
		position: relative;
		width: 300px;
	}

	.autocomplete-input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid;
		font-size: 0.875rem;
	}

	.autocomplete-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 1px solid;
		border-top: none;
		max-height: 200px;
		overflow-y: auto;
		z-index: 50;
	}

	.autocomplete-item {
		display: block;
		width: 100%;
		padding: 0.5rem;
		text-align: left;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.autocomplete-item:hover,
	.autocomplete-item.selected {
		background: rgba(0, 0, 0, 0.05);
	}

	.static-links {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin-left: auto;
	}

	.nav-link {
		text-decoration: none;
		color: inherit;
	}

	.chains-dropdown {
		position: relative;
	}

	.chains-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		font-size: 0.875rem;
		color: inherit;
	}

	.chains-button:hover {
		opacity: 0.7;
	}

	.chains-menu {
		position: absolute;
		top: 100%;
		right: 0;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		min-width: 150px;
		overflow: hidden;
		z-index: 50;
	}

	.chain-link {
		display: block;
		width: 100%;
		padding: 0.5rem;
		text-align: left;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 0.875rem;
		text-decoration: none;
		color: inherit;
		white-space: nowrap;
	}

	.chain-link:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	@media (prefers-color-scheme: dark) {
		.breadcrumb-nav {
			background: #222;
		}
		
		.autocomplete-dropdown, .chains-menu {
			background: #222;
			border-color: #444;
		}
		
		.autocomplete-item:hover,
		.autocomplete-item.selected,
		.chain-link:hover {
			background: rgba(255, 255, 255, 0.1);
		}
	}
</style> 