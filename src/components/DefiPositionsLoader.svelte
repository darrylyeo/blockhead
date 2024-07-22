<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { Web3AppConfig } from '$/data/web3Apps'
	// import type { ZapperAppId, ZapperAppConfig } from '$/api/zapper-old'

	import { getViemPublicClient } from '$/data/networkProviders'
	import { DefiProvider, defiProviderIcons } from '$/data/defiProviders'
	import type { AppWithDefiPositions } from '$/data/defiPositions'

	import { supportedChains } from '$/api/defillama/llamafolio/index'


	// Inputs
	export let apps: Web3AppConfig[] | undefined
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let networkProvider: NetworkProvider
	export let publicClient: Ethereum.PublicClient | undefined
	export let defiProvider: DefiProvider = DefiProvider.Zapper
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider,
	})

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined


	// Internal state
	let appsWithPositions: AppWithDefiPositions[] | undefined

	let zapperFiatRates: Record<QuoteCurrency, number> | undefined
	// $: if(defiProvider === DefiProvider.Zapper && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	// let allZapperAppConfigs: Partial<Record<ZapperAppId, ZapperAppConfig>>
	// $: if(defiProvider === DefiProvider.Zapper)
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

				quoteTotalCurrency: defiProvider === DefiProvider.Zapper ? zapperQuoteCurrency : undefined
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
			status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
			loadingMessage: string,
			errorMessage: string,
		},
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeProtocolWithBalance as normalizeProtocolWithBalanceLlamafolio } from '$/api/defillama/llamafolio/normalize'

	import { getDefiPositions } from '$/api/zerion/defiSdk/index'
	import { normalizeDefiPositions as normalizeDefiPositionsZerion } from '$/api/zerion/defiSdk/normalize'

	// import { getAllApps, getDefiPositionsForApps } from '$/api/zapper-old/index'
	// import { normalizeDefiPositions as normalizeDefiPositionsZapper } from '$/api/zapper-old/normalize'

	import { normalizeAppBalance as normalizeAppBalanceZapper } from '$/api/zapper/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
		...loaderViewOptions,
	}}
	loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
	errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
	loadingIconName={defiProvider}
	loadingIcon={defiProviderIcons[defiProvider]}
	{...{
		[DefiProvider.LlamaFolio]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider,
					address,
				}],
				queryFn: async () => {
					const { getBalancesByAddress } = await import('$/api/defillama/llamafolio/index')

					return await getBalancesByAddress({
						address,
					})
				},
				select: result => (
					result
						.protocols
						.filter(protocol => protocol.id !== 'wallet')
						.filter(protocol => network ? supportedChains[protocol.chain] === network.chainId : true)
						.map(normalizeProtocolWithBalanceLlamafolio)
				),
				staleTime: 10 * 1000,
			})
		}),

		// [DefiProvider.Zapper]: () => ({
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

		[DefiProvider.Zapper]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider,
					address,
					chainId: network.chainId,
				}],
				queryFn: async ({
					queryKey: [_, {
						defiProvider,
						address,
						chainId,
					}],
				}) => {
					const { getAppBalances } = await import('$/api/zapper/index')

					return await getAppBalances({
						network,
						address,
					})
				},
				select: appBalances => (
					appBalances
						.filter(appBalance => apps ? apps.some(app => app.views.some(view => view.providers?.zapper === appBalance.appId)) : true)
						.map(normalizeAppBalanceZapper)
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
					address,
					chainId: network.chainId,
				}],
				queryFn: async () => (
					await getDefiPositions({
						...apps && {
							protocolNames: [...new Set(apps.flatMap(({views}) => views.flatMap(({providers}) => providers?.zerionDefiSDK ?? [])))],
						},
						network,
						publicClient,
						address,
					})
				),
				select: normalizeDefiPositionsZerion,
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
