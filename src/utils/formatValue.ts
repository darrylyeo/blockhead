export const formatValue = <
	ToParts extends boolean = false,
>(
	value: number,
	{
		currency,
		showDecimalPlaces, // = 3,
		useGrouping = true,
		compactLargeValues = false,
		locale,
		toParts,
	}: {
		currency?: string,
		showDecimalPlaces?: number,
		useGrouping?: boolean,
		compactLargeValues?: boolean,
		locale?: string | string[],
		toParts?: ToParts,
	} = {},
) => {
	try {
		const formatter = new Intl.NumberFormat(locale || globalThis.navigator?.languages as string[], {
			... currency ? {style: 'currency', currency} : {},
			// minimumFractionDigits: 2,
			// minimumSignificantDigits: value < 1 ? 3 : undefined,
			// maximumSignificantDigits: value < 1 ? 3 : undefined,

			... showDecimalPlaces !== undefined ? {
				minimumFractionDigits: showDecimalPlaces,
				maximumFractionDigits: showDecimalPlaces,
			} : {},

			// maximumSignificantDigits: 6,
			// compactDisplay: 'short',
			useGrouping,
			notation: compactLargeValues && value >= 1e7 ? 'compact' : 'standard'
		})

		return (
			toParts
				? formatter.formatToParts(value)
				: formatter.format(value)
			) as (
				ToParts extends true
					? Intl.NumberFormatPart[]
					: string
			)
	}catch(e){
		// console.error(e)

		return (
			toParts
				? [{type: 'integer', value: value?.toString()}] as Intl.NumberFormatPart[]
				: value?.toString()
		) as (
			ToParts extends true
				? Intl.NumberFormatPart[]
				: string
		)
	}
}