import type { Ethereum } from '../data/networks/types'
import type { State as PortfolioState } from '../components/Portfolio.svelte'
import type { WalletType } from '../data/wallets'

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

	'PortfolioAccount/ToggleFeed': {
		isShowing: boolean,
	},
	'PortfolioAccount/ToggleNetwork': {
		chainId: Ethereum.ChainID,
		networkIsShowing: boolean,
	}
	'PortfolioAccount/ToggleSection': {
		chainId: Ethereum.ChainID,
		sectionType: 'Balances' | 'DeFi' | 'NFTs' | 'Feed',
		sectionIsShowing: boolean,
	},

	'AccountConnections/ChangeState': {
		state: PortfolioState
	},
	'AccountConnections/AddConnection': {
		walletType: WalletType,
	},
	'AccountConnections/DeleteConnection': {
		walletType: WalletType,
	},

	'Query': {
		query: string,
		queryParams: Record<string, string>,
		isSuccessful: boolean,
	},
}

export type EventType = keyof Events
