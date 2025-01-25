<script lang="ts">
	// Inputs
	export let bytesCount: number | bigint
	export let format: Parameters<typeof formatByteCount>[1] | undefined = {
		showDecimalPlaces: 2,
	}


	// Functions
	import { formatByteCount } from '$/utils/formatByteCount'


	// Internal state
	$: (
		[value, units] = (
			formatByteCount(
				bytesCount,
				format
			)
				.split(' ')
		)
	)


	// Components
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<span title={`${bytesCount} bytes`}
	><TweenedNumber
		value={Number(value)}
		{format}
	/>
	{units
}</span>
