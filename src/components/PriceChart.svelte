<script lang="ts">
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	
	type TimePrice = {
		time: number,
		price: number
	}
	type TimePricesForCurrency = {
		currency: TickerSymbol,
		prices: TimePrice[]
	}

	export let data: TimePricesForCurrency[]
	export let quoteCurrency: QuoteCurrency
	export let timeRange: [number, number]
	export let priceRange: [number, number]

	export let priceScale: 'linear' | 'linearFromZero' | 'logarithmic' = 'linear'

	function formatTimestamp(timestamp){
		return new Date(timestamp).toLocaleDateString()
	}

	function formatCurrency(value){
		const showDecimalPlaces = 2 + Math.round(Math.log10(value || 1))
		return new Intl.NumberFormat(globalThis.navigator.languages, {
			style: 'currency',
			currency: quoteCurrency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value)
	}

	import Echart from './Echart.svelte'

	import { tokenColors } from '../data/token-colors'
</script>

<Echart options={{
	grid: {
		left: 6,
		right: 60,
	},
	xAxis: {
		type: 'time',
		boundaryGap: false,
		splitNumber: 12,
		splitLine: {
			show: true
		},
		minorSplitLine: {}
	},
	yAxis: {
		...{
			'linear': {
				type: 'value',
				scale: true,
				// min: 'dataMin',
				// max: 'dataMax'
			},
			'linearFromZero': {
				type: 'value',
				scale: false,
				// min: 0,
				// max: 'dataMax'
			},
			'logarithmic': {
				type: 'log',
				logBase: 10,
				min: 'dataMin',
				max: 'dataMax',
				minorSplitLine: {
					show: true,
				},
				splitNumber: 10
			}
		}[priceScale],
		boundaryGap: ['2%', '2%'],

		position: 'right',
		axisLabel: {
			formatter: value => formatCurrency(value),
		},
	},
	series: data?.map(({currency, prices}) => ({
		type: 'line',
		name: currency,

		data: prices.map(({time, price}) => [time, price]),
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
		
		color: `var(--${tokenColors[currency]})`,
		areaStyle: {
			color: {
				type: 'linear',
				x: 0, y: 0,
				x2: 0, y2: 2,
				colorStops: [{
					offset: 0.05,
					color: `var(--${tokenColors[currency]})`
				}, {
					offset: 1,
					color: 'transparent'
				}]
			}
		},
		labelLayout: {
			moveOverlap: 'shiftY'
		},
		endLabel: {
			show: true,
			formatter: ({value: [time, price]}) => formatCurrency(price),
			textBorderColor: 'transparent'
		},
		emphasis: {
			focus: 'series'
		},
	})),
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
				axisDimension === 'y' ? formatCurrency(value) :
				'',
			backgroundColor: 'rgba(250, 250, 250, 0.5)'
		}
	},
	dataZoom: [{
		type: 'inside',
		start: 95,
		end: 100
		// start: timeRange[0],
		// end: timeRange[1]
	}, {
		type: 'slider',
		start: 0,
		end: 100
	}],
	legend: {
		left: 120,
		right: 120,
		top: 4
	},
	toolbox: [{
		feature: {
			magicType: {
				type: [
					'line',
					'bar',
					'stack'
				]
			},
		},
		x: 0
	}, {
		feature: {
			dataZoom: {
				title: {
					zoom: 'Zoom Tool',
					back: 'Undo Zoom'
				},
				yAxisIndex: 'none'
			},
			restore: {
				title: 'Reset'
			},
            saveAsImage: {
				title: 'Save'
			}
		}
	}]
}} />

<div class="bar">
	<h4>Show</h4>
	<label>
		<span>Price Scale</span>
		<select bind:value={priceScale}>
			<option value="logarithmic">Logarithmic</option>
			<option value="linear">Linear</option>
			<option value="linearFromZero">Linear From Zero</option>
		</select>
	</label>
</div>