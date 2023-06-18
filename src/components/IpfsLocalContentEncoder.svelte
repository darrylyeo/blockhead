<script lang="ts">
	// Constants
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig
	export let content: string | Blob | FileList


	// Functions
	import { encodeBytes, encodeFile } from '../api/ipfs/helia'


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsGateway.gatewayProvider === IpfsGatewayProvider.Helia}
	{#if content instanceof FileList}
		<Loader
			fromPromise={async () => (
				await encodeFile(content[0])
			)}
			loadingIcon={IpfsIcon}
			loadingIconName='IPFS'
			loadingMessage={`Encoding file using local IPFS node...`}
			errorMessage={`Couldn't encode file using local IPFS node.`}
			{...$$restProps}
			let:result
		>
			<slot slot='header' name='header' cid={result.cid} />
			<slot cid={result.cid} />
		</Loader>
	{:else}
		<Loader
			fromPromise={async () => (
				await encodeBytes(content)
			)}
			loadingIcon={IpfsIcon}
			loadingIconName='IPFS'
			loadingMessage={`Encoding content using local IPFS node...`}
			errorMessage={`Couldn't encode content using local IPFS node.`}
			{...$$restProps}
			let:result
		>
			<slot slot='header' name='header' cid={result.cid} />
			<slot cid={result.cid} />
		</Loader>
	{/if}
{/if}
