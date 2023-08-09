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
	import { createQuery } from '@tanstack/svelte-query'
	import { getIpfsContent, getIpfsDag } from '../api/ipfs/helia'
	import { parseResponse } from '../utils/parseResponse'


	// Output
	type SharedSlotProps = {
		ipfsGateway: typeof ipfsGateway,
		ipfsContentId: typeof ipfsContentId,
		resolvedIpfsUrl: typeof resolvedIpfsUrl,
	} & Awaited<ReturnType<typeof parseResponse>> | { dagStats: Awaited<ReturnType<typeof getIpfsDag>> }

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsContentId}
	{#if ipfsGatewayProvider === IpfsGatewayProvider.Helia}
		<Loader
			fromPromise={
				async () => {
					try{
						return await getIpfsContent({
							ipfsContentId,
							ipfsContentPath,
						})
							.then(parseResponse)
					}catch(e){
						if(e?.constructor?.name === 'NotAFileError'){
							return await getIpfsDag({
								ipfsContentId,
								ipfsContentPath,
							})
								.then(dagStats => ({
									dagStats
								}))
						}
					}
				}
			}
			loadingIcon={IpfsIcon}
			loadingIconName="IPFS"
			loadingMessage={`Fetching content from local IPFS node...`}
			errorMessage={`Couldn't fetch content from local IPFS node.`}
			{...$$restProps}
			let:result
		>
			<svelte:fragment slot="header"
				let:result
			>
				<slot name="header" {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
			</svelte:fragment>
			<slot {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
		</Loader>

	{:else}
	<Loader
		fromUseQuery={
			createQuery({
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
		<svelte:fragment slot="header"
			let:result
		>
			<slot name="header" {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
		</svelte:fragment>
		<slot {...result} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl} />
	</Loader>
	{/if}
{/if}
