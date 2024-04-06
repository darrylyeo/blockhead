<script lang="ts">
	// Types
	import type { Tweened } from 'svelte/motion'
	import { quintOut } from 'svelte/easing'


	// Inputs
	export let value: number

	// (Voew options)
	export let format: {
		currency?: string,
		showDecimalPlaces: number,
		useGrouping?: boolean,
		compactLargeValues?: boolean,
		locale?: string | string[]
	} = {
		showDecimalPlaces: 0,
	}
	export let padZero = true
	export let formatParts = true

	// Number tweening animation
	export let tween = true
	export let duration = 1000
	export let easing = quintOut // expoOut
	
	// Container animation
	export let clip = true
	export let sizeDuration = 500



	// Functions
	import { formatValue } from '$/utils/formatValue'

	const indexParts = (parts: Intl.NumberFormatPart[]): {
		key: string,
		align: 'start' | 'end',
		part: Intl.NumberFormatPart,
	}[] => {
		const decimalIndex = parts.findIndex(part => part.type === 'decimal')
		const partsLeft = decimalIndex === -1 ? parts : parts.slice(0, decimalIndex)
		const partsRight = decimalIndex === -1 ? [] : parts.slice(decimalIndex)

		const indexByType: Partial<Record<Intl.NumberFormatPartTypes, number>> = {}

		return [
			...partsLeft
				.reverse()
				.map(part => {
					indexByType[part.type] ??= 0

					return ({
						key: `left-${part.type}-${indexByType[part.type]!++}`,
						align: 'end',
						part,
					})
				})
				.reverse(),

			...partsRight
				.map(part => {
					indexByType[part.type] ??= 0

					return ({
						key: `right-${part.type}-${indexByType[part.type]!++}`,
						align: 'start',
						part,
					})
				})
		]
	}


	// Internal state
	import { tweened } from 'svelte/motion'

	let tweenedValue: Tweened<number>

	$: tweenedValue = tweened(0, {
		duration: tween ? duration : 0,
		delay: tween ? 1 : 0,
		easing,
		interpolate: (from, to) => t => {
			const logFrom = from != 0 ? Math.log10(from) : -format.showDecimalPlaces - 1
			const logTo = to != 0 ? Math.log10(to) : -format.showDecimalPlaces - 1
			const result = Math.pow(10, logFrom + t * (logTo - logFrom))
			return to >= 100 && t < 0.9994
				? from < to ? Math.floor(result) : Math.ceil(result)
				: result
			// return padZero && from == 0 ? result.toString().padStart(logTo + 1, '0') : result
		}
	})

	$: tweenedValue.set(value || 0)


	import SizeContainer from './SizeContainer.svelte'
</script>


<span class="tweened-number">
	{#if formatParts}
		{#each indexParts(formatValue($tweenedValue, { ...format, toParts: true })) as { key, part, align } (key)}
			<SizeContainer
				layout="inline"
				{clip}
				alignInline={align}
				duration={sizeDuration}
				containerProps={{
					'data-number-part-type': part.type,
				}}
			>
				{part.value}
			</SizeContainer>
		{/each}
	{:else}
		{formatValue($tweenedValue, { ...format })}
	{/if}
</span>


<style>
	:global(.tweened-number [data-number-part-type]) {
		transition: opacity 0.3s, font-size 0.3s;
	}
	:global(.tweened-number :is(
		[data-number-part-type="fraction"],
		[data-number-part-type="group"],
		[data-number-part-type="decimal"],
		[data-number-part-type="integer"] ~ [data-number-part-type="integer"]
	)) {
		opacity: 0.66;
		font-size: 0.9em;
	}
</style>
