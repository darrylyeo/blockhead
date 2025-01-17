<script lang="ts">
	// Inputs
	export let date: number | string | Date

	// (View options)
	export let format: 'absolute' | 'relative' | 'relative-absolute' | 'absolute-relative' = 'relative-absolute'
	export let layout: 'horizontal' | 'vertical' = 'horizontal'
	export let showTime = true
	export let updateInterval = 1000


	// Functions
	import { formatRelativeTime } from '$/utils/formatRelativeTime'


	// Internal state
	$: dateObject = date instanceof Date ? date : new Date(date)
	$: isoString = dateObject.toISOString()
	$: relativeTime = formatRelativeTime(dateObject.getTime())
	$: absoluteDate = dateObject.toLocaleDateString(globalThis?.navigator.languages)
	$: absoluteTime = dateObject.toLocaleTimeString(globalThis?.navigator.languages, { timeZoneName: 'short' })

	$: parts = (
		(
			{
				'relative': ['relative'],
				'absolute': ['absolute'],
				'relative-absolute': ['relative', 'absolute'],
				'absolute-relative': ['absolute', 'relative'],
			} as const
		)
		[format]
	)


	// Actions
	import { onMount } from 'svelte'

	onMount(() => {
		if (format === 'absolute') return

		const interval = setInterval(() => {
			dateObject = dateObject
		}, updateInterval)

		return () => {
			clearInterval(interval)
		}
	})


	// Transitions/animations
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


{#if date}
	<time
		datetime={isoString}
	>
		<abbr
			data-layout={layout}
			title={isoString}
			class={layout === 'horizontal' ? 'row inline align-baseline' : 'column inline'}
		>
			{#each parts as part, i (part)}
				<span
					data-part={part}
					animate:flip={{ duration: 300, easing: expoOut }}
				>
					{#if layout === 'horizontal' && i > 0}<span>(</span>{/if
					}{#if part === 'relative'}
						{relativeTime
					}{:else}
						<span class="date">{absoluteDate}</span
						>{#if showTime}
							{' '}<span class="time">{absoluteTime}</span
						>{/if
					}{/if
					}{#if layout === 'horizontal' && i > 0}<span>)</span>{/if}
				</span>
			{/each}
		</abbr>
	</time>
{/if}


<style>
	abbr {
		&[data-layout="vertical"] {
			[data-part="absolute"]:only-child {
				display: flex;
				flex-direction: column;
			}

			.time {
				font-size: 0.8em;
			}
		}

		> span {
			transition-property:
				font-size,
				opacity
			;

			&:nth-of-type(2) {
				font-size: 0.8em;
				opacity: 0.8;
			}
		}
	}
</style>
