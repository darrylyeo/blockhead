<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls, Grid, Text, interactivity } from '@threlte/extras'
	import { Tween } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	// @ts-ignore - three.js types issue
	import * as THREE from 'three'
	import { goto } from '$app/navigation'
	import { query } from '$/lib/graphql.svelte'
	import { EntityType, type Entity } from '$/entities'
	
	
	// Enhanced mock data with all entity types
	const mockEntities = [
		// Blocks
		{
			id: '1',
			type: 'block',
			timestamp: Date.now() / 1000 - 10,
			blockNumber: 18500000,
			color: '#4CAF50',
			label: 'Block 18500000',
			featured: true,
			transactionCount: 150
		},
		{
			id: '2',
			type: 'block',
			timestamp: Date.now() / 1000 - 25,
			blockNumber: 18499999,
			color: '#4CAF50',
			label: 'Block 18499999',
			featured: false,
			transactionCount: 89
		},
		{
			id: '3',
			type: 'block',
			timestamp: Date.now() / 1000 - 40,
			blockNumber: 18499998,
			color: '#4CAF50',
			label: 'Block 18499998',
			featured: false,
			transactionCount: 203
		},
		
		// Transactions
		{
			id: '4',
			type: 'transaction',
			timestamp: Date.now() / 1000 - 15,
			blockNumber: 18500000,
			color: '#2196F3',
			label: 'Large Transfer',
			featured: true,
			value: '1.5 ETH',
			status: 'success'
		},
		{
			id: '5',
			type: 'transaction',
			timestamp: Date.now() / 1000 - 32,
			blockNumber: 18499999,
			color: '#2196F3',
			label: 'Failed TX',
			featured: false,
			value: '0.5 ETH',
			status: 'failed'
		},
		
		// Transfers
		{
			id: '6',
			type: 'transfer',
			timestamp: Date.now() / 1000 - 18,
			blockNumber: 18500000,
			color: '#FF44AA',
			label: 'USDC Transfer',
			featured: false,
			value: '1000 USDC'
		},
		
		// Contracts
		{
			id: '7',
			type: 'contract',
			timestamp: Date.now() / 1000 - 35,
			blockNumber: 18499999,
			color: '#FF9800',
			label: 'New Contract',
			featured: false,
			name: 'Uniswap V3 Router'
		},
		
		// Tokens
		{
			id: '8',
			type: 'token',
			timestamp: Date.now() / 1000 - 28,
			blockNumber: 18499999,
			color: '#9C27B0',
			label: 'USDC',
			featured: true,
			symbol: 'USDC',
			holders: 15000
		},
		
		// Actors
		{
			id: '9',
			type: 'actor',
			timestamp: Date.now() / 1000 - 22,
			blockNumber: 18500000,
			color: '#00BCD4',
			label: 'Whale Address',
			featured: false,
			isContract: false
		},
		
		// Events
		{
			id: '10',
			type: 'event',
			timestamp: Date.now() / 1000 - 38,
			blockNumber: 18499998,
			color: '#FFEB3B',
			label: 'Swap Event',
			featured: true,
			eventName: 'Swap'
		}
	]
	
	// Generate preloaded historical data
	function generateHistoricalData() {
		const entities = []
		let idCounter = 1
		const baseTime = Date.now() / 1000
		const baseBlockNumber = 18499970
		
		// Generate 30 blocks going back in time
		for (let i = 0; i < 30; i++) {
			// Blocks are ~12 seconds apart (Ethereum average)
			const blockTime = baseTime - (i * 12) - Math.random() * 6
			const blockNumber = baseBlockNumber + (29 - i)
			const transactionCount = Math.floor(Math.random() * 150) + 30
			const isFeatured = Math.random() < 0.15
			
			// Create block
			const block = {
				id: String(idCounter++),
				type: 'block',
				timestamp: blockTime,
				blockNumber,
				color: '#4CAF50',
				label: `Block ${blockNumber}`,
				featured: isFeatured,
				transactionCount,
				isNew: false
			}
			entities.push(block)
			
			// Generate transactions for this block
			const numTxs = Math.floor(Math.random() * 6) + 2 // 2-8 transactions to show
			for (let j = 0; j < numTxs; j++) {
				const txTime = blockTime + Math.random() * 2
				const value = (Math.random() * 20).toFixed(3)
				const isTxFeatured = Math.random() < 0.12
				const isSuccess = Math.random() < 0.96
				
				const transaction = {
					id: String(idCounter++),
					type: 'transaction',
					timestamp: txTime,
					blockNumber,
					color: '#2196F3',
					label: isTxFeatured ? `${value} ETH` : 'TX',
					featured: isTxFeatured,
					value: `${value} ETH`,
					status: isSuccess ? 'success' : 'failed',
					isNew: false
				}
				entities.push(transaction)
				
				// Generate some actors (addresses)
				if (Math.random() < 0.3) {
					const isContract = Math.random() < 0.2
					const actorTypes = isContract ? 
						['DEX Contract', 'Lending Pool', 'Token Contract', 'Multisig'] :
						['Whale', 'Bot', 'Trader', 'EOA']
					const actorType = actorTypes[Math.floor(Math.random() * actorTypes.length)]
					
					const actor = {
						id: String(idCounter++),
						type: 'actor',
						timestamp: txTime + 0.1,
						blockNumber,
						color: isContract ? '#FF6B35' : '#00BCD4',
						label: actorType,
						featured: actorType.includes('Whale') || actorType.includes('DEX'),
						isContract,
						isNew: false
					}
					entities.push(actor)
				}
				
				// Generate transfers
				if (Math.random() < 0.4) {
					const tokens = [
						{ symbol: 'USDC', color: '#2775CA' },
						{ symbol: 'USDT', color: '#26A17B' },
						{ symbol: 'DAI', color: '#F5AC37' },
						{ symbol: 'WETH', color: '#627EEA' },
						{ symbol: 'LINK', color: '#375BD2' },
						{ symbol: 'UNI', color: '#FF007A' },
						{ symbol: 'AAVE', color: '#B6509E' }
					]
					const tokenData = tokens[Math.floor(Math.random() * tokens.length)]
					const amount = Math.floor(Math.random() * 10000) + 100
					const isFeatured = amount > 5000
					
					const transfer = {
						id: String(idCounter++),
						type: 'transfer',
						timestamp: txTime + 0.05,
						blockNumber,
						color: tokenData.color,
						label: `${tokenData.symbol}`,
						featured: isFeatured,
						value: `${amount} ${tokenData.symbol}`,
						isNew: false
					}
					entities.push(transfer)
				}
				
				// Generate events
				if (Math.random() < 0.25) {
					const events = ['Swap', 'Mint', 'Burn', 'Transfer', 'Approval', 'Deposit', 'Withdraw']
					const eventName = events[Math.floor(Math.random() * events.length)]
					
					const event = {
						id: String(idCounter++),
						type: 'event',
						timestamp: txTime + 0.02,
						blockNumber,
						color: '#FFEB3B',
						label: eventName,
						featured: Math.random() < 0.1,
						eventName,
						isNew: false
					}
					entities.push(event)
				}
			}
			
			// Occasionally add tokens and contracts at block level
			if (Math.random() < 0.15) {
				const tokens = [
					{ name: 'USDC', symbol: 'USDC', color: '#2775CA' },
					{ name: 'Tether', symbol: 'USDT', color: '#26A17B' },
					{ name: 'Dai', symbol: 'DAI', color: '#F5AC37' },
					{ name: 'Wrapped Ether', symbol: 'WETH', color: '#627EEA' },
					{ name: 'Chainlink', symbol: 'LINK', color: '#375BD2' }
				]
				const tokenData = tokens[Math.floor(Math.random() * tokens.length)]
				
				const token = {
					id: String(idCounter++),
					type: 'token',
					timestamp: blockTime + 1,
					blockNumber,
					color: tokenData.color,
					label: tokenData.symbol,
					featured: Math.random() < 0.2,
					symbol: tokenData.symbol,
					name: tokenData.name,
					isNew: false
				}
				entities.push(token)
			}
			
			if (Math.random() < 0.08) {
				const contracts = ['Uniswap V3', 'Compound', 'Aave', 'MakerDAO', 'Curve Finance']
				const contractName = contracts[Math.floor(Math.random() * contracts.length)]
				
				const contract = {
					id: String(idCounter++),
					type: 'contract',
					timestamp: blockTime + 0.5,
					blockNumber,
					color: '#FF9800',
					label: contractName,
					featured: false,
					name: contractName,
					isNew: false
				}
				entities.push(contract)
			}
		}
		
		return { entities, nextId: idCounter, nextBlockNumber: baseBlockNumber + 30 }
	}
	
	// Initialize with historical data
	const historicalData = generateHistoricalData()
	const preloadedEntities = historicalData.entities
	
	// Props
	let {
		chainId = 1,
		compact = false,
		entities = preloadedEntities
	}: {
		chainId?: number
		compact?: boolean
		entities?: any[]
	} = $props()
	
	// State
	let currentTime = $state(Date.now() / 1000)
	let timeWindow = $state(compact ? 60 : 300)
	let autoScroll = $state(true)
	let selectedEntity = $state<any | null>(null)
	let liveEntities = $state([...entities])
	let currentBlockNumber = $state(historicalData.nextBlockNumber)
	let entityIdCounter = $state(historicalData.nextId)
	let lastCleanupTime = $state(0)
	
	// Block generation timer
	let blockGenerationInterval: NodeJS.Timeout | null = null
	
	// Start block generation
	$effect(() => {
		if (typeof window !== 'undefined') {
			blockGenerationInterval = setInterval(() => {
				generateNewBlock()
			}, 5000) // Every 5 seconds instead of 3
			
			return () => {
				if (blockGenerationInterval) {
					clearInterval(blockGenerationInterval)
				}
			}
		}
	})
	
	// Generate a new block with transactions
	function generateNewBlock() {
		const now = Date.now() / 1000
		const transactionCount = Math.floor(Math.random() * 100) + 20 // 20-120 transactions (reduced)
		const isFeatured = Math.random() < 0.2 // 20% chance of being featured
		
		// Create the block
		const newBlock = {
			id: String(entityIdCounter++),
			type: 'block',
			timestamp: now,
			blockNumber: currentBlockNumber,
			color: '#4CAF50',
			label: `Block ${currentBlockNumber}`,
			featured: isFeatured,
			transactionCount,
			isNew: true // Mark as new for visual effects
		}
		
		// Create fewer transactions for performance
		const newTransactions = []
		const numTxsToShow = Math.min(transactionCount, Math.floor(Math.random() * 4) + 1) // Show 1-5 transactions only
		
		for (let i = 0; i < numTxsToShow; i++) {
			const txFeatured = Math.random() < 0.15 // 15% chance
			const isSuccess = Math.random() < 0.95 // 95% success rate
			const value = (Math.random() * 10).toFixed(2)
			const txOffset = Math.random() * 1 // Spread transactions within 1 second of block
			
			const transaction = {
				id: String(entityIdCounter++),
				type: 'transaction',
				timestamp: now + txOffset,
				blockNumber: currentBlockNumber,
				color: '#2196F3',
				label: txFeatured ? `${value} ETH` : `TX`,
				featured: txFeatured,
				value: `${value} ETH`,
				status: isSuccess ? 'success' : 'failed',
				isNew: true
			}
			
			newTransactions.push(transaction)
			
			// Rarely add transfers/events for performance
			if (Math.random() < 0.2 && i === 0) { // Only 20% chance and only for first transaction
				const transfer = {
					id: String(entityIdCounter++),
					type: 'transfer',
					timestamp: now + txOffset + 0.1,
					blockNumber: currentBlockNumber,
					color: '#FF44AA',
					label: 'Transfer',
					featured: false,
					value: `${(Math.random() * 1000).toFixed(0)} USDC`,
					isNew: true
				}
				newTransactions.push(transfer)
			}
		}
		
		// Add new entities to the live array
		liveEntities = [newBlock, ...newTransactions, ...liveEntities]
		
		// Aggressive cleanup for performance - keep only last 50 entities
		if (liveEntities.length > 50) {
			liveEntities = liveEntities.slice(0, 50)
		}
		
		// Remove "new" flag after 3 seconds
		setTimeout(() => {
			// Only update if entities still exist and have the new flag
			const entitiesToUpdate = [newBlock.id, ...newTransactions.map(tx => tx.id)]
			const hasNewEntities = liveEntities.some(entity => 
				entitiesToUpdate.includes(entity.id) && entity.isNew
			)
			
			if (hasNewEntities) {
				liveEntities = liveEntities.map(entity => 
					entitiesToUpdate.includes(entity.id) 
						? { ...entity, isNew: false }
						: entity
				)
			}
		}, 3000)
		
		// Increment block number
		currentBlockNumber++
		
		console.log(`Generated block ${newBlock.blockNumber} with ${newTransactions.length} entities (total: ${liveEntities.length})`)
	}
	
	// Animation loop
	useTask(() => {
		if (autoScroll) {
			currentTime = Date.now() / 1000
			
			// Clean up old entities only every 2 seconds to avoid excessive updates
			if (currentTime - lastCleanupTime > 2) {
				const cutoffTime = currentTime - (compact ? 30 : 120)
				const filteredEntities = liveEntities.filter(entity => entity.timestamp > cutoffTime)
				if (filteredEntities.length !== liveEntities.length) {
					liveEntities = filteredEntities
					lastCleanupTime = currentTime
				}
			}
		}
	})
	
	// Interaction setup
	interactivity()
	
	// Debug logging
	$effect(() => {
		if (!compact) {
			console.log('Non-compact mode - OrbitControls should be active')
		}
	})
	
	// Helper functions
	function getEntityPosition(entity: any): [number, number, number] {
		const timeOffset = currentTime - entity.timestamp
		const x = -timeOffset * (compact ? 0.2 : 0.1)
		const y = getEntityTypeY(entity.type)
		const z = compact ? 0 : (entity.blockNumber % 10) - 5
		
		return [x, y, z]
	}
	
	function getEntityTypeY(type: string): number {
		if (compact) {
			return type === 'block' ? 0 : -10
		}
		switch (type) {
			case 'block': return 0
			case 'transaction': return 2
			case 'transfer': return 3
			case 'actor': return 4
			case 'contract': return 5
			case 'token': return 6
			case 'event': return 7
			default: return 8
		}
	}
	
	function getEntitySize(entity: any): number {
		if (compact) return entity.featured ? 0.6 : 0.4
		
		let baseSize = 0.8
		if (entity.type === 'block' && entity.transactionCount) {
			baseSize = 1 + entity.transactionCount * 0.01
		}
		
		return entity.featured ? baseSize * 1.5 : baseSize
	}
	
	function getEntityColor(entity: any): string {
		if (entity.featured) {
			// Brighter colors for featured entities
			switch (entity.type) {
				case 'block': return '#66FF66'
				case 'transaction': return '#44AAFF'
				case 'transfer': return '#FF66BB'
				case 'contract': return '#FFCC44'
				case 'token': return '#BB44FF'
				case 'actor': return '#44FFBB'
				case 'event': return '#FFBB44'
				default: return entity.color
			}
		}
		return entity.color
	}
	
	function formatTimestamp(timestamp: number): string {
		const date = new Date(timestamp * 1000)
		return date.toLocaleTimeString()
	}
	
	function handleEntityClick(entity: any) {
		if (compact) return
		selectedEntity = entity
		console.log('Clicked entity:', entity)
	}
