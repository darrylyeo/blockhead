import type { Ethereum } from '../data/networks/types'
import type { ENS } from '../api/ens'
import type { LensName } from '../api/lens'


import { memoized } from '../utils/memoized'
import { localStorageWritable } from '../utils/localStorageWritable'


// Local storage v1 'localAccounts' (deprecated)

type PortfolioV1 = Ethereum.Address

const getLocalPortfoliosV1 = () => {
	const json = globalThis.localStorage?.getItem('localAccounts')

	return json ?
		JSON.parse(json) as PortfolioV1[]
	:
		undefined
}

const getLocalPortfoliosStoreV1 = memoized(() => localStorageWritable<PortfolioV1[]>(
	'localAccounts',
	[]
))


// Local storage v2 'localPortfolios' (deprecated)

class PortfolioV2 {
	constructor(
		public name: string = '',
		public accounts: string[] = []
	){}

	toJSON(){
		return {name: this.name, accounts: this.accounts}
	}
}

const getLocalPortfoliosV2 = () => {
	const json = globalThis.localStorage?.getItem('localPortfolios')
	if(json)
		return JSON.parse(json) as PortfolioV2[]

	const accountsV1 = getLocalPortfoliosV1()
	if(accountsV1)
		return [new PortfolioV2('Your Portfolio', accountsV1)]
}

const getLocalPortfoliosStoreV2 = memoized(() => localStorageWritable<PortfolioV2[]>(
	'localPortfolios',
	[new PortfolioV2('Your Portfolio', getLocalPortfoliosV1())]
))


// Local storage v3 'localPortfoliosV3' (deprecated)

export class PortfolioAccountViewV3 {
	constructor(
		public chainID: Ethereum.ChainID,
		public show = true,
		public showBalances = true,
		public showDeFi = true,
		public showNFTs = true
	){}

	toJSON(){
		return {
			chainID: this.chainID,
			show: this.show,
			showBalances: this.showBalances,
			showDeFi: this.showDeFi,
			showNFTs: this.showNFTs
		}
	}
}

enum AccountTypeV3 {
	ENS = 'ens',
	Lens = 'lens',
	Address = 'address'
}

import { isAddress } from 'ethers'

class AccountV3 {
	constructor(
		public id: Ethereum.Address | string,
		public provider?: Ethereum.Provider,
		public providerName?: Ethereum.ProviderName,
		public type: AccountTypeV3 = isAddress(id) ? AccountTypeV3.Address : id.match(/[.](lens)$/) ? AccountTypeV3.Lens : AccountTypeV3.ENS,
		public nickname: string = '',
		public networks: PortfolioAccountViewV3[] = getDefaultPortfolioAccountView(),
	){}

	toJSON(){
		return {
			id: this.id,
			type: this.type,
			nickname: this.nickname,
			networks: this.networks
		}
	}
}

class PortfolioV3 {
	constructor(
		public name: string = '',
		public accounts: AccountV3[] = []
	){}

	toJSON(){
		return {name: this.name, accounts: this.accounts}
	}
}

const getLocalPortfoliosV3 = () => {
	const json = globalThis.localStorage?.getItem('localPortfoliosV3')

	if(json)
		return JSON.parse(json) as PortfolioV3[]

	const portfoliosV2 = getLocalPortfoliosV2()

	return portfoliosV2 ?
		portfoliosV2.map(({name, accounts}) => new PortfolioV3(name, accounts.map(id => new AccountV3(id))))
	:
		[new PortfolioV3('Your Portfolio')]
}

const getLocalPortfoliosStoreV3 = memoized(() => localStorageWritable<PortfolioV3[]>(
	'localPortfoliosV3',
	getLocalPortfoliosV3()
))


import { availableNetworks } from '../data/networks'

function getDefaultPortfolioAccountView(){
	return availableNetworks.map(network => new PortfolioAccountViewV3(network.chainId))
}


// Local storage v4 'localPortfoliosV4'

namespace V4 {
	export type PortfolioAccountId = Ethereum.Address | ENS.Name | LensName

	type PortfolioAccountView = {
		chainId: Ethereum.ChainID,
		showBalances: boolean,
		showDefi: boolean,
		showNfts: boolean,
	}

	type SerializedPortfolioAccountView = {
		chainId: Ethereum.ChainID,
		showBalances?: boolean,
		showDefi?: boolean,
		showNfts?: boolean,
	}

	const createPortfolioAccountView = ({
		chainId,
		showBalances = true,
		showDefi = true,
		showNfts = true
	}: SerializedPortfolioAccountView): PortfolioAccountView => ({
		chainId,
		showBalances,
		showDefi,
		showNfts,
	})

	const serializePortfolioAccountView = ({
		chainId,
		showBalances = true,
		showDefi = true,
		showNfts = true
	}: PortfolioAccountView): SerializedPortfolioAccountView => ({
		chainId,
		showBalances,
		showDefi,
		showNfts,
	})

	export type PortfolioAccount = {
		id: PortfolioAccountId,
		nickname: string,
		views: PortfolioAccountView[],

		addView: (network: Ethereum.Network) => void,
		deleteView: (view: PortfolioAccountView) => void,
	}

