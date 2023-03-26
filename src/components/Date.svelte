<script lang="ts">
	export let date: number | string | Date


	export let format: 'absolute' | 'relative' | 'both' = 'both'
	export let layout: 'horizontal' | 'vertical' = 'vertical'
	export let showTime = true
	export let updateInterval = 1000


	$: dateObject = new Date(date)


	import { onDestroy } from 'svelte'

	let isMounted = true
	onDestroy(() => isMounted = false)

	if(format !== 'absolute') (async () => {
		while(isMounted){
			dateObject = new Date(date)
			await new Promise(resolve => setTimeout(resolve, updateInterval))
		}
	})()


	import { formatRelativeTime } from '../utils/formatRelativeTime'

	$: relativeTime = formatRelativeTime(dateObject)
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
