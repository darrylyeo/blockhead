export const formatKebabCase = (str: string) =>
	str
		.replace(/[-]/g, ' ')
		.replace(/\b./g, m => m.toUpperCase())
