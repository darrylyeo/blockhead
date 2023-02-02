import type { Ethereum } from '../data/ethereum/types'
import type { State as PortfolioState } from '../components/Portfolio.svelte'
import type { WalletType } from '../data/ethereum/wallets'

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

	'PortfolioAccount/ToggleNetwork': {
		chainId: Ethereum.ChainID,
		networkIsShowing: boolean,
	}
	'PortfolioAccount/ToggleSection': {
		chainId: Ethereum.ChainID,
		sectionType: 'Balances' | 'DeFi' | 'NFTs',
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
}

export type EventType = keyof Events
