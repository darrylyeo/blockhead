<script lang="ts">
	// Inputs
	export let date: number | string | Date

	// (View options)
	export let format: 'absolute' | 'relative' | 'both' = 'both'
	export let layout: 'horizontal' | 'vertical' = 'vertical'
	export let showTime = true
	export let updateInterval = 1000


	// Functions
	import { formatRelativeTime } from '$/utils/formatRelativeTime'


	// Internal state
	$: dateObject = date instanceof Date ? date : new Date(date)
	$: relativeTime = formatRelativeTime(dateObject.getTime())


	// Actions
	import { onDestroy } from 'svelte'

	let isMounted = true
	onDestroy(() => isMounted = false)

	if(format !== 'absolute') (async () => {
		while(isMounted){
			dateObject = dateObject
			await new Promise(resolve => setTimeout(resolve, updateInterval))
		}
	})()
</script>


<style>
	.layout-vertical, .layout-vertical .absolute:only-child {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}
	.layout-vertical .time {
		font-size: 0.8em;
	}
</style>


{#if date}
	<time class="date" datetime={dateObject.toISOString()}>
		<abbr class="layout-{layout}" title="{dateObject.toISOString()}">
			{#if format === 'relative' || format === 'both'}
				<span class="relative">{relativeTime}</span>
			{/if}
			{#if format === 'absolute' || format === 'both'}
				<span class="absolute">
					{#if format === 'both' && layout === 'horizontal'}({/if}<span class="day">{dateObject.toLocaleDateString()}</span>
					{#if showTime}<span class="time">{dateObject.toLocaleTimeString()}</span>{/if}{#if format === 'both' && layout === 'horizontal'}){/if}
				</span>
			{/if}
		</abbr>
	</time>
{/if}
