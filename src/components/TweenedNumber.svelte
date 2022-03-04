<script lang="ts">
	import type { Tweened } from 'svelte/motion'
	import { expoOut, quintOut } from 'svelte/easing'


	export let value: number
	export let formatter: (number) => string
	export let showDecimalPlaces: number = 0

	export let tween = true
	export let duration = 500
	export let easing = quintOut // expoOut
	export let padZero = true


	let tweenedValue: Tweened<number | string>


	import { tweened } from 'svelte/motion'

	$: tweenedValue = tweened(0, {
		duration: tween ? duration : 0,
		delay: tween ? 1 : 0,
		easing,
		interpolate: (from, to) => t => {
			const logFrom = from != 0 ? Math.log10(from) : -showDecimalPlaces - 1
			const logTo = to != 0 ? Math.log10(to) : -showDecimalPlaces - 1
			const result = Math.round(Math.pow(10, logFrom + t * (logTo - logFrom)))
			return padZero && from == 0 ? result.toString().padStart(logTo + 1, '0') : result
		}
	})


	$: tweenedValue.set(value || 0)
</script>


<slot tweenedValue={$tweenedValue || 0}>
	{formatter ? formatter($tweenedValue) : $tweenedValue}
</slot>
