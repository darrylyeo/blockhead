<script lang="ts">
	import type { IpfsCid } from '../api/ipfs/contentId'


	export let ipfsContentId: IpfsCid
	export let linked = true
</script>


<style>
	.ipfs-content-id {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>


<svelte:element
	this={linked ? 'a' : 'span'}
	class="ipfs-content-id"
	{...linked ? {
		href: `/apps/ipfs/content/${encodeURIComponent(ipfsContentId)}`
	} : {}}
	title={ipfsContentId}
>
	<slot {ipfsContentId}>{ipfsContentId}</slot>
</svelte:element>
