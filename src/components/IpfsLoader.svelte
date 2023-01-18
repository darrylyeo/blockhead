<script lang="ts">
	export let contentId: `Qm${string}`
	export let type: 'text' | 'json' = 'text'
	export let gatewayUrl = 'https://ipfs.io'


	$: ipfsUrl = `${gatewayUrl}/ipfs/${contentId}`

	export let content


	import { useQuery } from '@sveltestack/svelte-query'


	import Loader from './Loader.svelte'
	import { IpfsIcon } from '../assets/icons'
</script>


{#if contentId}
	<Loader
		fromUseQuery={
			useQuery({
				queryKey: ['IPFS', {
					contentId,
					type,
					gatewayUrl
				}],
				queryFn: async () => (
					await fetch(ipfsUrl)
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
		loadingMessage={`Fetching content from IPFS via ${new URL(gatewayUrl).hostname}...`}
		errorMessage={`Couldn't fetch content on ${'Sourcify'}.`}
		bind:result={content}
	>
		<slot slot="header" name="header" {content} {ipfsUrl} />
		<slot {content} {ipfsUrl} />
	</Loader>
{/if}
