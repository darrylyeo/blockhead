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
	
	// Props
	let {
		chainId = 1,
		compact = false,
		entities = mockEntities
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
	let currentBlockNumber = $state(18500001)
	let entityIdCounter = $state(11)
	
	// Block generation timer
	let blockGenerationInterval: NodeJS.Timeout | null = null
	
	// Start block generation
	$effect(() => {
		if (typeof window !== 'undefined') {
			blockGenerationInterval = setInterval(() => {
				generateNewBlock()
			}, 3000) // Every 3 seconds
			
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
		const transactionCount = Math.floor(Math.random() * 200) + 50 // 50-250 transactions
		const isFeatured = Math.random() < 0.3 // 30% chance of being featured
		
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
		
		// Create transactions for this block
		const newTransactions = []
		const numTxsToShow = Math.min(transactionCount, Math.floor(Math.random() * 8) + 2) // Show 2-10 transactions
		
		for (let i = 0; i < numTxsToShow; i++) {
			const txFeatured = Math.random() < 0.1 // 10% chance
			const isSuccess = Math.random() < 0.95 // 95% success rate
			const value = (Math.random() * 10).toFixed(3)
			const txOffset = Math.random() * 2 // Spread transactions within 2 seconds of block
			
			const transaction = {
				id: String(entityIdCounter++),
				type: 'transaction',
				timestamp: now + txOffset,
				blockNumber: currentBlockNumber,
				color: '#2196F3',
				label: txFeatured ? `Large TX (${value} ETH)` : `TX ${i + 1}`,
				featured: txFeatured,
				value: `${value} ETH`,
				status: isSuccess ? 'success' : 'failed',
				isNew: true
			}
			
			newTransactions.push(transaction)
			
			// Sometimes add a transfer or event for this transaction
			if (Math.random() < 0.4) { // 40% chance
				if (Math.random() < 0.7) { // 70% transfer, 30% event
					const transfer = {
						id: String(entityIdCounter++),
						type: 'transfer',
						timestamp: now + txOffset + 0.1,
						blockNumber: currentBlockNumber,
						color: '#FF44AA',
						label: `${Math.random() < 0.5 ? 'USDC' : 'USDT'} Transfer`,
						featured: false,
						value: `${(Math.random() * 10000).toFixed(0)} ${Math.random() < 0.5 ? 'USDC' : 'USDT'}`,
						isNew: true
					}
					newTransactions.push(transfer)
				} else {
					const event = {
						id: String(entityIdCounter++),
						type: 'event',
						timestamp: now + txOffset + 0.1,
						blockNumber: currentBlockNumber,
						color: '#FFEB3B',
						label: ['Swap', 'Mint', 'Burn', 'Approval'][Math.floor(Math.random() * 4)],
						featured: Math.random() < 0.2,
						eventName: 'DeFi Event',
						isNew: true
					}
					newTransactions.push(event)
				}
			}
		}
		
		// Add new entities to the live array
		liveEntities = [newBlock, ...newTransactions, ...liveEntities]
		
		// Clean up old entities (keep last 200 entities for performance)
		if (liveEntities.length > 200) {
			liveEntities = liveEntities.slice(0, 200)
		}
		
		// Remove "new" flag after 5 seconds
		setTimeout(() => {
			liveEntities = liveEntities.map(entity => ({
				...entity,
				isNew: entity.id === newBlock.id || newTransactions.some(tx => tx.id === entity.id) ? false : entity.isNew
			}))
		}, 5000)
		
		// Increment block number
		currentBlockNumber++
		
		console.log(`Generated block ${newBlock.blockNumber} with ${newTransactions.length} entities`)
	}
	
	// Clean up old entities based on time window
	$effect(() => {
		const cutoffTime = currentTime - timeWindow
		liveEntities = liveEntities.filter(entity => entity.timestamp > cutoffTime - 60) // Keep some buffer
	})
	
	// Animation loop
	useTask(() => {
		if (autoScroll) {
			currentTime = Date.now() / 1000
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
			case 'transaction': return 3
			case 'transfer': return 4
			case 'contract': return 6
			case 'token': return 7
			case 'actor': return 9
			case 'event': return 10
			default: return 15
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
	position={compact ? [0, 5, 10] : [0, 15, 25]}
	fov={compact ? 40 : 60}
>
	{#if !compact}
		<OrbitControls
			enableDamping
			dampingFactor={0.05}
			enableZoom
			enablePan
			enableRotate
			autoRotate={false}
			minDistance={5}
			maxDistance={100}
			minPolarAngle={0}
			maxPolarAngle={Math.PI}
			target={[0, 5, 0]}
		/>
	{/if}
</T.PerspectiveCamera>

<T.AmbientLight intensity={compact ? 0.3 : 0.5} />
<T.DirectionalLight 
	position={[10, 10, 5]} 
	intensity={compact ? 0.5 : 1} 
/>

<!-- Grid -->
{#if !compact}
	<Grid
		sectionColor="#888"
		cellColor="#666"
		sectionSize={10}
		cellSize={1}
		gridSize={[100, 100]}
		position.y={-0.5}
	/>
{/if}

<!-- Time axis labels -->
{#if !compact}
	{#each Array(10) as _, i}
		{@const timeOffset = i * 30}
		{@const time = currentTime - timeOffset}
		<Text
			text={new Date(time * 1000).toLocaleTimeString()}
			fontSize={0.5}
			position={[-timeOffset * 0.1, -1, -8]}
			color="#888"
		/>
	{/each}
{/if}

<!-- Entity type labels -->
{#if !compact}
	<Text text="Blocks" fontSize={0.8} position={[5, 0, -8]} color="#4CAF50" />
	<Text text="Transactions" fontSize={0.8} position={[5, 3, -8]} color="#2196F3" />
	<Text text="Transfers" fontSize={0.8} position={[5, 4, -8]} color="#FF44AA" />
	<Text text="Contracts" fontSize={0.8} position={[5, 6, -8]} color="#FF9800" />
	<Text text="Tokens" fontSize={0.8} position={[5, 7, -8]} color="#9C27B0" />
	<Text text="Actors" fontSize={0.8} position={[5, 9, -8]} color="#00BCD4" />
	<Text text="Events" fontSize={0.8} position={[5, 10, -8]} color="#FFEB3B" />
	
	<!-- Live generation status -->
	<Text 
		text={`Live: Block ${currentBlockNumber - 1} | ${liveEntities.length} entities`}
		fontSize={0.6} 
		position={[5, 12, -8]} 
		color="#FFF" 
	/>
	<Text 
		text="🟢 Generating blocks every 3s"
		fontSize={0.4} 
		position={[5, 11.3, -8]} 
		color="#4CAF50" 
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
			<!-- Highlight ring for featured entities -->
			{#if entity.featured && !compact}
				<T.Mesh>
					<T.RingGeometry args={[size * 1.2, size * 1.5, 16]} />
					<T.MeshBasicMaterial
						color={color}
						transparent
						opacity={0.3}
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
						e.object.scale.setScalar(1.2)
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
					<T.ConeGeometry args={[size * 0.3, size * 2, 6]} />
				{:else if entity.type === 'transfer'}
					<T.ConeGeometry args={[size * 0.3, size * 2, 6]} />
				{:else if entity.type === 'contract'}
					<T.CylinderGeometry args={[size, size, size * 2, 8]} />
				{:else if entity.type === 'token'}
					<T.CylinderGeometry args={[size, size, size * 0.3, 6]} />
				{:else if entity.type === 'actor'}
					<T.SphereGeometry args={[size, 16, 16]} />
				{:else if entity.type === 'event'}
					<T.OctahedronGeometry args={[size]} />
				{:else}
					<T.IcosahedronGeometry args={[size]} />
				{/if}
				
				<T.MeshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={compact ? 0.1 : 0.2}
					metalness={0.5}
					roughness={0.5}
					opacity={compact ? 0.6 : (entity.featured ? 1 : 0.8)}
					transparent={compact || !entity.featured}
				/>
			</T.Mesh>
			
			<!-- Status indicator for failed transactions -->
			{#if entity.status === 'failed'}
				<T.Mesh position={[size + 0.3, 0, 0]}>
					<T.SphereGeometry args={[0.1, 8, 8]} />
					<T.MeshBasicMaterial color="#FF0000" />
				</T.Mesh>
			{/if}
			
			<!-- Label -->
			{#if !compact || entity.type === 'block'}
				<Text
					text={entity.label}
					fontSize={compact ? 0.2 : (entity.featured ? 0.4 : 0.3)}
					position={[0, size + (compact ? 0.3 : 0.5), 0]}
					color={entity.featured ? '#FFF' : color}
					anchorX="center"
					anchorY="bottom"
					opacity={compact ? 0.6 : 1}
				/>
			{/if}
			
			<!-- Timestamp -->
			{#if !compact}
				<Text
					text={formatTimestamp(entity.timestamp)}
					fontSize={0.2}
					position={[0, size + 0.2, 0]}
					color="#666"
					anchorX="center"
					anchorY="bottom"
				/>
			{/if}
			
			<!-- Featured indicator -->
			{#if entity.featured && !compact}
				<Text
					text="⭐"
					fontSize={0.5}
					position={[0, size + 1, 0]}
					color="#FFD700"
					anchorX="center"
					anchorY="bottom"
				/>
			{/if}
		</T.Group>
	{/if}
{/each} 