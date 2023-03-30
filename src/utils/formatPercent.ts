export const formatPercent = (number: number, maxDecimals = 2) => (
	new Intl.NumberFormat(globalThis.navigator.languages, {
		minimumFractionDigits: maxDecimals,
		maximumFractionDigits: maxDecimals
	}).format(Number(number) * 100) + '%'
)
