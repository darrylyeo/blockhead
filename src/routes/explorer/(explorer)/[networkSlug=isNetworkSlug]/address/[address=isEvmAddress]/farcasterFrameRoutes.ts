// Types/constants
import { networksBySlug } from '$/data/networks'


// Functions
import { resolveRoute } from '$app/paths'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu } from '$/utils/farcasterFrameRoutes'

import Page from './page.opengraph.svelte'
import Balances from './balances/Balances.opengraph.svelte'
import Positions from './positions/Positions.opengraph.svelte'
import Nfts from './nfts/Nfts.opengraph.svelte'

export const farcasterFrameRoutes = Object.assign(
	{
		'/': {
			load: async () => {
				
			},
			render: Page,
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
			load: async () => {
				
			},
			render: Balances,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/positions': {
			load: async () => {
				
			},
			render: Positions,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/nfts': {
			load: async () => {
				
			},
			render: Nfts,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/contract': {
			load: async () => {
				
			},
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
