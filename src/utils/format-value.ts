export function formatValue(value: number, currency?: string, showDecimals = 3, compactLargeValues = false){
	try {
		return globalThis.navigator
			? new Intl.NumberFormat(globalThis.navigator.languages, {
				... currency ? {style: 'currency', currency} : {},
				// minimumFractionDigits: 2,
				// minimumSignificantDigits: value < 1 ? 3 : undefined,
				// maximumSignificantDigits: value < 1 ? 3 : undefined,

				// minimumFractionDigits: showDecimals,
				// maximumFractionDigits: showDecimals,

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