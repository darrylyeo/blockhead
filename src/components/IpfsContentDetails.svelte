<script lang="ts">
	// Constants/types
	import type { IpfsGatewayConfig } from '$/data/ipfsGateways'
	import type { IpfsCid } from '$/api/ipfs/contentId'
	import type { IpnsName } from '$/api/ipfs/ipns'


	// External state
	export let ipfsGateway: IpfsGatewayConfig
	export let ipfsContentId: IpfsCid | undefined
	export let ipnsName: IpnsName | undefined
	export let ipfsContentPath: string


	// View Options
	export let headingLevel: 1 | 2 | 3 | 4 = 2


	// Components
	import FileDetails from './FileDetails.svelte'
	import IpfsLoader from './IpfsLoader.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
</script>


<IpfsLoader
	ipfsGatewayProvider={ipfsGateway.gatewayProvider}
	{ipfsContentId}
	{ipnsName}
	{ipfsContentPath}
	let:dagStats
	let:resolvedIpfsUrl
	let:contentType
	let:text
	let:blob
>
	{#if dagStats}
		<article class="card bar wrap">
			<h4 class="row" data-before="⋔"><IpfsContentId {ipfsContentId} /></h4>

			<div class="row wrap">
				<div role="toolbar" class="row-inline">
					{#if dagStats.dagSize}<span>{dagStats.dagSize} bytes</span> │{/if}
					{#if dagStats.blocks}<span>{dagStats.blocks} blocks</span>{/if}
					<!-- {#if dagStats.fileSize}<span>{dagStats.fileSize} bytes</span> │{/if} -->
				</div>
					
				<span class="card-annotation">UnixFS DAG</span>
			</div>
		</article>
	{:else}
		<FileDetails
			fileName={resolvedIpfsUrl.match(/[^/]+$/)?.[0]}
			{contentType}
			{text}
			{blob}
		/>
	{/if}
</IpfsLoader>
