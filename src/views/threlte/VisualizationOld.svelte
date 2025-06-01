<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import { OrbitControls, Grid, Text, interactivity } from '@threlte/extras'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import * as THREE from 'three'
	import { goto } from '$app/navigation'
	
	// Types
	interface TimelineEntity {
		id: string
		type: 'block' | 'transaction' | 'contract' | 'l2proof' | 'validator'
		timestamp: number
		blockNumber?: number
		hash?: string
		label: string
		color: string
		url: string
		chainId: number
		metadata?: any
	}
	
	// Props
	let { 
		chainId = 1,
		compact = false
	}: { 
		chainId?: number
		compact?: boolean
	} = $props()
	
	// State
	let entities = $state<TimelineEntity[]>([])
	let currentTime = $state(Date.now() / 1000)
	let timeWindow = $state(compact ? 60 : 300) // Smaller window for compact mode
	let autoScroll = $state(true)
	let selectedEntity = $state<TimelineEntity | null>(null)
	
	// Camera position
	const cameraPosition = tweened(
		compact ? [0, 10, 15] : [0, 20, 30], 
		{
			duration: 1000,
			easing: cubicOut
		}
	)
	
	// Mock data generator for demonstration
	function generateMockData() {
		const now = Date.now() / 1000
		const newEntities: TimelineEntity[] = []
		const entityCount = compact ? 5 : 10
		
		// Generate mock blocks
		for (let i = 0; i < entityCount; i++) {
			const timestamp = now - i * 12 // 12 second blocks
			const blockNumber = 19000000 - i
			
			newEntities.push({
				id: `block-${blockNumber}`,
				type: 'block',
				timestamp,
				blockNumber,
				hash: `0x${Math.random().toString(16).slice(2, 10)}`,
				label: compact ? `${blockNumber}` : `Block ${blockNumber}`,
				color: '#4CAF50',
				url: `/block/${blockNumber}`,
				chainId,
				metadata: {
					transactionCount: Math.floor(Math.random() * 200),
					gasUsed: Math.floor(Math.random() * 15000000)
				}
			})
			
			// Add some transactions
			if (!compact && Math.random() > 0.5) {
				newEntities.push({
					id: `tx-${blockNumber}-1`,
					type: 'transaction',
					timestamp: timestamp + Math.random() * 2,
					blockNumber,
					hash: `0x${Math.random().toString(16).slice(2, 10)}`,
					label: 'Large Transfer',
					color: '#2196F3',
					url: `/transaction/0x...`,
					chainId,
					metadata: {
						value: (Math.random() * 100 * 1e18).toString()
					}
				})
			}
			
			// Add some contract creations
			if (!compact && Math.random() > 0.8) {
				newEntities.push({
					id: `contract-${blockNumber}`,
					type: 'contract',
					timestamp: timestamp + Math.random() * 2,
					blockNumber,
					label: 'New Contract',
					color: '#FF9800',
					url: `/contract/0x...`,
					chainId,
					metadata: {}
				})
			}
		}
		
		entities = newEntities
	}
	
	// Animation loop
	useTask(() => {
		if (autoScroll) {
			currentTime = Date.now() / 1000
		}
	})
	
	// Lifecycle
	$effect(() => {
		generateMockData()
		const interval = setInterval(generateMockData, compact ? 10000 : 5000)
		
		return () => {
			clearInterval(interval)
		}
	})
	
	// Interaction setup
	if (!compact) {
		interactivity()
	}
	
	// Helper functions
	function getEntityPosition(entity: TimelineEntity): [number, number, number] {
		const timeOffset = currentTime - entity.timestamp
		const x = -timeOffset * (compact ? 0.2 : 0.1) // Move along X axis based on time
		const y = getEntityTypeY(entity.type)
		const z = compact ? 0 : (entity.blockNumber ?? 0) % 10 - 5 // No Z spread in compact mode
		
		return [x, y, z]
	}
	
	function getEntityTypeY(type: TimelineEntity['type']): number {
		if (compact) {
			// Only show blocks in compact mode
			return type === 'block' ? 0 : -10
		}
		switch (type) {
			case 'block': return 0
			case 'transaction': return 3
			case 'contract': return 6
			case 'l2proof': return 9
			case 'validator': return 12
			default: return 0
		}
	}
	
	function getEntitySize(entity: TimelineEntity): number {
		if (compact) return 0.4
		
		if (entity.type === 'block') {
			return 1 + (entity.metadata?.transactionCount ?? 0) * 0.01
		}
		if (entity.type === 'transaction') {
			const ethValue = Number(entity.metadata?.value ?? 0) / 1e18
			return 0.5 + Math.min(ethValue * 0.1, 2)
		}
		return 0.8
	}
	
	function handleEntityClick(entity: TimelineEntity) {
		if (compact) return // Disable clicks in compact mode
		selectedEntity = entity
		goto(entity.url)
	}
	
	function formatTimestamp(timestamp: number): string {
		const date = new Date(timestamp * 1000)
		return date.toLocaleTimeString()
	}
