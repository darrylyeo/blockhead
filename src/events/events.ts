import type { Ethereum } from '$/data/networks/types'
import type { State as PortfolioState } from '$/components/Portfolio.svelte'
import type { KnownWalletType } from '$/data/wallets'
import type { Eip6963Rdns } from '$/state/wallets'

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
		knownWalletType: KnownWalletType,
		eip6963Rdns: Eip6963Rdns,
	},
	'AccountConnections/DeleteConnection': {
		knownWalletType: KnownWalletType,
		eip6963Rdns: Eip6963Rdns,
	},

	'Query': {
		query: string,
		queryParams: Record<string, string>,
		isSuccessful: boolean,
	},
}

export type EventType = keyof Events
