<script lang="ts">
	import * as echarts from 'echarts'
	import { colorTheme } from '../data/color-theme'

	export let options

	let chartContainer
	let chart: echarts.ECharts

	$: if(chartContainer){
		chart?.dispose()

		chart = echarts.init(chartContainer, $colorTheme, {renderer: 'svg'})
		chart.setOption({
			backgroundColor: 'none',
			textStyle: {
				fontFamily: 'inherit',
			},
		})
	}

	$: if(chart)
		chart.setOption(options)
	
	import { onDestroy } from 'svelte'
	onDestroy(() => chart?.dispose())
</script>

<style>
	.chart {
		width: 100%;
		min-height: 35rem;
		max-height: 90vh;
		font-size: 0.85em;
	}

	.chart :global(*) {
		font-family: inherit !important;
	}
</style>

<div class="chart" bind:this={chartContainer}></div>