<script lang="ts">
	// Constants/types
	import type { IpfsCid } from '$/api/ipfs/contentId'


	// External state
	export let ipfsContentId: IpfsCid
	export let ipfsContentPath: string | undefined
	export let linked = true
	export let linkedParts = false
	export let format: 'full' | 'middle-truncated' = 'full'


	// Internal state
	// (Computed)
	$: fullPath = `${ipfsContentId}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`
	// $: parts = fullPath.split('/')
	$: parts = [
		ipfsContentId,
		...ipfsContentPath ? ipfsContentPath.split('/') : [],
	]
	$: link = `/apps/ipfs/content/${parts.map(encodeURIComponent).join('/')}`


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', ipfsContentId)
		if(linked) e.dataTransfer.setData('text/uri-list', link)
	}


	// Components
	import TruncatedValue from './TruncatedValue.svelte'
</script>


<style>
	.format {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>


{#if linkedParts}
	<span
		class="ipfs-content-id format"
		title={ipfsContentId}
	>
		<slot {ipfsContentId} {ipfsContentPath}>
			{#each parts as part, i}
				{#if i > 0}/{/if}<a
					href={`/apps/ipfs/content/${parts.slice(0, i + 1).map(encodeURIComponent).join('/')}`}
					draggable={true}
					on:dragstart={onDragStart}
				>{#if format === 'full'}{part}{:else}<TruncatedValue value={part} startLength={8} endLength={6} />{/if}</a>
			{/each}
		</slot>
	</span>
{:else}
	<svelte:element
		this={linked ? 'a' : 'span'}
		class="ipfs-content-id"
		{...linked && {
			href: link
		}}
		title={ipfsContentId}
		draggable={true}
		on:dragstart={onDragStart}
	>
		<slot {ipfsContentId} {ipfsContentPath}>
			<span class="format">{#if format === 'full'}{ipfsContentId}{:else}<TruncatedValue value={ipfsContentId} startLength={8} endLength={6} />{/if}</span>
		</slot>
	</svelte:element>
{/if}
