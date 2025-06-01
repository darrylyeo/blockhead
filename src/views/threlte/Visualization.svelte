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
	
	
	interface FeaturedEntity {
		id: string
	}
	
	// Props
	let {
		chainId = 1,
		compact = false,
		entities = []
	}: {
		chainId?: number
		compact?: boolean
		entities?: any[]
	} = $props()
	
	// State
	let currentTime = $state(Date.now() / 1000)
	let timeWindow = $state(compact ? 60 : 300)
	let autoScroll = $state(true)
	let selectedEntity = $state<Entity | null>(null)
	
	// Process entities to add featured status and normalize structure
	const processedEntities = $derived(entities.map((entity: any) => {
		// Create a normalized entity structure
		const normalizedEntity = {
			...entity,
			featured: false,
			// Add common fields that might be missing
			type: getEntityTypeFromTypename(entity.__typename),
			timestamp: entity.timestamp || Date.now() / 1000,
			color: getDefaultColorForType(getEntityTypeFromTypename(entity.__typename)),
			label: getEntityLabel(entity),
			url: getEntityUrl(entity)
		}
		
		return normalizedEntity
	}))
	
	const featuredEntities = $derived(processedEntities.filter((e: Entity) => e.featured))
	
	// Camera position with automatic positioning for featured entities
	const cameraPosition = new Tween(
		compact ? [0, 10, 15] : [0, 20, 30],
		{
			duration: 1000,
			easing: cubicOut
		}
	)
	
	// Make it reactive
	const cameraPositionStore = $derived(cameraPosition)
	
	// Calculate optimal camera position to show featured entities while staying centered on current time
	$effect(() => {
		if (featuredEntities.length === 0) {
			// No featured entities - keep camera centered on current time
			cameraPosition.set(compact ? [0, 10, 15] : [0, 20, 30])
			return
		}
		
		// Calculate bounding box of featured entities
		const positions = featuredEntities.map((entity: Entity) => getEntityPosition(entity))
		
		if (positions.length === 1) {
			// Single featured entity - keep x centered on current time, adjust y and z
			const [_, y, z] = positions[0]
			const offsetY = compact ? 5 : 10
			const offsetZ = compact ? 10 : 15
			cameraPosition.set([0, y + offsetY, z + offsetZ])
		} else if (positions.length > 1) {
			// Multiple featured entities - calculate y and z bounds, keep x centered on current time
			const bounds = {
				minY: Math.min(...positions.map(p => p[1])),
				maxY: Math.max(...positions.map(p => p[1])),
				minZ: Math.min(...positions.map(p => p[2])),
				maxZ: Math.max(...positions.map(p => p[2]))
			}
			
			const centerY = (bounds.minY + bounds.maxY) / 2
			const centerZ = (bounds.minZ + bounds.maxZ) / 2
			
			// Calculate distance needed to fit all entities in view (y and z only)
			const spanY = bounds.maxY - bounds.minY
			const spanZ = bounds.maxZ - bounds.minZ
			const maxSpan = Math.max(spanY, spanZ)
			
			// Position camera at appropriate distance, centered on current time (x=0)
			const distance = Math.max(maxSpan * 2, compact ? 15 : 30)
			cameraPosition.set([0, centerY + distance * 0.5, centerZ + distance * 0.7])
		}
	})
	
	// Animation loop
	useTask(() => {
		if (autoScroll) {
			currentTime = Date.now() / 1000
		}
	})
	
	// Interaction setup
	if (!compact) {
		interactivity()
	}
	
	// Helper functions
	function getEntityPosition(entity: Entity): [number, number, number] {
		const timeOffset = currentTime - entity.timestamp
		const x = -timeOffset * (compact ? 0.2 : 0.1)
		const y = getEntityTypeY(entity.type)
		const blockNumber = ('blockNumber' in entity ? entity.blockNumber : 0) ?? 0
		const z = compact ? 0 : (Number(blockNumber) % 10) - 5
		
		return [x, y, z]
	}
	
	function getEntityTypeY(type: EntityType): number {
		if (compact) {
			return type === EntityType.Block ? 0 : -10
		}
		switch (type) {
			case EntityType.Block: return 0
			case EntityType.Transaction: return 3
			case EntityType.Transfer: return 4
			case EntityType.Contract: return 6
			case EntityType.Token: return 7
			case EntityType.Actor: return 9
			case EntityType.Event: return 10
			case EntityType.Trace: return 11
			case EntityType.Validator: return 12
			default: return 15
		}
	}
	
	function getEntitySize(entity: Entity): number {
		if (compact) return entity.featured ? 0.6 : 0.4
		
		let baseSize = 0.8
		
		if (entity.type === EntityType.Block && 'transactionCount' in entity) {
			baseSize = 1 + (entity.transactionCount ?? entity.metadata?.transactionCount ?? 0) * 0.01
		} else if (entity.type === EntityType.Transaction && 'value' in entity) {
			const ethValue = Number(entity.value ?? entity.metadata?.value ?? 0) / 1e18
			baseSize = 0.5 + Math.min(ethValue * 0.1, 2)
		} else if (entity.type === EntityType.Token && 'holders' in entity) {
			const holders = entity.holders ?? entity.metadata?.holders ?? 0
			baseSize = 0.6 + Math.min(holders * 0.0001, 1.5)
		}
		
		// Make featured entities larger
		return entity.featured ? baseSize * 1.5 : baseSize
	}
	
	function getEntityColor(entity: Entity): string {
		if (entity.featured) {
			// Brighter colors for featured entities
			switch (entity.type) {
				case EntityType.Block: return '#66FF66'
				case EntityType.Transaction: return '#44AAFF'
				case EntityType.Transfer: return '#FF44AA'
				case EntityType.Contract: return '#FFBB44'
				case EntityType.Token: return '#AA44FF'
				case EntityType.Actor: return '#44FFAA'
				case EntityType.Event: return '#FFAA44'
				case EntityType.Trace: return '#FF6644'
				case EntityType.Validator: return '#AA44FF'
				default: return entity.color
			}
		}
		return entity.color
	}
	
	function getEntityEmissiveIntensity(entity: Entity): number {
		const baseIntensity = compact ? 0.1 : 0.2
		return entity.featured ? baseIntensity * 2 : baseIntensity
	}
	
	function handleEntityClick(entity: Entity) {
		if (compact) return
		selectedEntity = entity
		goto(entity.url)
	}
	
	function formatTimestamp(timestamp: number): string {
		const date = new Date(timestamp * 1000)
		return date.toLocaleTimeString()
	}
	
	// Create arrow geometry for transactions and transfers
	function createArrowGeometry(size: number) {
		const geometry = new THREE.ConeGeometry(size * 0.3, size * 2, 6)
		return geometry
	}
	
	// Create token icon geometry (hexagon with inner circle)
	function createTokenGeometry(size: number) {
		const shape = new THREE.Shape()
		const radius = size
		
		// Create hexagon
		for (let i = 0; i < 6; i++) {
			const angle = (i / 6) * Math.PI * 2
			const x = Math.cos(angle) * radius
			const y = Math.sin(angle) * radius
			if (i === 0) {
				shape.moveTo(x, y)
			} else {
				shape.lineTo(x, y)
			}
		}
		shape.closePath()
		
		// Add inner circle hole
		const holePath = new THREE.Path()
		holePath.absarc(0, 0, radius * 0.3, 0, Math.PI * 2, false)
		shape.holes.push(holePath)
		
		const geometry = new THREE.ExtrudeGeometry(shape, {
			depth: size * 0.2,
			bevelEnabled: false
		})
		return geometry
	}
	
	// Helper functions for entity normalization
	function getEntityTypeFromTypename(typename: string): EntityType {
		if (typename?.includes('Block')) return EntityType.Block
		if (typename?.includes('Transaction')) return EntityType.Transaction
		if (typename?.includes('Transfer')) return EntityType.Transfer
		if (typename?.includes('Actor')) return EntityType.Actor
		if (typename?.includes('Token')) return EntityType.Token
		if (typename?.includes('Event')) return EntityType.Event
		if (typename?.includes('Trace')) return EntityType.Trace
		if (typename?.includes('Contract')) return EntityType.Contract
		if (typename?.includes('Validator')) return EntityType.Validator
		return EntityType.Block // default
	}
	
	function getDefaultColorForType(type: EntityType): string {
		switch (type) {
			case EntityType.Block: return '#4CAF50'
			case EntityType.Transaction: return '#2196F3'
			case EntityType.Transfer: return '#FF44AA'
			case EntityType.Contract: return '#FF9800'
			case EntityType.Token: return '#9C27B0'
			case EntityType.Actor: return '#00BCD4'
			case EntityType.Event: return '#FFEB3B'
			case EntityType.Trace: return '#FF5722'
			case EntityType.Validator: return '#795548'
			default: return '#607D8B'
		}
	}
	
	function getEntityLabel(entity: any): string {
		if (entity.blockNumber) return `Block ${entity.blockNumber}`
		if (entity.id) return entity.id.slice(0, 8) + '...'
		if (entity.address) return entity.address.slice(0, 8) + '...'
		if (entity.symbol) return entity.symbol
		if (entity.name) return entity.name
		return entity.__typename || 'Entity'
	}
	
	function getEntityUrl(entity: any): string {
		const chainId = entity.chainId || 1
		if (entity.__typename?.includes('Block')) return `/${chainId}/block/${entity.blockNumber || entity.blockHash}`
		if (entity.__typename?.includes('Transaction')) return `/${chainId}/transaction/${entity.id}`
		if (entity.__typename?.includes('Transfer')) return `/${chainId}/transfer/${entity.id}`
		if (entity.__typename?.includes('Actor')) return `/${chainId}/address/${entity.address}`
		if (entity.__typename?.includes('Token')) return `/${chainId}/token/${entity.address}`
		if (entity.__typename?.includes('Event')) return `/${chainId}/event/${entity.id}`
		if (entity.__typename?.includes('Trace')) return `/${chainId}/trace/${entity.id}`
		return '/'
	}
