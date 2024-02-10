// Types/constants
import { networksBySlug } from '$/data/networks'


// Context
import type { RouteParams } from './$types'
import { env } from '$/env'


// Functions
import { resolveRoute } from '$app/paths'
import { user } from '$/api/neynar/v1'
import { normalizeUserV1 } from '$/api/neynar/normalize'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu, type FarcasterFrameActionResolver } from '$/utils/farcasterFrameRoutes'

import Page from './page.opengraph.svelte'
import { load as BalancesPageLoad } from './balances/page.opengraph'
import BalancesPage from './balances/page.opengraph.svelte'
import { load as PositionsPageLoad } from './positions/page.opengraph'
import PositionsPage from './positions/page.opengraph.svelte'
import { load as NftsPageLoad } from './nfts/page.opengraph'
import NftsPage from './nfts/page.opengraph.svelte'
import { load as ContractPageLoad } from './contract/page.opengraph'
import ContractPage from './contract/page.opengraph.svelte'

export const farcasterFrameRoutes = Object.assign({}, ...([
	{
		'/': {
			pageComponent: Page,
			actions: [
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
		actions: [
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
		actions: [
			'ethereum',
			'optimism',
			'base',
			'zora',
			'polygon',
			'arbitrum-one',
			'avalanche',
		].map(networkSlug => (
			({
				svelteKitRouteParams: { address },
			}) => ({
				label: networksBySlug[networkSlug].name,
				toAppRoute: (
					resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
						networkSlug,
						address,
					})
				),
			})
		) as FarcasterFrameActionResolver<'/', RouteParams>)
	}),

	{
		'/#address': {
			textInput: 'Address (0xabcd...6789) | ENS Name (vitalik.eth)',
			actions: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},

				async ({
					signaturePacket: { untrustedData: { fid } },
					svelteKitRouteParams: { networkSlug },
				}) => ({
					label: 'Your connected address',
					toAppRoute: await (async () => {
						const farcasterUser = normalizeUserV1(
							(
								await user(
									env.NEYNAR_API_KEY,
									fid,
								)
							).result.user,
						)

						const address = farcasterUser?.custodyAddress

						return resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
							networkSlug,
							address,
						})
					})(),
				}),

				{
					label: 'Go ›',
					onClick: ({
						svelteKitRouteParams: { networkSlug },
						signaturePacket: { untrustedData: { inputText: accountId } },
					}) => ({
						toAppRoute: resolveRoute(`/explorer/[networkSlug]/[accountId]`, {
							networkSlug,
							accountId,
						})
					}),
				},
			],
		},

		'/balances': {
			pageLoad: BalancesPageLoad,
			pageComponent: BalancesPage,
			actions: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},

		'/positions': {
			pageLoad: PositionsPageLoad,
			pageComponent: PositionsPage,
			actions: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},

		'/nfts': {
			pageLoad: NftsPageLoad,
			pageComponent: NftsPage,
			actions: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},

		'/contract': {
			pageLoad: ContractPageLoad,
			pageComponent: ContractPage,
			actions: [
				{
					label: '‹ Back',
					toFrameRoute: '/',
				},
			],
		},
	},
] as FarcasterFrameRoutes<string, RouteParams>[])) as FarcasterFrameRoutes<string, RouteParams>

export type FrameRoute = keyof typeof farcasterFrameRoutes