</script>


<T.PerspectiveCamera
	makeDefault
	position={[...$cameraPosition] as [number, number, number]}
	fov={compact ? 40 : 60}
>
	{#if !compact}
		<OrbitControls
			enableDamping
			dampingFactor={0.1}
			minDistance={10}
			maxDistance={100}
			minPolarAngle={Math.PI * 0.1}
			maxPolarAngle={Math.PI * 0.4}
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
	<Text
		text="Blocks"
		fontSize={0.8}
		position={[5, 0, -8]}
		color="#4CAF50"
	/>
	<Text
		text="Transactions"
		fontSize={0.8}
		position={[5, 3, -8]}
		color="#2196F3"
	/>
	<Text
		text="Contracts"
		fontSize={0.8}
		position={[5, 6, -8]}
		color="#FF9800"
	/>
{/if}

<!-- Entities -->
{#each entities as entity}
	{@const [x, y, z] = getEntityPosition(entity)}
	{@const size = getEntitySize(entity)}
	{@const visible = compact ? entity.type === 'block' : true}
	
	{#if visible}
		<T.Group position={[x, y, z]}>
			<T.Mesh
				on:click={() => handleEntityClick(entity)}
				on:pointerenter={(e) => {
					if (!compact) {
						e.object.scale.setScalar(1.2)
						document.body.style.cursor = 'pointer'
					}
				}}
				on:pointerleave={(e) => {
					if (!compact) {
						e.object.scale.setScalar(1)
						document.body.style.cursor = 'default'
					}
				}}
			>
				{#if entity.type === 'block'}
					<T.BoxGeometry args={[size, size, size]} />
				{:else if entity.type === 'transaction'}
					<T.SphereGeometry args={[size, 16, 16]} />
				{:else if entity.type === 'contract'}
					<T.CylinderGeometry args={[size, size, size * 2, 8]} />
				{:else}
					<T.TetrahedronGeometry args={[size]} />
				{/if}
				
				<T.MeshStandardMaterial
					color={entity.color}
					emissive={entity.color}
					emissiveIntensity={compact ? 0.1 : 0.2}
					metalness={0.5}
					roughness={0.5}
					opacity={compact ? 0.6 : 1}
					transparent={compact}
				/>
			</T.Mesh>
			
			<!-- Label -->
			{#if !compact || entity.type === 'block'}
				<Text
					text={entity.label}
					fontSize={compact ? 0.2 : 0.3}
					position={[0, size + (compact ? 0.3 : 0.5), 0]}
					color={entity.color}
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
		</T.Group>
	{/if}
{/each}

<!-- Connection lines between related entities -->
{#if !compact}
	{#each entities as entity, i}
		{#each entities.slice(i + 1) as otherEntity}
			{#if entity.blockNumber === otherEntity.blockNumber && entity.type !== otherEntity.type}
				{@const [x1, y1, z1] = getEntityPosition(entity)}
				{@const [x2, y2, z2] = getEntityPosition(otherEntity)}
				{@const points = [
					new THREE.Vector3(x1, y1, z1),
					new THREE.Vector3(x2, y2, z2)
				]}
				{@const geometry = new THREE.BufferGeometry().setFromPoints(points)}
				
				<T.Line geometry={geometry}>
					<T.LineBasicMaterial color="#444" opacity={0.3} transparent />
				</T.Line>
			{/if}
		{/each}
	{/each}
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style> 