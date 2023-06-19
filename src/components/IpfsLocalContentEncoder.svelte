<script lang="ts">
	// Constants
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig
	export let content: string | Blob | File | FileList


	// Functions
	import { encodeBytes, encodeFile } from '../api/ipfs/helia'


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsGateway.gatewayProvider === IpfsGatewayProvider.Helia}
	{#if content instanceof File}
		<Loader
			fromPromise={async () => (
				await encodeFile(content)
			)}
			loadingIcon={IpfsIcon}
			loadingIconName='IPFS'
			loadingMessage={`Encoding file using local IPFS node...`}
			errorMessage={`Couldn't encode file using local IPFS node.`}
			{...$$restProps}
			let:result={cid}
		>
			<slot slot='header' name='header' {cid} />
			<slot {cid} />
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
			let:result={cid}
		>
			<slot slot='header' name='header' {cid} />
			<slot {cid} />
		</Loader>
	{/if}
{/if}
