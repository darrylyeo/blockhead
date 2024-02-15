<script lang="ts">
	// Inputs
	export let value: number

	export let format: {
		currency?: string,
		showDecimalPlaces?: number,
		useGrouping?: boolean,
		compactLargeValues?: boolean,
		locale?: string | string[]
	} | undefined


	// Functions
	import { formatValue } from '$/utils/formatValue'


	// Styles
	const alignmentForPartType: Partial<Record<Intl.NumberFormatPartTypes, string>> = {
		'currency': 'align-end',
		'integer': 'type-integer align-end',
		'group': 'align-end',
		'compact': 'align-end',
		'decimal': 'align-start',
		'fraction': 'align-start',
	}
</script>


{#each formatValue(value, { ...format, toParts: true }) as part}
	<span
		class="row inline {alignmentForPartType[part.type] ?? 'align-end'}"
		data-part-type={part.type}
	>
		{part.value}
	</span>
{/each}


<style>
	.row {
		align-items: baseline;
		align-items: flex-end;
	}
	[data-part-type="fraction"],
	[data-part-type="group"],
	[data-part-type="decimal"],
	[data-part-type="integer"] ~ [data-part-type="integer"] {
		opacity: 0.66;
		font-size: 0.9em;
	}
</style>
