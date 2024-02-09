// Types/constants
import { networksBySlug } from '$/data/networks'


// Context
import { env } from '$/env'


// Functions
import { resolveRoute } from '$app/paths'
import { user } from '$/api/neynar/v1'
import { normalizeUserV1 } from '$/api/neynar/normalize'


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
					label: 'Show...',
					toFrameRoute: '/#views/0',
				},
				{
					label: 'Networks...',
					toFrameRoute: '/#networks/0',
				},
				{
					label: 'Go to address...',
					toFrameRoute: '/#address',
				},
				{
					label: 'View site',
					action: 'link',
				},
			],
		},
	},
	createSubmenu({
		baseRoute: '/',
		menuRoute: 'views',
		buttons: [
			{ label: 'Balances', toFrameRoute: '/balances' },
			{ label: 'NFTs', toFrameRoute: '/nfts' },
			{ label: 'Transactions', toFrameRoute: '/transactions' },
			{ label: 'DeFi Positions', toFrameRoute: '/positions' },
			{ label: 'Contract Code', toFrameRoute: '/contract' },
		]
	}),
	createSubmenu({
		baseRoute: '/',
		menuRoute: 'networks',
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
			toAppRoute: (
				{ buttonClicked: { label: networkName } },
				{ address },
			) => (
				resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
					networkSlug,
					address,
				})
			),
		}))
	}),
	{
		'/#address': {
			textInput: 'Address (0xabcd...6789) | ENS Name (vitalik.eth)',
			buttons: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
				{
					label: 'Your connected address',
					toAppRoute: async (
						{ fid },
					) => {
						const farcasterUser = normalizeUserV1(
							await user(
								env.NEYNAR_API_KEY,
								fid,
							)
						)

						const address = farcasterUser?.custodyAddress

						resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
							networkSlug,
							address,
						})
					},
				},
				{
					label: 'Go ›',
					toAppRoute: (
						{ textInput: accountId },
					) => (
						resolveRoute(`/explorer/[networkSlug]/[accountId]`, {
							networkSlug,
							accountId,
						})
					),
				},
			],
		},
	},
	{
		'/balances': {
			pageLoad: BalancesPageLoad,
			pageComponent: BalancesPage,
			buttons: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},
		'/positions': {
			pageLoad: PositionsPageLoad,
			pageComponent: PositionsPage,
			buttons: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},
		'/nfts': {
			pageLoad: NftsPageLoad,
			pageComponent: NftsPage,
			buttons: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},
		'/contract': {
			pageLoad: ContractPageLoad,
			pageComponent: ContractPage,
			buttons: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},
	},
) satisfies FarcasterFrameRoutes<string>

export type FrameRoute = keyof typeof farcasterFrameRoutes
