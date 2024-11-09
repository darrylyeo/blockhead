<script lang="ts" context="module">
	export type PriceScale = 'linear' | 'linearFromZero' | 'logarithmic'
</script>

<script lang="ts">
	// Types
	import type { QuoteCurrency } from '$/data/currencies'
	import type { CoinWithHistoricalPrices } from '$/data/coins'


	// Inputs
	export let coinsWithHistoricalPrices: CoinWithHistoricalPrices[]
	export let quoteCurrency: QuoteCurrency
	export let timeRange: [number, number]
	export let priceRange: [number, number]
	$: isMultiple = coinsWithHistoricalPrices.length > 1
	export let priceScale: PriceScale = 'logarithmic' // isMultiple ? 'logarithmic' : 'linear'


	// Functions
	import { formatValue } from '$/utils/formatValue'

	const formatTimestamp = (timestamp) => (
		new Date(timestamp).toLocaleDateString()
	)


	// Components
	import Echart from './Echart.svelte'


	// Styles
	import { tokenColors } from '$/data/tokenColors'
</script>


<Echart
	options={{
		grid: {
			left: 6,
			right: 60,
		},
		xAxis: {
			type: 'time',
			boundaryGap: false,
			splitNumber: 12,
			splitLine: {
				show: true,
				lineStyle: {
					color: 'hsla(0deg, 0%, 71%, 0.15)',
				},
			},
			// minorSplitLine: {},
		},
		yAxis: {
			...{
				'linear': {
					type: 'value',
					scale: true,
					min: 'dataMin',
					// max: 'dataMax',
				},
				'linearFromZero': {
					type: 'value',
					scale: false,
					min: 0,
					// max: 'dataMax',
				},
				'logarithmic': {
					type: 'log',
					logBase: 10,
					min: 'dataMin',
					max: 'dataMax',
					// minorTick: {
					// 	splitNumber: 2,
					// },
					// minorSplitLine: {
					// 	show: true,
					// 	lineStyle: {
					// 		color: 'hsla(0deg, 0%, 71%, 0.15)',
					// 	},
					// },
					splitNumber: 10,
				},
			}[priceScale],
			splitLine: {
				show: true,
				lineStyle: {
					color: 'hsla(0deg, 0%, 71%, 0.15)',
				},
			},
			boundaryGap: ['2%', '2%'],

			position: 'right',
			axisLabel: {
				formatter: value => formatValue(value, { currency: quoteCurrency }),
			},
		},
		series: (
			coinsWithHistoricalPrices
				?.map(coinWithHistoricalPrices => ({
					type: 'line',
					name: (
						'symbol' in coinWithHistoricalPrices.coin ?
							coinWithHistoricalPrices.coin.symbol
						: 'contractAddress' in coinWithHistoricalPrices.coin ?
							coinWithHistoricalPrices.coin.contractAddress
						:
							coinWithHistoricalPrices.coin.erc20Token.symbol
					),

					data: (
						coinWithHistoricalPrices
							.prices
							?.map(priceAtTime => [
								priceAtTime.time,
								priceAtTime.price,
							])
					),
					// data: prices,
					// encode: {
					// 	x: 'time',
					// 	y: 'price',
					// 	label: ['Time', 'Price'],
					// 	itemName: '???',
					// 	tooltip: ['price'],
					// },

					symbol: 'none',
					// symbol: `https://tokens.1inch.exchange/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png`,

					color: `var(--${tokenColors[coinWithHistoricalPrices.coin.symbol]}, var(--primary-color, hsla(0deg, 0%, 90%, 0.75)))`,
					areaStyle: isMultiple ? {
						color: 'transparent',
					} : {
						color: {
							type: 'linear',
							x: 0, y: 0,
							x2: 0, y2: 2,
							colorStops: [
								{
									offset: 0.05,
									color: `rgba(127, 127, 127, 0.25)`,
								},
								{
									offset: 1,
									color: `rgba(127, 127, 127, 0)`,
								},
							],
							// colorStops: [
							// 	{
							// 		offset: 0.05,
							// 		color: `var(--${tokenColors[coinWithHistoricalPrices.coin.symbol]}, var(--primary-color, hsla(0deg, 0%, 90%, 0.75)))`,
							// 	},
							// 	{
							// 		offset: 1,
							// 		color: 'transparent',
							// 	},
							// ],
						},
					},
					labelLayout: {
						moveOverlap: 'shiftY',
					},
					endLabel: {
						show: true,
						formatter: ({value: [time, price]}) => formatValue(price, { currency: quoteCurrency }),
						fontSize: 6,
						textBorderColor: 'transparent',
					},
					emphasis: {
						focus: 'series',
					},
				}))
		),
		tooltip: {
			trigger: 'axis',
			position: points => [points[0], points[1]],
			order: 'valueDesc',
			axisPointer: {
				type: 'cross',
			},
			symbol: 'circle',
		},
		axisPointer: {
			type: 'cross',
			link: {xAxisIndex: 'all'},
			label: {
				formatter: ({axisDimension, value}) =>
					axisDimension === 'x' ? formatTimestamp(value) :
					axisDimension === 'y' ? formatValue(value, { currency: quoteCurrency }) :
					'',
				backgroundColor: 'rgba(250, 250, 250, 0.5)',
			},
		},
		dataZoom: [{
			type: 'inside',
			start: 80,
			end: 100,
			// start: timeRange[0],
			// end: timeRange[1],
		}, {
			type: 'slider',
			start: 0,
			end: 100,
		}],
		legend: {
			left: 120,
			right: 120,
			top: 4,
			// type: 'scroll',
			// orient: 'vertical',
			// right: 10,
			// top: 20,
			// bottom: 20,
			// data: data.legendData,
			// selected: data.selected,
		},
		toolbox: [{
			feature: {
				magicType: {
					type: [
						'line',
						'bar',
						'stack',
					],
				},
			},
			x: 0,
		}, {
			feature: {
				dataZoom: {
					title: {
						zoom: 'Zoom Tool',
						back: 'Undo Zoom',
					},
					yAxisIndex: 'none',
				},
				restore: {
					title: 'Reset',
				},
				saveAsImage: {
					title: 'Save',
				},
			},
		}],
	}}
/>


<style>
	:global(.chart linearGradient > stop[offset="5%"]) {
		stop-color: var(--primary-color, hsla(0deg, 0%, 90%, 0.75));
	}

	:global(.chart linearGradient > stop[offset="100%"]) {
		stop-color: transparent;
	}
</style>
