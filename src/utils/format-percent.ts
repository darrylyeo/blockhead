export function formatPercent(number, maxDecimals = 2){
    return new Intl.NumberFormat(globalThis.navigator.languages, {
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals
    }).format(number * 100) + '%'
}