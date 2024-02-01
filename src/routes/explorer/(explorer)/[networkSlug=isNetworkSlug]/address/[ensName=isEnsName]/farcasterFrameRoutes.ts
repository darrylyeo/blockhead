// Types/constants
import { networksBySlug } from '$/data/networks'


// Functions
import { resolveRoute } from '$app/paths'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu } from '$/utils/farcasterFrameRoutes'

export const farcasterFrameRoutes = Object.assign(
	{
		'/': {
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
			{ label: 'Balances', toFrameRoute: '/tokens' },
			{ label: 'DeFi Positions', toFrameRoute: '/defi' },
			{ label: 'NFTs', toFrameRoute: '/nfts' },
			{ label: 'Contract Code', toFrameRoute: '/contract' },
		]
	}),
	{
		'/tokens': {
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/defi': {
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/nfts': {
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/contract': {
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
