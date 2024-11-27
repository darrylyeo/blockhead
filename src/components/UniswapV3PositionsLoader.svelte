<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { NetworkProvider } from '$/data/networkProviders/types'
	import { UniswapV3 } from '$/api/uniswap-v3/index'


	// Context
	import { preferences } from '$/state/preferences'

	
	// Inputs
	export let address: Ethereum.Address

	export let dataProvider: UniswapV3.DataProvider
	export let network: Ethereum.Network | undefined
	export let networkProvider: NetworkProvider
	
	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`
	$: viaDataProvider = dataProvider === UniswapV3.DataProvider.RpcProvider ? viaRPC : ` via ${dataProvider}`

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined


	// Outputs
	export let positions: UniswapV3.Position[]

	type SharedSlotProps = {
		positions: typeof positions,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { gql } from '@urql/svelte'


	// Components
	import Loader from './Loader.svelte'
	import { TheGraphIcon } from '$/assets/icons'
</script>


<Loader
	viewOptions={loaderViewOptions}
	loadingMessage="Loading Uniswap V3 positions{viaDataProvider}..."
	loadingIcon={{
		[UniswapV3.DataProvider.TheGraph]: TheGraphIcon,
	}[dataProvider]}
	errorMessage="Couldn't load Uniswap V3 positions{viaDataProvider}."
	{...{
		[UniswapV3.DataProvider.RpcProvider]: () => ({

		}),

		[UniswapV3.DataProvider.TheGraph]: () => ({
			fromInfiniteQuery: network && createInfiniteQuery({
				queryKey: ['UniswapV3Positions', {
					address,
					chainId: network.chainId,
					dataProvider,
				}],
				queryFn: async ({ pageParam: skip }) => {
					const { UniswapV3Subgraph } = await import('$/api/uniswap-v3/subgraph')

					return await UniswapV3Subgraph.getClient({ network })
						.query(gql`
							query(
								$address: Bytes,
								$skip: Int = 0
							) {
								positions(
									where: { account_: { id: $address } },
									skip: $skip,
								) {
									id
									hashOpened
									hashClosed
									blockNumberOpened
									timestampOpened
									blockNumberClosed
									timestampClosed
									liquidityTokenType
									liquidity
									liquidityUSD
									cumulativeDepositUSD
									cumulativeWithdrawUSD
									cumulativeDepositTokenAmounts
									cumulativeRewardUSD
									cumulativeWithdrawTokenAmounts
									depositCount
									withdrawCount
									pool {
										id
										name
										symbol
										liquidityTokenType
										isSingleSided
										createdTimestamp
										createdBlockNumber
										tick
										totalValueLockedUSD
										totalLiquidity
										totalLiquidityUSD
										activeLiquidity
										activeLiquidityUSD
										cumulativeSupplySideRevenueUSD
										cumulativeProtocolSideRevenueUSD
										cumulativeTotalRevenueUSD
										cumulativeVolumeUSD
										stakedOutputTokenAmount
										cumulativeDepositCount
										cumulativeWithdrawCount
										cumulativeSwapCount
										positionCount
										openPositionCount
										closedPositionCount
										lastSnapshotDayID
										lastSnapshotHourID
										lastUpdateTimestamp
										lastUpdateBlockNumber
										cumulativeVolumeByTokenAmount
										cumulativeVolumeByTokenUSD
										inputTokenBalances
										inputTokenBalancesUSD
										inputTokenWeights
										uncollectedProtocolSideTokenAmounts
										uncollectedProtocolSideValuesUSD
										uncollectedSupplySideTokenAmounts
										uncollectedSupplySideValuesUSD
										rewardTokenEmissionsUSD
										liquidityToken {
											_largePriceChangeBuffer
											_largeTVLImpactBuffer
											_lastPricePool
											_totalSupply
											_totalValueLockedUSD
											decimals
											id
											lastPriceBlockNumber
											lastPriceUSD
											name
											symbol
										}
										inputTokens {
											_largePriceChangeBuffer
											_largeTVLImpactBuffer
											_lastPricePool
											_totalSupply
											_totalValueLockedUSD
											decimals
											id
											lastPriceBlockNumber
											lastPriceUSD
											name
											symbol
										}
										fees {
											feeType	
											feePercentage
										}
									}
								}
							}
						`, {
							address,
							skip,
						})
				},
				getNextPageParam: (lastPage, allPages) => lastPage.data.length ? allPages.length * 100 : undefined,
				select: result => (
					result.pages.flatMap(page => page.data.positions)
						.map(position => ({
							pool: {
								token0: position.pool.inputTokens[0],
								token1: position.pool.inputTokens[1],
								fee: position.pool.fees.find(fee => fee.feeType === 'FIXED_TRADING_FEE').feePercentage * 10000,
								contract: {
									address: position.pool.id,
									name: position.pool.name,
									symbol: position.pool.symbol,
								},
							},
							// tickLower: ,
							// tickUpper: ,
							token0Amount: position.inputTokenBalances?.[0],
							token1Amount: position.inputTokenBalances?.[1],
							token0BalanceUsd: position.inputTokenBalancesUSD?.[0],
							token1BalanceUsd: position.inputTokenBalancesUSD?.[1],
							cumulativeDepositUSD: position.cumulativeDepositUSD,
							cumulativeWithdrawUSD: position.cumulativeWithdrawUSD,
							cumulativeRewardUSD: position.cumulativeRewardUSD,
							hashOpened: position.hashOpened,
							hashClosed: position.hashClosed,
						}))
				),
			}),
		}),
	}[dataProvider]?.()}
	bind:result={positions}
	let:result={positions}
>
	<svelte:fragment slot="header"
		let:result={positions}
		let:isOpen let:toggle
	>
		<slot name="header"
			{positions}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {positions} />
</Loader>
