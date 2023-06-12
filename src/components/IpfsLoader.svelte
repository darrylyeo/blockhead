<script lang="ts">
	import type { IpfsCid } from '../api/ipfs/contentId'


	// Context
	import { preferences } from '../state/preferences'


	// Props

	type ContentType = $$Generic<'text' | 'json'>

	export let ipfsUrl: string | undefined

	export let ipfsGateway: string | undefined
	$: ipfsGateway = $$props.ipfsGateway ?? $preferences.ipfsGateway

	export let ipfsCid: IpfsCid | undefined

	export let type: ContentType = 'text'


	// Computed
	import { resolveUri } from '../utils/resolveUri'

	$: resolvedIpfsUrl = resolveUri({
		src: ipfsUrl ?? `ipfs://${ipfsCid}`,
		ipfsGateway: $preferences.ipfsGateway,
	})

	// Shared state
	export let content: (ContentType extends 'string' ? string : object) | undefined


	// Output
	type SharedSlotProps = {
		content: typeof content,
		ipfsGateway: typeof ipfsGateway,
		ipfsCid: typeof ipfsCid,
		resolvedIpfsUrl: typeof resolvedIpfsUrl,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	import { useQuery } from '@sveltestack/svelte-query'


	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if ipfsCid}
	<Loader
		fromUseQuery={
			useQuery({
				queryKey: ['IPFS', {
					type,
					ipfsUrl: resolvedIpfsUrl,
				}],
				queryFn: async () => (
					await fetch(resolvedIpfsUrl)
						.then(async result => {
							if(!(result.status >= 200 && result.status < 300))
								throw await result.text()
							return result
						})
						.then(result =>
							type === 'json' ?
								result.json()
							: type === 'text' ?
								result.text()
							:
								result.text()
						)
				)
			})
		}
		loadingIcon={IpfsIcon}
		loadingIconName="IPFS"
		loadingMessage={`Fetching content from IPFS via ${ipfsGateway}...`}
		errorMessage={`Couldn't fetch content from IPFS.`}
		{...$$restProps}
		bind:result={content}
	>
		<slot slot="header" name="header" {content} {ipfsGateway} {ipfsCid} {resolvedIpfsUrl} />
		<slot {content} {ipfsGateway} {ipfsCid} {resolvedIpfsUrl} />
	</Loader>
{/if}
