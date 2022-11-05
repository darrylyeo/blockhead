export const formatIdentifierToWords = (str: string) =>
	str.replace(/[A-Z]+/g, m => ` ${m.toLowerCase()}`).replace(/_/g, ' ').trim()