	type SerializedPortfolioAccount = {
		id: PortfolioAccountId,
		nickname: string,
		views: SerializedPortfolioAccountView[],
	}

	export const createPortfolioAccount = ({
		id,
		nickname = '',
		views,
	}: SerializedPortfolioAccount): PortfolioAccount => ({
		id,
		nickname,
		views: views.map(createPortfolioAccountView),

		addView(network: Ethereum.Network){
			if(!this.views.find(view => view.chainId === network.chainId))
				this.views.push(
					createPortfolioAccountView({ chainId: network.chainId })
				)
		},

		deleteView(view: PortfolioAccountView){
			this.views = this.views.filter(_view => _view !== view)
		},
	})

	const serializePortfolioAccount = ({
		id,
		nickname,
		views,
	}: PortfolioAccount): SerializedPortfolioAccount => ({
		id,
		nickname,
		views: views.map(serializePortfolioAccountView),
	})


	export type Portfolio = {
		name: string,
		accounts: PortfolioAccount[],

		addAccount: (_: { id: PortfolioAccountId, nickname: string, networks: Ethereum.Network[] }) => boolean,
		deleteAccount: (i: number) => PortfolioAccount,
	}

	export type SerializedPortfolio = {
		name?: string,
		accounts?: SerializedPortfolioAccount[],
	}

	export const createPortfolio = ({
		name = '',
		accounts = []
	}: SerializedPortfolio = {}): Portfolio => ({
		name,
		accounts: accounts.map(createPortfolioAccount),

		addAccount({ id, nickname, networks }){
			const existingAccount = this.accounts.find(account => account.id.toLowerCase() === id.toLowerCase())

			if(!existingAccount){
				const newAccount = createPortfolioAccount({
					id,
					nickname,
					views: networks.map(({ chainId }) => ({ chainId }))
				})
				
				this.accounts.unshift(newAccount)
				
				return true
			}else{
				for(const network of networks)
					existingAccount.addView(network)

				return false
			}
		},

		deleteAccount(i: number){
			return this.accounts.splice(i, 1)[0]
		},
	})

	export const serializePortfolio = ({
		name = '',
		accounts = []
	}: Portfolio): SerializedPortfolio => ({
		name,
		accounts: accounts.map(serializePortfolioAccount),
	})
}

const getLocalPortfoliosV4 = () => (
	getLocalPortfoliosV3().map(({
		name,
		accounts
	}) => ({
		name,
		accounts: accounts.map(({
			id,
			nickname,
			networks,
		}) => ({
			id: id as V4.PortfolioAccountId,
			nickname,
			views: networks.filter(({ show }) => show).map(({
				chainID,
				showBalances,
				showDeFi,
				showNFTs,
			}) => ({
				chainId: chainID,
				showBalances,
				showDefi: showDeFi,
				showNfts: showNFTs,
			})),
		})),
	} as V4.SerializedPortfolio))
)

const localPortfoliosV4 = localStorageWritable(
	'localPortfoliosV4',
	getLocalPortfoliosV4(),
	portfoliosJson => portfoliosJson.map(V4.createPortfolio),
	portfolios => portfolios.map(V4.serializePortfolio)
)

export type Portfolio = V4.Portfolio
export type PortfolioAccount = V4.PortfolioAccount
export type PortfolioAccountId = V4.PortfolioAccountId

export const createPortfolio = V4.createPortfolio

export const localPortfolios = localPortfoliosV4
export const getLocalPortfolios = () => localPortfolios



import type { Signer } from 'ethers'
import { JsonRpcProvider } from 'ethers'

export async function getAccountsFromProvider(provider: Ethereum.Provider | Signer, providerName: Ethereum.ProviderName){
	const accounts = (
		provider instanceof JsonRpcProvider ?
			await provider.listAccounts()
		: provider instanceof Signer ?
			[await provider.getAddress()]
		: provider.selectedAddress ?
			[provider.selectedAddress]
		:
			[]
	).map(id => new AccountV3(id, provider, providerName))

	return accounts
}


import { writable } from 'svelte/store'

export let connectedProviderAccounts = writable<Partial<Record<Ethereum.ProviderName, Ethereum.Provider[]>>>({
	'MetaMask': [],
	'Portis': [],
	'Torus': [],
})


// export const getEthersBalance = async provider => {
// 	console.log(provider, provider.isConnected())
// 	const balance = await provider.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8")
// 	console.log(balance)
// 	console.log(ethers.utils.formatEther(balance))

// 	console.log('balance', await provider.getBalance("ethers.eth"))
// 	provider._getAddress('')
// }

// export const getWeb3Balance = async provider => {
// 	const { web3 } = await import('./web3')

// 	console.log('web3', web3, web3.eth.accounts)

// 	web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
// 		console.log(balance, error);
// 	})
// }


// import { web3 } from './web3'

// // console.log(web3)
// // You can now use a web3 method to obtain or send data. 
// web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
//   console.log(balance);
// })


// if(globalThis.document) (async () => {
// 	const { web3 } = await import('./web3')
// 	console.log(web3)
	
// 	// You can now use a web3 method to obtain or send data. 
// 	web3.eth.getBalance("0xE11c896E2a6fF6E52A925C68c8083397Ab65eaA8", (error, balance) => {
// 		console.log(balance);
// 	})
// })()