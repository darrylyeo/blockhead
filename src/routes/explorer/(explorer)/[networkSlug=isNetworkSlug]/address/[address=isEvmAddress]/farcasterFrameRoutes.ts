// Types/constants
import { networksBySlug } from '$/data/networks'


// Context
import type { RouteParams } from './$types'
import { env } from '$/env'


// Functions
import { resolveRoute } from '$app/paths'
import { user } from '$/api/neynar/v1'
import { normalizeUserV1 } from '$/api/neynar/normalize'
import { formatAddress } from '$/utils/formatAddress'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, type FarcasterFrameActionResolver, createPagesWithSubmenus } from '$/utils/farcasterFrameRoutes'

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
	createPagesWithSubmenus({
		pages: {
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
						toFrameRoute: '/#address/0',
					},
					{
						label: 'View site',
						// toExternalUrl
					},
				],
			},
		},
		submenus: {
			'views': {
				actions: [
					{ label: 'Balances', toFrameRoute: '/balances' },
					{ label: 'NFTs', toFrameRoute: '/nfts' },
					{ label: 'Transactions', toFrameRoute: '/transactions' },
					{ label: 'DeFi Positions', toFrameRoute: '/positions' },
					{ label: 'Contract Code', toFrameRoute: '/contract' },
				],
			},

			'networks': {
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
						svelteKitRouteParams: { address } = {},
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
			},

			'address': {
				textInput: 'Address (0xabcd...6789) | ENS Name (vitalik.eth)',
				actions: [
					async ({
						signaturePacket: { untrustedData: { fid } },
						svelteKitRouteParams: { networkSlug } = {},
					}) => {
						const farcasterUser = fid !== undefined
							? normalizeUserV1(
								(
									await user(
										env.NEYNAR_API_KEY,
										fid,
									)
								).result.user,
							)
							: undefined
	
						const address = farcasterUser?.custodyAddress
	
						return address && {
							label: `Your address (${formatAddress(address, 'middle-truncated')})`,
							toAppRoute: resolveRoute(`/explorer/[networkSlug]/address/[address]`, {
								networkSlug,
								address,
							}),
						}
					},
	
					{
						label: 'Go ›',
						onClick: ({
							svelteKitRouteParams: { networkSlug } = {},
							signaturePacket: { untrustedData: { inputText: accountId } },
						}) => {
							if(accountId){
								return {
									toAppRoute: resolveRoute(`/explorer/[networkSlug]/address/[accountId]`, {
										networkSlug,
										accountId,
									})
								}
							}
						},
					},
				],
			},
		},
	}),

	{
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
