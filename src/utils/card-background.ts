export const makeCardGradient = (colors = []) =>
	`linear-gradient(155deg, ${colors.length == 1 ? [`${colors[0]}20`, `${colors[0]}55`] : colors.map(color => `${color}50`)}`

export const cardStyle = (colors: string[]) =>
	colors ? `
		--card-background-image: ${makeCardGradient(colors)});
		--primary-color: ${colors[colors.length / 2 | 0] ?? 'inherit'}
	` : ''