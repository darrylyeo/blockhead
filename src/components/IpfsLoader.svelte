<script lang="ts">
	// Constants/types
	import { IpfsGatewayProvider, ipfsGatewaysByProvider } from '$/data/ipfsGateways'

	import type { IpfsCid } from '$/api/ipfs/contentId'
	import type { IpnsName } from '$/api/ipfs/ipns'


	// Context
	import { preferences } from '$/state/preferences'


	// External state
	export let ipfsUrl: string | undefined
	export let ipfsGatewayProvider: IpfsGatewayProvider
	export let ipfsContentId: IpfsCid | undefined
	export let ipnsName: IpnsName | undefined
	export let ipfsContentPath: string | undefined

	export let contentDescription = 'content'

	// (Computed)
	$: ipfsGatewayProvider = $$props.ipfsGateway ?? $preferences.ipfsGateway

	// (Loader)
	export let whenLoaded: Loader<any, any, any, any, any>['whenLoaded']


	// Internal state
	// (Computed)
	$: ipfsGateway = ipfsGatewaysByProvider[ipfsGatewayProvider]

	import { resolveUri } from '$/utils/resolveUri'

	$: resolvedIpfsUrl = resolveUri({
		src: ipfsUrl ?? (
			ipfsContentId ?
				`ipfs://${ipfsContentId}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`
			: ipnsName ?
				`ipns://${ipnsName}${ipfsContentPath ? `/${ipfsContentPath}` : ''}`
			:
				''
		),
		ipfsGatewayDomain: ipfsGateway.gatewayDomain,
	})


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { parseResponse } from '$/utils/parseResponse'


	// Output
	type SharedSlotProps = {
		ipfsGateway: typeof ipfsGateway,
		ipfsGatewayProvider: typeof ipfsGatewayProvider,
		ipfsContentId: typeof ipfsContentId,
		resolvedIpfsUrl: typeof resolvedIpfsUrl,
	} & (
		| Awaited<ReturnType<typeof parseResponse>>
		// | { dagStats: Awaited<ReturnType<typeof import('$/api/ipfs/helia').getIpfsDag>> }
	)

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
	import { IpfsIcon } from '$/assets/icons'
</script>


{#if ipfsContentId || ipnsName}
	{#if ipfsGatewayProvider === IpfsGatewayProvider.Helia}
		<Loader
			fromPromise={
				async () => {
					throw new Error('IPFS node temporarily disabled.')

					// const { getIpfsContent, getIpfsDag } = await import('$/api/ipfs/helia')

					// try {
					// 	return await getIpfsContent({
					// 		ipfsContentId,
					// 		ipnsName,
					// 		ipfsContentPath,
					// 	})
					// 		.then(parseResponse)
					// }catch(e){
					// 	if(e?.constructor?.name === 'NotAFileError'){
					// 		return await getIpfsDag({
					// 			ipfsContentId,
					// 			ipfsContentPath,
					// 		})
					// 			.then(dagStats => ({
					// 				dagStats
					// 			}))
					// 	}
					// }
				}
			}
			loadingIcon={IpfsIcon}
			loadingIconName="IPFS"
			loadingMessage={`Fetching ${contentDescription} from local IPFS node...`}
			errorMessage={`Couldn't fetch ${contentDescription} from local IPFS node.`}
			{whenLoaded}
			let:result
		>
			<svelte:fragment slot="header"
				let:result
			>
				<slot name="header"
					{...result}
					{ipfsGateway} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl}
				/>
			</svelte:fragment>

			<slot
				{...result}
				{ipfsGateway} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl}
			/>
		</Loader>

	{:else}
		<Loader
			fromQuery={
				createQuery({
					queryKey: ['Ipfs', {
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
			loadingMessage={`Fetching ${contentDescription} from IPFS via ${ipfsGateway.name}...`}
			errorMessage={`Couldn't fetch ${contentDescription} from IPFS via ${ipfsGateway.name}.`}
			{whenLoaded}
			let:result
		>
			<svelte:fragment slot="header"
				let:result
			>
				<slot name="header"
					{...result}
					{ipfsGateway} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl}
				/>
			</svelte:fragment>

			<slot
				{...result}
				{ipfsGateway} {ipfsGatewayProvider} {ipfsContentId} {resolvedIpfsUrl}
			/>
		</Loader>
	{/if}
{/if}
