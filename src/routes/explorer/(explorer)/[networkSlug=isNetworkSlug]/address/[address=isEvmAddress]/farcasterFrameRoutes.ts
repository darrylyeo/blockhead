// Types/constants
import { networksBySlug } from '$/data/networks'


// Functions
import { resolveRoute } from '$app/paths'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu } from '$/utils/farcasterFrameRoutes'

export const farcasterFrameRoutes = Object.assign(
	{
		'/': {
			pageComponent: (await import('./page.opengraph.svelte')).default,
			buttons: [
				{
					label: 'Go to...',
					toFrameRoute: '/#nav/1',
				},
				{
					label: 'Switch Networks...',
					toFrameRoute: '/#switch/1',
				},
			],
		},
	},
	createSubmenu({
		baseRoute: '/',
		menuRoute: 'nav',
		buttons: [
			{ label: 'Balances', toFrameRoute: '/balances' },
			{ label: 'DeFi Positions', toFrameRoute: '/positions' },
			{ label: 'NFTs', toFrameRoute: '/nfts' },
			{ label: 'Contract Code', toFrameRoute: '/contract' },
		]
	}),
	{
		'/balances': {
			pageLoad: (await import('./balances/page.opengraph')).load,
			pageComponent: (await import('./balances/page.opengraph.svelte')).default,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/positions': {
			pageLoad: (await import('./positions/page.opengraph')).load,
			pageComponent: (await import('./positions/page.opengraph.svelte')).default,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/nfts': {
			pageLoad: (await import('./nfts/page.opengraph')).load,
			pageComponent: (await import('./nfts/page.opengraph.svelte')).default,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/contract': {
			pageLoad: (await import('./contract/page.opengraph')).load,
			pageComponent: (await import('./contract/page.opengraph.svelte')).default,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
	},
	createSubmenu({
		baseRoute: '/',
		menuRoute: 'switch-network',
		buttons: [
			'ethereum',
			'optimism',
			'base',
			'zora',
			'polygon',
			'arbitrum-one',
			'avalanche',
		].map(networkSlug => ({
			label: networksBySlug[networkSlug].name,
			toAppRoute: ({ address }) => resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
				networkSlug,
				address,
			}),
		}))
	})
) satisfies FarcasterFrameRoutes<string>

export type FrameRoute = keyof typeof farcasterFrameRoutes
