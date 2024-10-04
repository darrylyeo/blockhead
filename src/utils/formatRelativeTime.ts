// Constants
export const timeUnits = {
	year: 365 * 24 * 60 * 60 * 1000,
	month: 30 * 24 * 60 * 60 * 1000,
	week: 7 * 24 * 60 * 60 * 1000,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
} as const satisfies Partial<Record<Intl.RelativeTimeFormatUnit, number>>


/**
 * Given a literal part value from `Intl.RelativeTimeFormat.formatToParts`,
 * split into time unit and "past"/"future" words/symbols
 */
const parseLiteral = (literal: string): { type: 'literal', literalType: 'unit' | 'future' | 'past', value: string }[] => {
	const regex = /(?<future>(?<fr_ru_future>^[+])|(?<en_de_future>^in )|(?<es_future>^dentro de )|(?<zh_future>后$)|(?<ja_future>後$)|(?<ko_future>후$)|(?<tr_future>[.]? önce$)|(?<pt_future>^em ))|(?<past>(?<fr_ru_past>^[-])|(?<en_past>[.]? ago$)|(?<es_past>^hace )|(?<zh_ja_past>前$)|(?<ko_past>전$)|(?<tr_past>[.]? önce$)|(?<de_past>^vor )|(?<pt_past>^há ))/g

	const parts: ReturnType<typeof parseLiteral> = []
	let lastIndex = 0
	let match

	while ((match = regex.exec(literal)) !== null) {
		if (match.index > lastIndex)
			parts.push({ type: 'literal', literalType: 'unit', value: literal.slice(lastIndex, match.index) })

		if(match.groups?.future)
			parts.push({ type: 'literal', literalType: 'future', value: match.groups.future })
		else if(match.groups?.past)
			parts.push({ type: 'literal', literalType: 'past', value: match.groups.past })

		lastIndex = match.index + match[0].length
	}

	if (lastIndex < literal.length)
		parts.push({ type: 'literal', literalType: 'unit', value: literal.slice(lastIndex) })

	return parts
}


/**
 * Abbreviate time unit from Intl.RelativeTimeFormat { style: "narrow" }
 * (e.g. "day" -> "d", "дн" -> "д")
 */
const toSingleCharacterTimeUnit = (timeUnit: string) => (
	timeUnit
		// Disambiguate ambiguous prefixes
		.replace(/(?<en> ?mo)/, ' Mo')

		// Remove articles/"counting" words
		.replace(/(?<zh>个)|(?<ja>か)|(?<ko>개)/, '')

		// Strip leading space and naively take just the 1st character
		.match(/^\s?(.)|/)?.[1]
)

export const formatRelativeTime = (
	timestamp: number,
	relativeToTimestamp = Date.now(),
	{
		locale,
		format = 'short',
		largestUnit = 'year',
		resolution = 2,
		includeRelativeWords = true,
	}: {
		locale?: string
		relativeToTimestamp?: number
		format?: 'long' | 'short' | 'narrow' | 'singleCharacter'
		largestUnit?: keyof typeof timeUnits
		resolution?: number
		includeRelativeWords?: boolean
	} = {}
) => {
	let elapsed = Math.abs(timestamp - relativeToTimestamp)
	if(elapsed < 1000) return 'just now'

	const sign = Math.sign(timestamp - relativeToTimestamp)

	const unitParts = []

	for (const [unit, amount] of (
		Object.entries(timeUnits)
			.slice(
				Object.keys(timeUnits)
					.indexOf(largestUnit)
			)
	))
		if (Math.abs(elapsed) >= amount) {
			unitParts.push(
				new Intl.RelativeTimeFormat(locale, {
					style: (
						{
							long: 'long',
							short: 'short',
							narrow: 'narrow',
							singleCharacter: 'narrow',
						} as const
					)[format],
					numeric: 'always',
				})
					.formatToParts(
						sign * Math.floor(elapsed / amount),
						unit as keyof typeof timeUnits
					)
			)

			if (--resolution === 0) break

			elapsed %= amount
		}

	return (
		unitParts
			.map((parts, i, { length: iLength }) => (
				parts
					.flatMap(part => (
						part.type === 'literal'
							? parseLiteral(part.value)
							: [part]
					))
					.filter((part, j, { length: jLength }) => (
						part.type !== 'literal'
						|| part.literalType === 'unit'
						|| (includeRelativeWords && (
							(i === 0 && j === 0)
							|| (i === iLength - 1 && j === jLength - 1)
						))
					))
					.map((part) => (
						format === 'singleCharacter' && part.literalType === 'unit'
							? toSingleCharacterTimeUnit(part.value)
							: part.value
					))
					.join('')
			))
			.join(
				(
					{
						long: ', ',
						short: ', ',
						narrow: ' ',
						singleCharacter: ' ',
					} as const
				)[format],
			)
	)
}
