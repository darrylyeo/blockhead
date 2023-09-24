<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { UniswapV3 } from '../api/uniswap-v3/index'


	// Context
	import { preferences } from '../state/preferences'

	
	// Inputs
	export let address: Ethereum.Address

	export let dataProvider: UniswapV3.DataProvider
	export let network: Ethereum.Network | undefined
	export let networkProvider: NetworkProvider
	
	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`
	$: viaDataProvider = dataProvider === UniswapV3.DataProvider.RpcProvider ? viaRPC : ` via ${dataProvider}`


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
	import { UniswapV3Subgraph } from '../api/uniswap-v3/subgraph'
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { gql } from '@urql/svelte'


	// Components
	import Loader from './Loader.svelte'
	import { TheGraphIcon } from '../assets/icons'
</script>


<Loader
	loadingMessage="Loading Uniswap V3 positions{viaDataProvider}..."
	errorMessage="Couldn't load Uniswap V3 positions{viaDataProvider}."
	{...{
		[UniswapV3.DataProvider.RpcProvider]: {

		},

		[UniswapV3.DataProvider.TheGraph]: {
			fromInfiniteQuery: network && createInfiniteQuery({
				queryKey: ['UniswapV3Positions', {
					address,
					chainId: network.chainId,
					dataProvider,
				}],
				queryFn: async ({ pageParam: skip }) => (
					await UniswapV3Subgraph.getClient({ network })
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
									}
								}
							}
						`, {
							address,
							skip,
						})
				),
				getNextPageParam: (lastPage, allPages) => lastPage.data.length ? allPages.length * 100 : undefined,
			}),
			then: (result) => result.pages.flatMap(page => page.data.positions)
		},
	}[dataProvider]}
	{...$$restProps}
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
