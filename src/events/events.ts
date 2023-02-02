export type Events = {
	'Home/LogoMousedown': {},

	'Preferences/Change': {
		preferenceKey: string,
		preferenceValue: string,
	},

	'Portfolios/AddPortfolio': {
		newPortfolioCount: number,
	},
	'Portfolios/DeletePortfolio': {
		portfolioAccountsCount: number,
		newPortfolioCount: number,
	},
}

export type EventType = keyof Events
