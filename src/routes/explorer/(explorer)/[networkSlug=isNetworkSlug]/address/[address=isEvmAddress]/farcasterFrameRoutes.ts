// Types/constants
import { networksBySlug } from '$/data/networks'


// Functions
import { resolveRoute } from '$app/paths'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu } from '$/utils/farcasterFrameRoutes'

import Page from './page.opengraph.svelte'
import { load as BalancesPageLoad } from './balances/page.opengraph'
import BalancesPage from './balances/page.opengraph.svelte'
import { load as PositionsPageLoad } from './positions/page.opengraph'
import PositionsPage from './positions/page.opengraph.svelte'
import { load as NftsPageLoad } from './nfts/page.opengraph'
import NftsPage from './nfts/page.opengraph.svelte'
import { load as ContractPageLoad } from './contract/page.opengraph'
import ContractPage from './contract/page.opengraph.svelte'

export const farcasterFrameRoutes = Object.assign(
	{
		'/': {
			pageComponent: Page,
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
			pageLoad: BalancesPageLoad,
			pageComponent: BalancesPage,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/positions': {
			pageLoad: PositionsPageLoad,
			pageComponent: PositionsPage,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/nfts': {
			pageLoad: NftsPageLoad,
			pageComponent: NftsPage,
			buttons: [
				{
					label: '← Back',
					toFrameRoute: '/',
				},
			],
		},
		'/contract': {
			pageLoad: ContractPageLoad,
			pageComponent: ContractPage,
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
