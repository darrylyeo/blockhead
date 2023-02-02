import type { Ethereum } from '../data/ethereum/types'
import type { State as PortfolioState } from '../components/Portfolio.svelte'

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

	'Portfolio/ChangeState': {
		state: PortfolioState
	},
	'Portfolio/AddAccount': {
		accountChainIds: Ethereum.ChainID[],
		newPortfolioAccountsCount: number,
	},
	'Portfolio/DeleteAccount': {
		accountChainIds: Ethereum.ChainID[],
		newPortfolioAccountsCount: number,
	},
}

export type EventType = keyof Events