</script>


<T.PerspectiveCamera
	makeDefault
	position={cameraPositionStore as [number, number, number]}
	fov={compact ? 40 : 60}
>
	{#if !compact}
		<OrbitControls
			enableDamping
			dampingFactor={0.1}
			minDistance={10}
			maxDistance={100}
			minPolarAngle={(Math.PI ?? 0) * 0.1}
			maxPolarAngle={(Math.PI ?? 0) * 0.4}
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
		text="Transfers"
		fontSize={0.8}
		position={[5, 4, -8]}
		color="#FF44AA"
	/>
	<Text
		text="Contracts"
		fontSize={0.8}
		position={[5, 6, -8]}
		color="#FF9800"
	/>
	<Text
		text="Tokens"
		fontSize={0.8}
		position={[5, 7, -8]}
		color="#AA44FF"
	/>
	<Text
		text="Actors"
		fontSize={0.8}
		position={[5, 9, -8]}
		color="#44FFAA"
	/>
{/if}

<!-- Error display -->
{#if false}
	<Text
		text="Error loading entities"
		fontSize={0.8}
		position={[0, 5, 0]}
		color="#FF4444"
		anchorX="center"
		anchorY="center"
	/>
{/if}

<!-- Entities -->
{#each processedEntities as entity}
	{@const [x, y, z] = getEntityPosition(entity)}
	{@const size = getEntitySize(entity)}
	{@const color = getEntityColor(entity)}
	{@const emissiveIntensity = getEntityEmissiveIntensity(entity)}
	{@const visible = compact ? entity.type === EntityType.Block : true}
	
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
				rotation={entity.type === EntityType.Transaction
					? [-Math.PI / 2, 0, 0] as [number, number, number]
					: entity.type === EntityType.Transfer
						? [-Math.PI / 4, 0, Math.PI / 4] as [number, number, number]
						: [0, 0, 0] as [number, number, number]
				}
			>
				{#if entity.type === EntityType.Block}
					<T.BoxGeometry args={[size, size, size]} />
				{:else if entity.type === EntityType.Transaction || entity.type === EntityType.Transfer}
					<!-- Arrow geometry for transactions and transfers -->
					<T.ConeGeometry args={[size * 0.3, size * 2, 6]} />
				{:else if entity.type === EntityType.Contract}
					<T.CylinderGeometry args={[size, size, size * 2, 8]} />
				{:else if entity.type === EntityType.Token}
					<!-- Token icon (hexagonal with hole) -->
					<T.CylinderGeometry args={[size, size, size * 0.3, 6]} />
					<T.mesh position={[0, 0, 0]}>
						<T.CylinderGeometry args={[size * 0.4, size * 0.4, size * 0.35, 6]} />
						<T.MeshStandardMaterial
							color="#000"
							transparent
							opacity={0.8}
						/>
					</T.mesh>
				{:else if entity.type === EntityType.Actor}
					<T.SphereGeometry args={[size, 16, 16]} />
					<!-- Add small cube on top for contract indication -->
					{#if 'isContract' in entity && entity.isContract}
						<T.mesh position={[0, size + 0.2, 0]}>
							<T.BoxGeometry args={[size * 0.3, size * 0.3, size * 0.3]} />
							<T.MeshStandardMaterial color="#FFAA00" />
						</T.mesh>
					{/if}
				{:else if entity.type === EntityType.Event}
					<T.OctahedronGeometry args={[size]} />
				{:else if entity.type === EntityType.Trace}
					<T.TetrahedronGeometry args={[size]} />
				{:else if entity.type === EntityType.Validator}
					<T.DodecahedronGeometry args={[size]} />
				{:else}
					<!-- Default shape for unknown types -->
					<T.IcosahedronGeometry args={[size]} />
				{/if}
				
				<T.MeshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={emissiveIntensity}
					metalness={0.5}
					roughness={0.5}
					opacity={compact ? 0.6 : (entity.featured ? 1 : 0.8)}
					transparent={compact || !entity.featured}
				/>
			</T.Mesh>
			
			<!-- Status indicators for transactions -->
			{#if entity.type === EntityType.Transaction && 'status' in entity && entity.status === 'failed'}
				<T.mesh position={[size + 0.3, 0, 0]}>
					<T.SphereGeometry args={[0.1, 8, 8]} />
					<T.MeshBasicMaterial color="#FF0000" />
				</T.mesh>
			{/if}
			
			<!-- Token symbol for tokens -->
			{#if entity.type === EntityType.Token && 'symbol' in entity && entity.symbol && !compact}
				<Text
					text={entity.symbol}
					fontSize={0.2}
					position={[0, 0, size + 0.1]}
					color="#FFF"
					anchorX="center"
					anchorY="center"
				/>
			{/if}
			
			<!-- Label -->
			{#if !compact || entity.type === EntityType.Block}
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

<!-- Connection lines between related entities -->
{#if !compact}
	{#each processedEntities as entity, i}
		{#each processedEntities.slice(i + 1) as otherEntity}
			{#if 'blockNumber' in entity && 'blockNumber' in otherEntity && entity.blockNumber === otherEntity.blockNumber && entity.type !== otherEntity.type}
				{@const [x1, y1, z1] = getEntityPosition(entity)}
				{@const [x2, y2, z2] = getEntityPosition(otherEntity)}
				{@const points = [
					new THREE.Vector3(x1, y1, z1),
					new THREE.Vector3(x2, y2, z2)
				]}
				{@const geometry = new THREE.BufferGeometry().setFromPoints(points)}
				{@const isFeaturedConnection = entity.featured || otherEntity.featured}
				
				<T.Line geometry={geometry}>
					<T.LineBasicMaterial
						color={isFeaturedConnection ? "#888" : "#444"}
						opacity={isFeaturedConnection ? 0.6 : 0.3}
						transparent
					/>
				</T.Line>
			{/if}
		{/each}
	{/each}
{/if}

<!-- Featured entities summary -->
{#if featuredEntities.length > 0 && !compact}
	<Text
		text={`${featuredEntities.length} featured ${featuredEntities.length === 1 ? 'entity' : 'entities'}`}
		fontSize={0.6}
		position={[-10, 8, -8]}
		color="#FFD700"
		anchorX="left"
		anchorY="center"
	/>
{/if} 