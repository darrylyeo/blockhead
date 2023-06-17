<script lang="ts">
	import type { IpfsCid } from '../api/ipfs/contentId'


	export let ipfsContentId: IpfsCid
	export let ipfsContentPath: string | undefined
	export let linked = true
	export let linkedParts = false
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
			<a href={`/apps/ipfs/content/${encodeURIComponent(ipfsContentId)}`}>{ipfsContentId}</a>{#if ipfsContentPath}/<a href={`/apps/ipfs/content/${encodeURIComponent(ipfsContentId)}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`}>{ipfsContentPath}</a>{/if}
		</slot>
	</span>
{:else}
	<svelte:element
		this={linked ? 'a' : 'span'}
		class="ipfs-content-id"
		{...linked && {
			href: `/apps/ipfs/content/${encodeURIComponent(ipfsContentId)}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`
		}}
		title={ipfsContentId}
	>
		<slot {ipfsContentId} {ipfsContentPath}>
			{ipfsContentId}{ipfsContentPath ? `/${ipfsContentPath}` : ''}
		</slot>
	</svelte:element>
{/if}