</script>


<T.PerspectiveCamera
	makeDefault
	position={compact ? [0, 4, 8] : [0, 12, 20]}
	fov={compact ? 50 : 65}
>
	{#if !compact}
		<OrbitControls
			enableDamping
			dampingFactor={0.1}
			enableZoom
			enablePan={false}
			enableRotate
			autoRotate={false}
			minDistance={8}
			maxDistance={40}
			target={[0, 3, 0]}
		/>
	{/if}
</T.PerspectiveCamera>

<T.AmbientLight intensity={compact ? 0.4 : 0.6} />
<T.DirectionalLight 
	position={[5, 8, 3]} 
	intensity={compact ? 0.3 : 0.5} 
/>

<!-- Simplified grid -->
{#if !compact}
	<Grid
		sectionColor="#555"
		cellColor="#333"
		sectionSize={5}
		cellSize={1}
		gridSize={[30, 30]}
		position.y={-0.2}
	/>
{/if}

<!-- Time axis labels -->
{#if !compact}
	{#each Array(5) as _, i}
		{@const timeOffset = i * 30}
		{@const time = currentTime - timeOffset}
		<Text
			text={new Date(time * 1000).toLocaleTimeString()}
			fontSize={0.4}
			position={[-timeOffset * 0.1, -1, -8]}
			color="#666"
		/>
	{/each}
{/if}

<!-- Entity type labels - simplified -->
{#if !compact}
	<Text text="Blocks" fontSize={0.6} position={[3, 0, -6]} color="#4CAF50" />
	<Text text="Transactions" fontSize={0.6} position={[3, 2, -6]} color="#2196F3" />
	<Text text="Transfers" fontSize={0.6} position={[3, 3, -6]} color="#FF44AA" />
	<Text text="Actors" fontSize={0.6} position={[3, 4, -6]} color="#00BCD4" />
	<Text text="Contracts" fontSize={0.6} position={[3, 5, -6]} color="#FF9800" />
	<Text text="Tokens" fontSize={0.6} position={[3, 6, -6]} color="#9C27B0" />
	<Text text="Events" fontSize={0.6} position={[3, 7, -6]} color="#FFEB3B" />
	
	<!-- Live generation status -->
	<Text 
		text={`Block ${currentBlockNumber - 1} | ${liveEntities.length} entities`}
		fontSize={0.5} 
		position={[3, 9, -6]} 
		color="#FFF" 
	/>
{/if}

<!-- Entities -->
{#each liveEntities as entity}
	{@const [x, y, z] = getEntityPosition(entity)}
	{@const size = getEntitySize(entity)}
	{@const color = getEntityColor(entity)}
	{@const visible = compact ? entity.type === 'block' : true}
	
	{#if visible}
		<T.Group position={[x, y, z]}>
			<!-- Simple highlight for featured entities only -->
			{#if entity.featured && !compact}
				<T.Mesh>
					<T.RingGeometry args={[size * 1.1, size * 1.3, 8]} />
					<T.MeshBasicMaterial
						color={color}
						transparent
						opacity={0.4}
						side={THREE.DoubleSide}
					/>
				</T.Mesh>
			{/if}
			
			<T.Mesh
				on:click={(e) => {
					e.stopPropagation()
					handleEntityClick(entity)
				}}
				on:pointerenter={(e) => {
					if (!compact) {
						e.stopPropagation()
						e.object.scale.setScalar(1.1)
						document.body.style.cursor = 'pointer'
					}
				}}
				on:pointerleave={(e) => {
					if (!compact) {
						e.stopPropagation()
						e.object.scale.setScalar(1)
						document.body.style.cursor = 'default'
					}
				}}
			>
				{#if entity.type === 'block'}
					<T.BoxGeometry args={[size, size, size]} />
				{:else if entity.type === 'transaction'}
					<T.SphereGeometry args={[size * 0.7, 8, 8]} />
				{:else if entity.type === 'transfer'}
					<T.SphereGeometry args={[size * 0.5, 6, 6]} />
				{:else}
					<T.SphereGeometry args={[size * 0.6, 6, 6]} />
				{/if}
				
				<T.MeshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={compact ? 0.1 : (entity.isNew ? 0.4 : 0.15)}
					metalness={0.3}
					roughness={0.7}
				/>
			</T.Mesh>
			
			<!-- Status indicator for failed transactions -->
			{#if entity.status === 'failed' && !compact}
				<T.Mesh position={[size + 0.2, 0, 0]}>
					<T.SphereGeometry args={[0.08, 6, 6]} />
					<T.MeshBasicMaterial color="#FF0000" />
				</T.Mesh>
			{/if}
			
			<!-- Minimal labels - only for featured/new entities -->
			{#if (!compact && (entity.featured || entity.isNew)) || (compact && entity.type === 'block')}
				<Text
					text={entity.label}
					fontSize={compact ? 0.15 : 0.25}
					position={[0, size + 0.3, 0]}
					color={entity.featured ? '#FFF' : color}
					anchorX="center"
					anchorY="bottom"
				/>
			{/if}
		</T.Group>
	{/if}
{/each} 