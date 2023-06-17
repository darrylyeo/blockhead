<script lang="ts">
	// Constants/types
	import { IpfsGatewayProvider, ipfsGatewaysByProvider } from '../data/ipfsGateways'

	import type { IpfsCid } from '../api/ipfs/contentId'


	// Context
	import { preferences } from '../state/preferences'


	// External state
	export let ipfsUrl: string | undefined
	export let ipfsGatewayProvider: IpfsGatewayProvider
	export let ipfsContentId: IpfsCid | undefined
	export let ipfsContentPath: string | undefined
	// (Computed)
	$: ipfsGatewayProvider = $$props.ipfsGateway ?? $preferences.ipfsGateway


	// Internal state
	// (Computed)
	$: ipfsGateway = ipfsGatewaysByProvider[ipfsGatewayProvider]

	import { resolveUri } from '../utils/resolveUri'

	$: resolvedIpfsUrl = resolveUri({
		src: ipfsUrl ?? `ipfs://${ipfsContentId}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`,
		ipfsGatewayDomain: ipfsGateway.gatewayDomain,
	})


	// Functions
	import { useQuery } from '@sveltestack/svelte-query'
	import { parseResponse } from '../utils/parseResponse'


	// Output
	type SharedSlotProps = {
		ipfsGateway: typeof ipfsGateway,
		ipfsContentId: typeof ipfsContentId,
		resolvedIpfsUrl: typeof resolvedIpfsUrl,
	} & Awaited<ReturnType<typeof parseResponse>>

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsContentId}
	<Loader
		fromUseQuery={
			useQuery({
				queryKey: ['IPFS', {
					ipfsUrl: resolvedIpfsUrl,
				}],
				queryFn: async () => (
					await fetch(resolvedIpfsUrl)
						.then(async response => {
							if(response.status === 422)
								throw `Unprocessable IPFS CID "${ipfsContentId}"\nTry selecting a different encoding.`

							if(!(response.status >= 200 && response.status < 300))
								throw `${response.status} ${response.statusText}\n${await response.text()}`

							return response
						})
						.then(parseResponse)
				)
			})
		}
		loadingIcon={IpfsIcon}
		loadingIconName="IPFS"
		loadingMessage={`Fetching content from IPFS via ${ipfsGateway.name}...`}
		errorMessage={`Couldn't fetch content from IPFS.`}
		{...$$restProps}
		let:result
	>
		<slot slot="header" name="header" {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
		<slot {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
	</Loader>
{/if}
