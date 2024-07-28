// Polyfills

import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process

import fromAsync from 'array-from-async'
Array.fromAsync ||= fromAsync


// Shims
import shimMapGroupBy from 'map.groupby'
shimMapGroupBy.shim()

import shimObjectGroupBy from 'object.groupby'
shimObjectGroupBy.shim()

import shimRegexpEscape from 'regexp.escape'
shimRegexpEscape.shim()

import shimSetDifference from 'set.prototype.difference'
shimSetDifference.shim()


// SvelteKit

export const prerender = 'auto'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
export const trailingSlash = isStatic ? 'always' : 'never'


// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	const metaTags: MetaTagsProps = {
		title: `Blockhead`,
		description: `Track, visualize & explore all of crypto, DeFi & web3 with Blockhead's crypto portfolio tracker, cross-EVM block explorer, and interfaces for your favorite dapps and web3 infrastructure.`,
		openGraph: {
			type: 'website',
			url: 'https://blockhead.info',
			title: `Blockhead | track, visualize & explore all of crypto, DeFi & web3`,
			description: `Track, visualize & explore all of crypto, DeFi & web3 with Blockhead's crypto portfolio tracker, cross-EVM block explorer, and interfaces for your favorite dapps and web3 infrastructure.`,
			images: [
				{
					url: 'https://blockhead.info/Blockhead@1-1728x1080.png',
					width: 1728,
					height: 1080,
					alt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3'
				},
			],
			siteName: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3',
		},
		twitter: {
			handle: '@darryl__yeo',
			site: '@0xBlockhead',
			cardType: 'summary_large_image',
			title: `Blockhead・track, visualize & explore all of crypto, DeFi & web3・B⃞`,
			description: `EVM networks, blocks, txs, accounts, contracts, dapps, NFTs, web3 infra`,
			// description: `EVM networks/blocks/txs/accounts/contracts/dapps/NFTs/infra & more`,
			image: 'https://blockhead.info/Blockhead@1-1728x1080.png',
			imageAlt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3',
		},
		additionalLinkTags: [
			{
				rel: 'icon',
				href: '/favicon.png',
			},
			{
				rel: 'apple-touch-icon',
				href: '/logo-192.png',
				sizes: '192x192',
			},
			{
				rel: 'apple-touch-icon',
				href: '/logo-512.png',
				sizes: '512x512',
			},
			{
				rel: 'manifest',
				href: '/manifest.json',
			},
		],
	}

	return {
		metaTags,
	}
}
