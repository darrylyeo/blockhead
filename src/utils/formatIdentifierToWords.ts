export const formatIdentifierToWords = (str: string, titlecase = false) =>
	[...str.matchAll(/(?:[0-9]+|[A-Z]+(?=[A-Z][a-z]|[^a-z]|$)|[A-Z][a-z]+|[a-z]+)/g)]
		.map(([word]) =>
			titlecase ? `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` : word.toLowerCase()
		)
		.join(' ')
