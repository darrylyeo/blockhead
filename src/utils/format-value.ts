export function formatValue(value: number, currency?: string, showDecimals = 3){
	try {
		return globalThis.navigator
			? new Intl.NumberFormat(globalThis.navigator.languages, {
				... currency ? {style: 'currency', currency} : {},
				// minimumFractionDigits: 2,
				// minimumSignificantDigits: value < 1 ? 3 : undefined,
				// maximumSignificantDigits: value < 1 ? 3 : undefined,
				minimumFractionDigits: showDecimals,
				maximumFractionDigits: showDecimals,
			}).format(value)
			: value
	}catch(e){
		console.error(e)
		return value?.toString()
	}
}