<script lang="ts">
	import type { Tweened } from 'svelte/motion'
	import { expoOut, quintOut } from 'svelte/easing'


	export let value: number
	export let format: {
		currency?: string,
		showDecimalPlaces?: number,
		compactLargeValues?: boolean,
		locale?: string | string[]
	}
	export let showDecimalPlaces: number = 0
	export let padZero = true
	export let formatParts = true

	export let tween = true
	export let duration = 1000
	export let sizeDuration = tween ? 500 : 0
	export let easing = quintOut // expoOut

	export let clip = true


	let tweenedValue: Tweened<number | string>


	import { formatValue } from '../utils/formatValue'


	import { tweened } from 'svelte/motion'

	$: tweenedValue = tweened(0, {
		duration: tween ? duration : 0,
		delay: tween ? 1 : 0,
		easing,
		interpolate: (from, to) => t => {
			const logFrom = from != 0 ? Math.log10(from) : -showDecimalPlaces - 1
			const logTo = to != 0 ? Math.log10(to) : -showDecimalPlaces - 1
			const result = Math.round(Math.pow(10, logFrom + t * (logTo - logFrom)))
			// const result = Math.pow(10, logFrom + t * (logTo - logFrom))
			return padZero && from == 0 ? result.toString().padStart(logTo + 1, '0') : result
		}
	})

	$: tweenedValue.set(value || 0)


	import InlineContainer from './InlineContainer.svelte'
</script>


<InlineContainer contentsOnly={sizeDuration === 0} duration={sizeDuration} {clip}>
	{#if formatParts}
		{#each formatValue($tweenedValue, { ...format, toParts: true }) as { type, value }}
			<InlineContainer contentElementOnly={sizeDuration === 0}
				duration={sizeDuration}
				class="type-{type}"
				containerClass={{
					'currency': 'align-end',
					'integer': 'align-end',
					'group': 'align-end',
					'compact': 'align-end',
					'decimal': 'align-start',
					'fraction': 'align-start',
				}[type] ?? 'align-end'}
				{clip}
			>
				{value}
			</InlineContainer>
		{/each}
	{:else}
		{formatValue($tweenedValue, { ...format })}
	{/if}
</InlineContainer>


<style>
	:global(.type-fraction) {
		opacity: 0.66;
		font-size: 0.9em;
	}
</style>