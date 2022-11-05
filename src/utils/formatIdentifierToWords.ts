export const formatIdentifierToWords = (str: string, titlecase = false) =>
	str.replace(/^.|[A-Z]+/g, m => ` ${titlecase ? m.toUpperCase() : m.toLowerCase()}`).replace(/_/g, ' ').trim()
