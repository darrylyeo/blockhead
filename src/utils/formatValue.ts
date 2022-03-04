export const formatValue = (
	value: number,
	{
		currency,
		showDecimalPlaces, // = 3,
		compactLargeValues = false,
		locale = globalThis.navigator.languages as string[],
	}: {
		currency?: string,
		showDecimalPlaces?: number,
		compactLargeValues?: boolean,
		locale?: string | string[]
	}
) => {
	try {
		return globalThis.navigator
			? new Intl.NumberFormat(locale, {
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
				// useGrouping: true,
				notation: compactLargeValues && value >= 1e7 ? 'compact' : 'standard'
			}).format(value)
			: value
	}catch(e){
		console.error(e)
		return value?.toString()
	}
}