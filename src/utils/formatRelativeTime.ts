const units = [
	['year', 31536000000],
	['month', 2628000000],
	['day', 86400000],
	['hour', 3600000],
	['minute', 60000],
	['second', 1000],
] as const

export const formatRelativeTime = (d1: number, d2: number = Date.now(), style: 'long' | 'short' | 'narrow' = 'short', resolution = 6) => {
	let elapsed = Math.abs(d1 - d2)
	const sign = Math.sign(d1 - d2)

	if(elapsed < 1000) return 'just now'

	const result = []
	for (const [unit, amount] of units)
		if (Math.abs(elapsed) >= amount){
			result.push(
				new Intl.RelativeTimeFormat('en', { style }).format(sign * Math.floor(elapsed / amount), unit)
			)

			if(--resolution === 0)
				break
			
			elapsed %= amount
		}

	return [...result.slice(0, -1).map(string => string.replace(/ [^ ]+?$/, '')), result[result.length - 1]].join(', ').replace(/\./g, '')
}