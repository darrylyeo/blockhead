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
			...(currency && {
				style: 'currency',
				currency
			}),

			...(showDecimalPlaces !== undefined && {
				minimumFractionDigits: showDecimalPlaces,
				maximumFractionDigits: showDecimalPlaces,
			}),

			useGrouping,

			...(compactLargeValues && (
				value >= 1e7 ?
					{
						notation: 'compact',
						compactDisplay: 'short',
						...(showDecimalPlaces !== undefined && {						
							minimumSignificantDigits: 1,
							maximumSignificantDigits: (Math.log10(value) % 3 + 1) + showDecimalPlaces,
						}),
					}
				: value >= 1e4 ?
					{
						notation: 'compact',
						compactDisplay: 'short',
						...(showDecimalPlaces !== undefined && {						
							minimumSignificantDigits: 1,
							maximumSignificantDigits: (Math.log10(value) % 3 + 1) + showDecimalPlaces,
						}),
					}
				:
					undefined
			)),
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
