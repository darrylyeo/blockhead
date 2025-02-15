<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { Web3AppConfig } from '$/data/web3Apps'
	// import type { ZapperAppId, ZapperAppConfig } from '$/api/zapper-old'

	import { DefiProvider, defiProviders } from '$/data/defiProviders'
	import type { AppWithDefiPositions } from '$/data/defiPositions'

	import { supportedChains } from '$/api/defillama/llamafolio/index'


	// Inputs
	export let apps: Web3AppConfig[] | undefined
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let networkProvider: NetworkProvider
	export let publicClient: Ethereum.PublicClient | undefined
	export let defiProvider: DefiProvider = DefiProvider.ZapperRest
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let loaderViewOptions: Partial<Loader['viewOptions']> | undefined


	// Internal state
	let appsWithPositions: AppWithDefiPositions[] | undefined

	let zapperFiatRates: Record<QuoteCurrency, number> | undefined
	// $: if(defiProvider === DefiProvider.ZapperRest && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	// let allZapperAppConfigs: Partial<Record<ZapperAppId, ZapperAppConfig>>
	// $: if(defiProvider === DefiProvider.ZapperRest)
	// 	getAllApps().then(_ => allZapperAppConfigs = Object.fromEntries(_.map(app => [app.id, app])))

	$: defiBalancesDescription = apps?.map(({name}) => name).join('/') || `${network.name} DeFi`


	// Outputs
	export let summary: {
		quoteTotal: number,
		defiAppsCount: number,
		quoteTotalCurrency: QuoteCurrency | undefined,
	} | undefined

	$: summary =
		appsWithPositions ? 
			{
				quoteTotal: appsWithPositions
					.flatMap(appWithPositions => appWithPositions.views)
					.map(view => (view.summary?.assets?.value ?? 0) - (view.summary?.debt?.value ?? 0))
					.reduce((sum, value) => sum + value, 0)
					* zapperFiatRate,

				defiAppsCount: appsWithPositions.length,

				quoteTotalCurrency: defiProvider === DefiProvider.ZapperRest ? zapperQuoteCurrency : undefined
			}
		:
			undefined
	
	type SharedSlotProps = {
		appsWithPositions: typeof appsWithPositions,
		summary: typeof summary,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			status: Loader['$$slot_def']['default']['status'],
			loadingMessage: string,
			errorMessage: string,
		},
	}


	// Functions
	import { createQuery, createQueries } from '@tanstack/svelte-query'

	import { normalizeProtocolWithBalance as normalizeProtocolWithBalanceLlamafolio } from '$/api/defillama/llamafolio/normalize'

	import { normalizeDefiPositions as normalizeDefiPositionsZerion } from '$/api/zerion/defiSdk/normalize'

	// import { getAllApps, getDefiPositionsForApps } from '$/api/zapper-old/index'
	// import { normalizeDefiPositions as normalizeDefiPositionsZapper } from '$/api/zapper-old/normalize'

	import { normalizeAppBalance as normalizeAppBalanceZapperGraphql } from '$/api/zapper/graphql/normalize'

	import { normalizeAppBalance as normalizeAppBalanceZapperRest } from '$/api/zapper/rest/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
		...loaderViewOptions,
	}}
	loadingMessage="Reading {defiBalancesDescription} balances from {defiProviders[defiProvider].name}..."
	errorMessage="Error getting {defiBalancesDescription} balances from {defiProviders[defiProvider].name}."
	loadingIconName={defiProvider}
	loadingIcon={defiProviders[defiProvider].icon}
	{...{
		[DefiProvider.LlamaFolio]: () => ({
			fromQuery: network && address && createQueries({
				queries: [
					{
						queryKey: ['DefiProtocols', {
							defiProvider,
						}],
						queryFn: async () => {
							const { getProtocols } = await import('$/api/defillama/llamafolio')

							return await getProtocols()
						},
					},
					{
						queryKey: ['DefiPositions', {
							defiProvider,
							address,
						}],
						queryFn: async ({
							queryKey: [_, {
								address,
							}],
						}) => {
							const { getBalancesByAddress } = await import('$/api/defillama/llamafolio')

							return await getBalancesByAddress({
								address,
							})
						},
						staleTime: 10 * 1000,
					},
				],
				
				combine: ([
					protocolsQuery,
					positionsQuery,
				]) => ({
					...positionsQuery,
					data: (
						positionsQuery.data
							?.protocols
							.filter(protocolWithPositions => protocolWithPositions.id !== 'wallet')
							.filter(protocolWithPositions => network ? supportedChains[protocolWithPositions.chain] === network.chainId : true)
							.map(protocolWithPositions => (
								normalizeProtocolWithBalanceLlamafolio(
									protocolWithPositions,
									protocolsQuery.data?.protocols
										.find(protocol => protocol.slug === protocolWithPositions.id)
								)
							))
					),
				}),
			}),
		}),

		[DefiProvider.ZapperGraphql]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { getAppBalances } = await import('$/api/zapper/graphql/index')

					return await getAppBalances({
						chainId,
						address,
					})
				},
				select: data => (
					data
						.portfolio
						.appBalances
						.map(normalizeAppBalanceZapperGraphql)
				),
				staleTime: 10 * 1000,
			}),
		}),

		// [DefiProvider.ZapperRest]: () => ({
		// 	fromStore: network && address && (() => (
		// 		getDefiPositionsForApps({
		// 			...apps && {
		// 				appIds: [...new Set(apps.flatMap(({ views }) => views.flatMap(({ providers }) => providers?.zapper ?? [])))]
		// 			},
		// 			network,
		// 			address,
		// 			asStore: true,
		// 		})
		// 	)),
		// 	then: defiBalances => (
		// 		normalizeDefiPositionsZapper(defiBalances, allZapperAppConfigs)
		// 	),
		// }),

		[DefiProvider.ZapperRest]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { getAppBalances } = await import('$/api/zapper/rest/index')

					return await getAppBalances({
						chainId,
						address,
					})
				},
				select: appBalances => (
					appBalances
						.filter(appBalance => apps ? apps.some(app => app.views.some(view => view.providers?.zapper === appBalance.appId)) : true)
						.map(normalizeAppBalanceZapperRest)
				),
				staleTime: 10 * 1000,
			}),
		}),

		[DefiProvider.ZerionDefiSdk]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider,
					...apps && {
						apps: apps.map(app => app.slug),
					},
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { getViemPublicClient } = await import('$/data/networkProviders')
					const { getDefiPositions } = await import('$/api/zerion/defiSdk/index')

					const publicClient = network && getViemPublicClient({
						network,
						networkProvider,
					})

					return await getDefiPositions({
						...apps && {
							protocolNames: [...new Set(apps.flatMap(({views}) => views.flatMap(({providers}) => providers?.zerionDefiSDK ?? [])))],
						},
						chainId,
						publicClient,
						address,
					})
				},
				select: positions => (
					normalizeDefiPositionsZerion(positions, network.chainId)
				),
				staleTime: 10 * 1000,
			})
		}),
	}[defiProvider]?.()}
	bind:result={appsWithPositions}
	let:result={appsWithPositions}
>
	<svelte:fragment slot="header"
		let:result={appsWithPositions}
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header"
			{appsWithPositions}
			{summary}
			{status} {loadingMessage} {errorMessage}
		/>
	</svelte:fragment>

	<slot
		{appsWithPositions}
		{summary}
	/>
</Loader>
