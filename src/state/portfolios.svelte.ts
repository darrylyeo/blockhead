// Types
import type { AccountId } from '$/data/accountId'
import type { Ethereum } from '$/data/networks/types'


// State entities
namespace V5 {
	export class Portfolios {
		portfolios = $state<Portfolio[]>([])

		serialized = $derived(
			{
				portfolios: this.portfolios.map(portfolio => portfolio.serialized),
			}
		)

		constructor({
			portfolios = [],
		}: Partial<Portfolios['serialized']> = {}){
			this.portfolios = portfolios.map(portfolio => new Portfolio(portfolio))

			if(this.portfolios.length === 0)
				this.addPortfolio()
		}

		addPortfolio(){
			this.portfolios.push(
				new Portfolio()
			)
		}

		deletePortfolio(i: number){
			return this.portfolios.splice(i, 1)[0]
		}
	}

	export class Portfolio {
		name = $state('')
		accounts = $state<PortfolioAccount[]>(
			[]
		)

		serialized = $derived(
			{
				name: this.name,
				accounts: this.accounts.map(account => account.serialized),
			}
		)

		constructor({
			name = 'My Portfolio',
			accounts = [],
		}: Partial<Portfolio['serialized']> = {}){
			this.name = name
			this.accounts = accounts.map(account => new PortfolioAccount(account))
		}

		addAccount({
			id,
			nickname,
			chainIds,
		}: {
			id: AccountId
			nickname: string
			chainIds: Ethereum.ChainId[]
		}){
			const existingAccount = this.accounts.find(account => (
				account.id?.toLowerCase() === id.toLowerCase()
			))

			if(!existingAccount){
				const newAccount = new PortfolioAccount({
					id,
					nickname,
					views: chainIds.map(chainId => (
						new PortfolioAccountView({
							chainId,
						})
					)),
				})
				
				this.accounts.unshift(newAccount)
				
				return true
			}else{
				for(const chainId of chainIds)
					existingAccount.addView({
						chainId,
					})

				return false
			}
		}

		deleteAccount(i: number){
			return this.accounts.splice(i, 1)[0]
		}
	}

	export class PortfolioAccount {
		id = $state<AccountId>()
		nickname = $state<string>()
		views = $state<PortfolioAccountView[]>([])
		showFeed = $state(true)

		serialized = $derived(
			{
				id: this.id,
				nickname: this.nickname,
				views: this.views.map(view => view.serialized),
				showFeed: this.showFeed,
			}
		)

		constructor({
			id,
			nickname = '',
			views = [],
			showFeed = true,
		}: Partial<PortfolioAccount['serialized']> = {}){
			this.id = id
			this.nickname = nickname
			this.views = views.map(view => new PortfolioAccountView(view))
			this.showFeed = showFeed
		}

		addView({
			chainId,
		}: {
			chainId: Ethereum.ChainId,
		}) {
			if (!this.views.find(view => view.chainId === chainId))
				this.views.push(
					new PortfolioAccountView({
						chainId,
					})
				)
		}

		deleteView(view: PortfolioAccountView) {
			this.views = this.views.filter(_view => _view !== view)
		}
	}

	export class PortfolioAccountView {
		chainId  = $state<Ethereum.ChainId>()
		showBalances = $state(true)
		showDefi = $state(true)
		showNfts = $state(true)
		showFeed = $state(true)

		serialized = $derived(
			{
				chainId: this.chainId,
				showBalances: this.showBalances,
				showDefi: this.showDefi,
				showNfts: this.showNfts,
				showFeed: this.showFeed,
			}
		)

		constructor({
			chainId,
			showBalances = true,
			showDefi = true,
			showNfts = true,
			showFeed = true,
		}: Partial<PortfolioAccountView['serialized']> = {}){
			this.chainId = chainId
			this.showBalances = showBalances
			this.showDefi = showDefi
			this.showNfts = showNfts
			this.showFeed = showFeed
		}
	}
}


// Helper types
export type Portfolios = V5.Portfolios
export type Portfolio = V5.Portfolio
export type PortfolioAccount = V5.PortfolioAccount
export type PortfolioAccountView = V5.PortfolioAccountView


// State
import { StorageValue } from '$/utils/StorageValue.svelte'

export const getLocalPortfolios = () => (
	new StorageValue<
		V5.Portfolios,
		V5.Portfolios['serialized']
	>(
		'localPortfoliosV5',
		getLocalPortfoliosV5(),
		{
			deserialize: portfolios => new V5.Portfolios(portfolios),
			serialize: portfolios => portfolios.serialized,
		},
	)
)


// Compatibility
import { get } from 'svelte/store'
import { localPortfolios as localPortfoliosV4 } from './portfolio-accounts'

const getLocalPortfoliosV5 = () => (
	new V5.Portfolios(
		{
			portfolios: get(localPortfoliosV4),
		},
	)
)
