<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { ipfsGatewaysByProvider } from '$/data/ipfsGateways'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let nft: Ethereum.Nft
	export let width: number | undefined
	export let height: number | undefined


	// Internal state
	// (Computed)
	$: sources = [
		[nft.metadata['image'], undefined],
		[nft.metadata['image_256'], '(min-width: 256px)'],
		[nft.metadata['image_512'], '(min-width: 512px)'],
		[nft.metadata['image_1024'], '(min-width: 1024px)'],
	]
		.filter(([ uri, ]) => uri)
		.map(([ uri, media ]) => ({
			uri: resolveUri({
				src: uri,
				ipfsGatewayDomain: ipfsGatewaysByProvider[$preferences.ipfsGateway].gatewayDomain,
				arweaveGateway: $preferences.arweaveGateway,
			}),
			media,
		}))


	// Functions
	import { resolveUri } from '$/utils/resolveUri'

	const formatTokenId = (tokenId: Ethereum.Nft['tokenId']) =>
		String(tokenId).length > 12
			? String(tokenId).slice(0, 6) + '⸱⸱⸱' + String(tokenId).slice(-6)
			: String(tokenId)

	const formatNFTNameAndTokenID = (name: string, tokenId: Ethereum.Nft['tokenId']) => (
		`${name ? `${name.replace(new RegExp(`#${tokenId}$`), '')}\n` : ''}#${formatTokenId(tokenId)}`
	)
</script>


<picture
	class="nft-image"
	title={
		[
			[formatNFTNameAndTokenID(nft.metadata.name ?? '', nft.tokenId), nft.metadata.name],
			[nft.metadata.description],
			nft.metadata.attributes?.map(({traitType, value}) => `${traitType}: ${value}`) ?? []
		].map(section => section.filter(Boolean).join('\n')).filter(Boolean).join('\n\n')
	}
>
	{#each sources as source}
		<source
			srcset={source.uri}
			media={source.media}
		/>
	{/each}

	{#if sources[0]}
		<img
			src={sources[0].uri}
			alt={formatNFTNameAndTokenID(nft.metadata.name ?? '', nft.tokenId)}
			loading="lazy"
			draggable={false}
			{width}
			{height}
			on:load
		/>
	{/if}
	<!-- <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={formatNFTNameAndTokenID(metadata.name, token_id)} /> -->
</picture>

<!-- {#if metadata.animation_url}
	<iframe src={metadata.animation_url} lazy="true" />
{/if} -->
<!-- </a> -->


<style>
	.nft-image {
		display: grid;
	}
</style>
