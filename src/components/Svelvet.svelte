<script lang="ts">
	import Svelvet, { type UserEdgeType, type UserNodeType } from 'svelvet'
	
	type DefaultNode = $$Generic<Partial<Omit<UserNodeType, 'id'>>>
	type DefaultEdge = $$Generic<Partial<Omit<UserEdgeType, 'id'>>>

	export let defaultNode: DefaultNode
	export let defaultEdge: DefaultEdge

	export let nodes: Partial<UserNodeType> & Omit<UserNodeType, keyof DefaultNode>[] = []
	export let edges: Partial<UserEdgeType> & Omit<UserEdgeType, keyof DefaultEdge>[] = []


	let width: number
	let height: number
</script>


<div
	class="svelvet-container"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	{#if width && height}
		<Svelvet
			nodes={
				nodes.map(node => ({...defaultNode, ...node}))
			}
			edges={
				edges.map(edge => ({...defaultEdge, ...edge}))
			}
			{width}
			{height}
			nodeCreate={false}
			minimap={false}
			resizable={false}
			bgColor="transparent"
			snap={true}
			snapTo={1}
			{...$$props}
		/>
	{/if}
</div>


<style>
	.svelvet-container {
		height: 20rem;
	}

	:global(.Svelvet) {
		font: inherit !important;
	}

	:global(.Svelvet *) {
		transition: none;
	}

	:global(.Node) {
		color: inherit !important;
		font: inherit !important;
	}
</style>
