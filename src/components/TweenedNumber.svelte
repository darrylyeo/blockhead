<script lang="ts">
	import type { Tweened } from 'svelte/motion'
	import { expoOut, quintOut } from 'svelte/easing'


	export let value: number

	// Formatting
	export let format: {
		currency?: string,
		showDecimalPlaces?: number,
		useGrouping?: boolean,
		compactLargeValues?: boolean,
		locale?: string | string[]
	}
	export let showDecimalPlaces: number = 0
	export let padZero = true
	export let formatParts = true

	// Number tweening animation
	export let tween = true
	export let duration = 1000
	export let easing = quintOut // expoOut
	
	// Container animation
	export let clip = true
	export let transitionWidth = true
	export let sizeDuration = 500


	let tweenedValue: Tweened<number | string>


	import { formatValue } from '$/utils/formatValue'

	const indexParts = (parts: Intl.NumberFormatPart[]) => {
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
		] as {
			key: string,
			align: 'start' | 'end',
			part: Intl.NumberFormatPart,
		}[]
	}


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


<InlineContainer
	{transitionWidth}
	duration={sizeDuration}
	{clip}
	containerClass="align-end"
>
	{#if formatParts}
		{#each indexParts(formatValue($tweenedValue, { ...format, toParts: true })) as { key, part, align } (key)}
			<InlineContainer
				{transitionWidth}
				duration={sizeDuration}
				class="type-{part.type}"
				containerClass="part align-{align}"
				{clip}
			>
				{part.value}
			</InlineContainer>
		{/each}
	{:else}
		{formatValue($tweenedValue, { ...format })}
	{/if}
</InlineContainer>


<style>
	:global(:is(
		.type-fraction,
		.type-group,
		.type-decimal,
		.type-integer ~ .type-integer
	)) {
		opacity: 0.66;
		font-size: 0.9em;
	}
</style>