<script lang="ts">
	import * as echarts from 'echarts/core'
	import { BarChart, LineChart } from 'echarts/charts'
	import { DataZoomComponent, CalendarComponent, GridComponent, LegendComponent, TitleComponent, TimelineComponent, ToolboxComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
	import { SVGRenderer } from 'echarts/renderers'
	echarts.use([
		BarChart, LineChart,
		DataZoomComponent, CalendarComponent, GridComponent, LegendComponent, TitleComponent, TimelineComponent, ToolboxComponent, TooltipComponent, VisualMapComponent,
		SVGRenderer
	])

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
		try {
			chart.setOption(options)
		}catch(e){
			console.error(e)
		}
	
	import { onDestroy } from 'svelte'
	onDestroy(() => chart?.dispose())
</script>

<style>
	.chart {
		width: 100%;
		min-height: var(--echart-height, 35rem);
		max-height: 90vh;
		font-size: 0.85em;
	}

	.chart :global(*) {
		font-family: inherit !important;
	}
</style>

<div class="chart" bind:this={chartContainer}></div>