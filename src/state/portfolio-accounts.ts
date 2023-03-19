import type { Ethereum } from '../data/networks/types'
import { isAddress } from 'ethers'
import { availableNetworks } from '../data/networks'

export class Portfolio {
	constructor(
		public name: string = '',
		public accounts: Account[] = []
	){}

	toJSON(){
		return {name: this.name, accounts: this.accounts}
	}
}

export enum AccountType {
	ENS = 'ens',
	Lens = 'lens',
	Address = 'address'
}

export class Account {
	networks: AccountNetworkSettings[]

	constructor(
		public id: Ethereum.Address | string,
		networks: Ethereum.Network[] = [],
		public provider?: Ethereum.Provider,
		public providerName?: Ethereum.ProviderName,
		public type: AccountType = isAddress(id) ? AccountType.Address : id.match(/[.](lens)$/) ? AccountType.Lens : AccountType.ENS,
		public nickname: string = '',
	){
		this.networks = networks.map(network => new AccountNetworkSettings(network.chainId))
	}

	addNetwork(network: Ethereum.Network){
		if(!this.networks.find(networkSettings => networkSettings.chainID === network.chainId))
			this.networks.push(new AccountNetworkSettings(network.chainId))
	}

	toJSON(){
		return {
			id: this.id,
			type: this.type,
			nickname: this.nickname,
			networks: this.networks
		}
	}
}

export class AccountNetworkSettings {
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


function getDefaultAccountNetworkSettings(){
	return availableNetworks.map(network => new AccountNetworkSettings(network.chainId))
}


import { localStorageWritable } from '../utils/localStorageWritable'

// Local storage v1 'localAccounts' (deprecated)
let localAccounts
export const getLocalAccounts = () => localAccounts ||= localStorageWritable<Ethereum.Address[]>('localAccounts', [])
function getV1LocalAccounts(): Ethereum.Address[] {
	const json = globalThis.localStorage?.getItem('localAccounts')
	return json && JSON.parse(json)
}

// Local storage v2 'localPortfolios' (deprecated)
// let localPortfolios
// export const getLocalPortfolios = () => localPortfolios ||= localStorageWritable<PortfolioV2[]>('localPortfolios', [
// 	new Portfolio('Your Portfolio', getV1LocalAccounts() || [])
// ])
class PortfolioV2 {
	constructor(
		public name: string = '',
		public accounts: string[] = []
	){}

	toJSON(){
		return {name: this.name, accounts: this.accounts}
	}
}
function getLocalPortfoliosFromV2(): Portfolio[] {
	const accountsV1 = getV1LocalAccounts()

	const json = globalThis.localStorage?.getItem('localPortfolios')
	const portfoliosV2: PortfolioV2[] =
		json ? JSON.parse(json) :
		accountsV1 ? [new PortfolioV2('Your Portfolio', accountsV1)] :
		undefined

	return portfoliosV2?.map(({name, accounts}) => new Portfolio(name, accounts.map(id => new Account(id))))
}

// Local storage v3
let localPortfolios
export const getLocalPortfolios = () => localPortfolios ||= localStorageWritable<Portfolio[]>('localPortfoliosV3', getLocalPortfoliosFromV2() || [new Portfolio('Your Portfolio')])


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
	).map(id => new Account(id, undefined, provider, providerName))

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