<script lang="ts">
	// Constants/types
	import type { IpfsCid } from '../api/ipfs/contentId'


	// External state
	export let ipfsContentId: IpfsCid
	export let ipfsContentPath: string | undefined
	export let linked = true
	export let linkedParts = false


	// Internal state
	// (Computed)
	$: fullPath = `${ipfsContentId}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`
	// $: parts = fullPath.split('/')
	$: parts = [
		ipfsContentId,
		...ipfsContentPath ? ipfsContentPath.split('/') : [],
	]
</script>


<style>
	.ipfs-content-id {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>


{#if linkedParts}
	<span
		class="ipfs-content-id"
		title={ipfsContentId}
	>
		<slot {ipfsContentId} {ipfsContentPath}>
			{#each parts as part, i}
				{#if i > 0}/{/if}<a href={`/apps/ipfs/content/${parts.slice(0, i + 1).map(encodeURIComponent).join('/')}`}>{part}</a>
			{/each}
		</slot>
	</span>
{:else}
	<svelte:element
		this={linked ? 'a' : 'span'}
		class="ipfs-content-id"
		{...linked && {
			href: `/apps/ipfs/content/${parts.map(encodeURIComponent).join('/')}`
		}}
		title={ipfsContentId}
	>
		<slot {ipfsContentId} {ipfsContentPath}>{fullPath}</slot>
	</svelte:element>
{/if}
