<script lang="ts">
	// Types
	import type { FarcasterFrameServerMeta } from '$/api/farcaster/frame'


	// Inputs
	export let url: string
	export let title: string
	export let imageUrl: string
	export let farcasterFrameMetadata: FarcasterFrameServerMeta | undefined


	// Components
	import Collapsible from './Collapsible.svelte'
	import Dialog from './Dialog.svelte'
	import FileDetails from './FileDetails.svelte'
	import FarcasterFrame from './FarcasterFrame.svelte'
</script>


<Dialog>
	<div class="button small">Share</div>

	<svelte:fragment slot="content">
		{#if farcasterFrameMetadata}
			<Collapsible
				containerClass="card"
				{title}
				isOpen
			>
				<FarcasterFrame
					frameUrl={url}
					{farcasterFrameMetadata}
				/>
			</Collapsible>
		{:else}
			<FileDetails
				isOpen={true}
				fileName={title}
				contentType={'image/png'}
				src={imageUrl}
			/>
		{/if}
	</svelte:fragment>
</Dialog>
