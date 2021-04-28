import type { CryptoAddress } from '../CryptoAddress'
import { localStorageWritable } from '../local-storage'

export class Portfolio {
	constructor(
		public name: string = '',
		public accounts: CryptoAddress[] = []
	){}

	toJSON(){
		return {name: this.name, accounts: this.accounts}
	}
}

// Local storage v1 (deprecated)
let localAccounts
export const getLocalAccounts = () => localAccounts ||= localStorageWritable<CryptoAddress[]>('localAccounts', [])
function getV1LocalAccounts(): CryptoAddress[] {
	const json = globalThis.localStorage?.getItem('localAccounts')
	return json && JSON.parse(json)
}

// Local storage v2
let localPortfolios
export const getLocalPortfolios = () => localPortfolios ||= localStorageWritable<Portfolio[]>('localPortfolios', [
	new Portfolio('Your Portfolio', getV1LocalAccounts() || [])
])


export const getEthersAccounts = async provider => {
	const accounts = await provider.listAccounts()
	console.log('accounts', accounts)
	return accounts
}


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