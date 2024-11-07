<script lang="ts">
	import * as echarts from 'echarts/core'

	import type {
		BarSeriesOption,
		LineSeriesOption,
		SunburstSeriesOption,
		TreemapSeriesOption
	} from 'echarts/charts'

	import {
		BarChart,
		LineChart,
		SunburstChart,
		TreemapChart
	} from 'echarts/charts'

	import type {
		TitleComponentOption,
		TooltipComponentOption,
		GridComponentOption,
		LegendComponentOption,
	} from 'echarts/components'

	import {
		DataZoomComponent,
		CalendarComponent,
		GridComponent,
		LegendComponent,
		TitleComponent,
		TimelineComponent,
		ToolboxComponent,
		TooltipComponent,
		VisualMapComponent
	} from 'echarts/components'

	import { SVGRenderer } from 'echarts/renderers'

	// import { UniversalTransition } from 'echarts/features'

	echarts.use([
		BarChart,
		LineChart,
		SunburstChart,
		TreemapChart,

		DataZoomComponent,
		CalendarComponent,
		GridComponent,
		LegendComponent,
		TitleComponent,
		TimelineComponent,
		ToolboxComponent,
		TooltipComponent,
		VisualMapComponent,

		SVGRenderer,

		// UniversalTransition
	])


	// import type { EChartsOption } from 'echarts/types/dist/shared'

	export let options: echarts.ComposeOption<
		& TitleComponentOption
		& TooltipComponentOption
		& GridComponentOption
		& LegendComponentOption
		& (
			| BarSeriesOption
			| LineSeriesOption
			| SunburstSeriesOption
			| TreemapSeriesOption
		)
	> // EChartsOption

	
	import { colorTheme } from '$/state/colorTheme'


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
