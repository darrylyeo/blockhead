<script lang="ts">
	// Constants
	import { type IpfsGatewayConfig, IpfsGatewayProvider } from '../data/ipfsGateways'


	// External state
	export let ipfsGateway: IpfsGatewayConfig
	export let content: string | File | Blob


	// Functions
	import { encodeBytes } from '../api/ipfs/helia'


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsGateway.gatewayProvider === IpfsGatewayProvider.Helia}
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
